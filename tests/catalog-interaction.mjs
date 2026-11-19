// Run against the existing Vite dev server: node tests/catalog-interaction.mjs
import { chromium, expect } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'

await mkdir('.tmp', { recursive: true })
const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = [], downloads = [], failures = [], report = {}
page.on('pageerror', error => errors.push(error.message))
page.on('request', request => { if (request.url().endsWith('.glb')) downloads.push(request.url().split('/').pop()) })
page.on('requestfailed', request => failures.push({ url: request.url(), error: request.failure()?.errorText }))
const card = name => page.getByRole('button', { name: new RegExp('^' + name + ',') })
async function ready(id) {
  await page.locator(`.viewer-region[data-state="ready"][data-model="${id}"]`).waitFor({ timeout: 90000 })
  assert.equal(await page.locator('.catalog-card[aria-pressed="true"]').count(), 1)
  assert.equal(await page.locator('canvas').count(), 1)
}
async function metrics() {
  return page.evaluate(async () => {
    const path = performance.getEntriesByType('resource').find(x => x.name.includes('/@react-three_fiber.js')).name
    const { _roots } = await import(path)
    const state = [..._roots.values()][0].store.getState()
    const groups = state.scene.children.filter(x => x.name.startsWith('showcase-product-'))
    let meshes = 0, triangles = 0
    const materials = new Set(), textures = new Set()
    groups[0]?.children[0]?.traverse(object => {
      if (!object.isMesh) return
      meshes++; triangles += (object.geometry.index?.count ?? object.geometry.attributes.position.count) / 3
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
        materials.add(material)
        for (const value of Object.values(material)) if (value?.isTexture) textures.add(value)
      }
    })
    return {
      models: groups.map(x => x.name), meshes, triangles, materials: materials.size, textures: textures.size,
      memory: { ...state.gl.info.memory }, angle: state.controls.getAzimuthalAngle(),
      distance: state.camera.position.distanceTo(state.controls.target), min: state.controls.minDistance, max: state.controls.maxDistance,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
      verticalOverflow: document.documentElement.scrollHeight > innerHeight,
      opacity: Number(getComputedStyle(document.querySelector('.viewer-canvas-layer')).opacity),
    }
  })
}
async function select(name, id, triangles) {
  const started = Date.now()
  await card(name).click()
  assert.equal(await page.locator('#product-title').innerText(), name)
  await ready(id)
  const result = await metrics()
  assert.equal(result.models.length, 1)
  assert.equal(result.triangles, triangles)
  assert.equal(result.horizontalOverflow, false)
  return { ...result, readyMs: Date.now() - started }
}
try {
  await page.goto('http://127.0.0.1:5173')
  await ready('af1-white-gold')
  assert.deepEqual([...new Set(downloads)], ['atelier_af1_gold_hero_lossless_v002.glb'])
  report.af1 = await metrics()
  await page.getByRole('radio', { name: '41', exact: true }).check()
  report.graffiti = await select('Sneaker Graffiti', 'sneaker-graffiti', 123740)
  assert.equal(downloads.some(x => x.includes('carapace')), false)
  assert.equal(await page.getByRole('radio', { name: '41', exact: true }).isChecked(), true)
  await page.screenshot({ path: '.tmp/catalog-graffiti-desktop.png' })

  await page.route('**/atelier_carapace_01_lossless_v002.glb', async route => { await new Promise(resolve => setTimeout(resolve, 900)); await route.continue() })
  await page.evaluate(() => {
    window.catalogSamples = []
    window.catalogSampleTimer = setInterval(() => {
      const viewer = document.querySelector('.viewer-region')
      window.catalogSamples.push({ state: viewer.dataset.state, model: viewer.dataset.model, opacity: Number(getComputedStyle(document.querySelector('.viewer-canvas-layer')).opacity) })
    }, 20)
  })
  report.carapace = await select('CARAPACE 01', 'carapace-01', 309587)
  assert.ok(report.carapace.memory.geometries <= report.carapace.meshes + 4, 'Previous model geometries must be released')
  assert.ok(report.carapace.memory.textures < report.graffiti.memory.textures, 'Graffiti textures must be released')
  report.transition = await page.evaluate(() => { clearInterval(window.catalogSampleTimer); return window.catalogSamples })
  assert.ok(report.transition.some(x => x.state === 'exiting' && x.opacity > 0 && x.opacity < 1))
  assert.ok(report.transition.some(x => x.state === 'loading'))
  assert.ok(report.transition.some(x => x.state === 'entering' && x.opacity > 0 && x.opacity < 1))
  await page.unroute('**/atelier_carapace_01_lossless_v002.glb')
  await page.screenshot({ path: '.tmp/catalog-carapace-desktop.png' })

  const before = await metrics()
  await page.getByRole('button', { name: 'Girar 45°' }).click()
  await expect.poll(async () => Math.abs((await metrics()).angle - before.angle)).toBeGreaterThan(0.5)
  await page.getByRole('button', { name: 'Acercar zapatilla' }).click()
  assert.ok((await metrics()).distance < before.distance)
  await page.locator('.viewer-stage').focus()
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.press('Home')
  await expect.poll(async () => Math.abs((await metrics()).distance - before.distance)).toBeLessThan(0.001)
  const bounds = await page.locator('canvas').boundingBox()
  await page.mouse.move(bounds.x + bounds.width * .5, bounds.y + bounds.height * .5)
  await page.mouse.down(); await page.mouse.move(bounds.x + bounds.width * .7, bounds.y + bounds.height * .5, { steps: 12 }); await page.mouse.up()
  assert.ok(Math.abs((await metrics()).angle - before.angle) > .1)
  await page.mouse.wheel(0, 180)
  await page.getByRole('button', { name: 'Restablecer vista' }).click()
  report.controls = 'rotation, zoom, keyboard, drag, wheel and reset passed'

  // A delayed request must be aborted, and may never replace the latest selection.
  await page.route('**/atelier_sneaker_graffiti_lossless_v002.glb', async route => { await new Promise(resolve => setTimeout(resolve, 1800)); await route.continue().catch(() => {}) })
  await card('Sneaker Graffiti').click()
  await page.locator('.viewer-region[data-model="sneaker-graffiti"][data-state="loading"]').waitFor()
  await select('Air Force 1', 'af1-white-gold', 257984)
  await page.waitForTimeout(2000)
  await ready('af1-white-gold')
  assert.ok(failures.some(x => x.url.includes('graffiti') && x.error?.includes('ABORTED')))
  await page.unroute('**/atelier_sneaker_graffiti_lossless_v002.glb')
  // Several choices inside the exit transition load only the final choice.
  const startDownloads = downloads.length
  await page.evaluate(() => {
    const cards = document.querySelectorAll('button.catalog-card')
    cards[1].click(); cards[2].click(); cards[0].click()
  })
  await ready('af1-white-gold')
  assert.equal(downloads.length, startDownloads)
  report.rapidSelection = 'aborted pending request; latest selection retained; intermediate choices not downloaded'

  await page.route('**/atelier_sneaker_graffiti_lossless_v002.glb', route => route.fulfill({ status: 503, body: 'Simulated unavailable model' }))
  await card('Sneaker Graffiti').click()
  await page.getByRole('alert').filter({ hasText: 'No pudimos abrir Sneaker Graffiti' }).waitFor()
  await page.unroute('**/atelier_sneaker_graffiti_lossless_v002.glb')
  await page.getByRole('button', { name: 'Volver a intentar' }).click()
  await ready('sneaker-graffiti')
  report.retry = (await metrics()).triangles === 123740

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await select('CARAPACE 01', 'carapace-01', 309587)
  assert.equal(await page.getByRole('button', { name: 'Activar flotación' }).isDisabled(), true)
  assert.equal((await metrics()).opacity, 1)
  await card('Sneaker Graffiti').focus()
  await page.keyboard.press('Enter')
  await ready('sneaker-graffiti')
  assert.equal(await card('Sneaker Graffiti').evaluate(el => el.matches(':focus-visible')), true)
  report.reducedMotion = 'no float; immediate transition; keyboard catalog selection passed'

  await page.setViewportSize({ width: 1280, height: 720 })
  await select('CARAPACE 01', 'carapace-01', 309587)
  report.smallDesktop = await metrics()
  assert.deepEqual(report.smallDesktop.memory, report.carapace.memory, 'Repeated selections must not accumulate GPU resources')
  assert.equal(report.smallDesktop.verticalOverflow, false)
  await page.setViewportSize({ width: 390, height: 844 })
  await page.locator('#showroom').scrollIntoViewIfNeeded()
  report.mobile = await metrics()
  assert.equal(report.mobile.horizontalOverflow, false)
  await page.screenshot({ path: '.tmp/catalog-carapace-mobile.png', fullPage: true })
  await select('Sneaker Graffiti', 'sneaker-graffiti', 123740)
  await page.locator('#showroom').scrollIntoViewIfNeeded()
  await page.screenshot({ path: '.tmp/catalog-graffiti-mobile.png', fullPage: true })
  report.mobileSelection = 'passed'
  assert.deepEqual(errors, [])
  report.errors = errors; report.downloads = downloads; report.failures = failures
  await writeFile('.tmp/catalog-qa.json', JSON.stringify(report, null, 2))
  console.log(JSON.stringify({ ...report, transition: [...new Set(report.transition.map(x => x.state))] }))
} finally {
  await writeFile('.tmp/catalog-qa.json', JSON.stringify({ ...report, errors, downloads, failures }, null, 2))
  await browser.close()
}
