// Dev server 5173 for renderer instrumentation; compiled preview 4173 for chunks.
import { chromium, expect } from '@playwright/test'
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises'
import { gzipSync } from 'node:zlib'
import assert from 'node:assert/strict'

await mkdir('.tmp/viewer-activity', { recursive: true })
const report = { chunks: [], render: [], errors: [] }
for (const name of await readdir('dist/assets')) if (name.endsWith('.js')) {
  const bytes = await readFile('dist/assets/' + name)
  report.chunks.push({ name, bytes: bytes.length, gzipBytes: gzipSync(bytes).length })
}
const browser = await chromium.launch({ channel: 'msedge', headless: true })
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  page.on('pageerror', e => report.errors.push(e.message))
  await page.goto('http://127.0.0.1:5173')
  await page.locator('.viewer-region[data-state="ready"]').waitFor({ timeout: 90000 })
  async function state() {
    return page.evaluate(async () => {
      const url = performance.getEntriesByType('resource').find(e => e.name.includes('/@react-three_fiber.js')).name
      const { _roots } = await import(url), s = [..._roots.values()][0].store.getState()
      return { frame: s.gl.info.render.frame, loop: s.frameloop, camera: s.camera.position.toArray(), target: s.controls.target.toArray(), model: document.querySelector('.viewer-region').dataset.model, opacity: Number(getComputedStyle(document.querySelector('.viewer-canvas-layer')).opacity) }
    })
  }
  async function activity(label, expected) {
    await expect.poll(async () => (await state()).loop).toBe(expected)
    const before = await state(); await page.waitForTimeout(1000); const after = await state()
    const sample = { label, frames: after.frame - before.frame, before, after }; report.render.push(sample)
    if (expected === 'never') assert.equal(sample.frames, 0)
    return sample
  }
  await page.getByRole('button', { name: 'Girar 45°' }).click()
  await page.getByRole('button', { name: 'Acercar zapatilla' }).click()
  const visible = await activity('visible', 'always'); assert.ok(visible.frames > 20)
  // Let the existing damping settle before checking exact camera persistence.
  await page.waitForTimeout(500); const retained = await state()
  await page.locator('#archive').scrollIntoViewIfNeeded()
  await activity('offscreen', 'never')
  await page.locator('#showroom').scrollIntoViewIfNeeded()
  const resumed = await activity('visible again', 'always'); assert.ok(resumed.frames > 20)
  assert.ok(resumed.before.camera.every((v, i) => Math.abs(v - retained.camera[i]) < 0.0001))
  assert.deepEqual(resumed.before.target, retained.target); assert.equal(resumed.before.model, retained.model)
  assert.equal(resumed.before.opacity, 1)

  // Override the standard visibility signal while browser rAF remains running:
  // this verifies our own render gate, independently of browser tab throttling.
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await activity('hidden tab signal (emulated)', 'never')
  await page.evaluate(() => { delete document.visibilityState; document.dispatchEvent(new Event('visibilitychange')) })
  const tabResume = await activity('tab visible again', 'always'); assert.ok(tabResume.frames > 20)
  assert.ok(tabResume.before.camera.every((v, i) => Math.abs(v - resumed.after.camera[i]) < 0.0001))

  await page.getByRole('button', { name: 'Pausar flotación' }).click()
  await expect.poll(async () => (await state()).loop).toBe('demand')
  await page.waitForTimeout(250)
  const paused = await activity('paused visible', 'demand'); assert.equal(paused.frames, 0)
  await page.locator('#archive').scrollIntoViewIfNeeded(); await activity('paused offscreen', 'never')
  const pausedFrame = (await state()).frame
  await page.locator('#showroom').scrollIntoViewIfNeeded(); await expect.poll(async () => (await state()).frame).toBeGreaterThan(pausedFrame)
  const pausedResume = await activity('paused resumed', 'demand'); assert.equal(pausedResume.frames, 0)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.locator('#archive').scrollIntoViewIfNeeded(); await activity('reduced motion offscreen', 'never')
  // Model changes while hidden may load, but must not render or reset the pause.
  // Mobile selection now returns to the viewer; keep the tab hidden for this case.
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  const hiddenFrame = (await state()).frame
  await page.getByRole('button', { name: /^CARAPACE 01,/ }).click()
  await page.locator('.viewer-region[data-model="carapace-01"][data-state="ready"]').waitFor({ timeout: 90000 })
  assert.equal((await state()).frame, hiddenFrame)
  await page.evaluate(() => { delete document.visibilityState; document.dispatchEvent(new Event('visibilitychange')) })
  await page.locator('#showroom').scrollIntoViewIfNeeded(); await expect.poll(async () => (await state()).frame).toBeGreaterThan(hiddenFrame)
  report.hiddenSelection = await state()
  await page.screenshot({ path: '.tmp/viewer-activity/mobile.png', fullPage: true })

  const prod = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }), requests = []
  prod.on('pageerror', e => report.errors.push(e.message))
  prod.on('request', r => { if (r.url().endsWith('.glb')) requests.push(r.url()) })
  let release
  const gate = new Promise(resolve => { release = resolve })
  await prod.route('**/assets/ShowcaseViewer-*.js', async route => { await gate; await route.continue() })
  await prod.goto('http://127.0.0.1:4173', { waitUntil: 'domcontentloaded' })
  await prod.locator('[data-viewer-chunk="loading"]').waitFor()
  const fallbackBox = await prod.locator('.viewer-region').boundingBox()
  assert.equal(await prod.locator('canvas').count(), 0); assert.equal(requests.length, 0)
  assert.equal(await prod.locator('#product-title').innerText(), 'Air Force 1')
  await prod.screenshot({ path: '.tmp/viewer-activity/lazy-fallback.png' })
  release()
  await prod.locator('.viewer-region[data-model="af1-white-gold"][data-state="ready"]').waitFor({ timeout: 90000 })
  const readyBox = await prod.locator('.viewer-region').boundingBox()
  assert.ok(Math.abs(fallbackBox.height - readyBox.height) < 1)
  assert.ok(Math.abs(fallbackBox.y - readyBox.y) < 1)
  assert.equal(requests.length, 1)
  report.lazyLoad = { fallbackBox, readyBox, requests, resources: await prod.evaluate(() => performance.getEntriesByType('resource').filter(e => e.name.endsWith('.js')).map(e => ({ file: e.name.split('/').pop(), bytes: e.encodedBodySize }))) }
  await prod.screenshot({ path: '.tmp/viewer-activity/desktop.png' })
  assert.deepEqual(report.errors, [])
  console.log(JSON.stringify({ ...report, render: report.render.map(({ label, frames, after }) => ({ label, frames, loop: after.loop })) }))
} finally {
  await writeFile('.tmp/viewer-activity/report.json', JSON.stringify(report, null, 2))
  await browser.close()
}
