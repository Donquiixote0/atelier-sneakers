import { chromium, expect } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
import assert from 'node:assert/strict'

await mkdir('.tmp/mobile-selection', { recursive: true })
const browser = await chromium.launch({ channel: 'msedge', headless: true })
const report = { contrasts: [], selections: [], errors: [] }
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } }), requests = []
  page.on('pageerror', e => report.errors.push(e.message))
  page.on('request', r => { if (r.url().endsWith('.glb')) requests.push(r.url()) })
  await page.addInitScript(() => {
    window.mobileScrolls = []; window.mobilePositions = []
    const scroll = Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function (options) {
      if (this.id === 'showroom') window.mobileScrolls.push(options)
      return scroll.call(this, options)
    }
    addEventListener('scroll', () => window.mobilePositions.push(scrollY), { passive: true })
  })
  await page.goto('http://127.0.0.1:4173')
  const ready = id => page.locator(`.viewer-region[data-model="${id}"][data-state="ready"]`).waitFor({ timeout: 90000 })
  const card = name => page.getByRole('button', { name: new RegExp('^' + name + ',') })
  const visible = () => page.evaluate(() => { const r = document.querySelector('#showroom').getBoundingClientRect(); return r.top >= -1 && r.bottom <= innerHeight + 1 })
  await ready('af1-white-gold')
  report.contrasts = await page.evaluate(() => {
    const lum = color => color.match(/[\d.]+/g).slice(0, 3).map(Number).map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((n, v, i) => n + v * [.2126, .7152, .0722][i], 0)
    const background = getComputedStyle(document.documentElement).backgroundColor
    return ['.product-description', '.viewer-hint', '.size-note'].map(selector => {
      const color = getComputedStyle(document.querySelector(selector)).color, a = lum(color), b = lum(background)
      return { selector, color, background, ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05) }
    })
  })
  for (const item of report.contrasts) assert.ok(item.ratio >= 4.5)

  async function select(name, id, keyboard = false) {
    await card(name).scrollIntoViewIfNeeded()
    if (keyboard) await card(name).focus()
    await page.evaluate(() => { window.mobileScrolls = []; window.mobilePositions = [scrollY] })
    if (keyboard) await page.keyboard.press('Enter'); else await card(name).click()
    await expect.poll(visible).toBe(true)
    await ready(id)
    assert.equal(await card(name).evaluate(e => document.activeElement === e), true)
    if (keyboard) assert.equal(await card(name).evaluate(e => e.matches(':focus-visible')), true)
    const state = await page.evaluate(() => ({ calls: window.mobileScrolls, positions: window.mobilePositions, overflow: document.documentElement.scrollWidth > innerWidth }))
    assert.equal(state.overflow, false); report.selections.push({ name, keyboard, ...state }); return state
  }
  const smooth = await select('Sneaker Graffiti', 'sneaker-graffiti')
  assert.equal(smooth.calls.at(-1).behavior, 'smooth')
  assert.ok(new Set(smooth.positions.map(Math.round)).size > 3, 'Scroll should contain intermediate positions')
  await page.route('**/atelier_carapace_01_lossless_v002.glb', async route => { await new Promise(r => setTimeout(r, 1500)); await route.continue() })
  const pending = select('CARAPACE 01', 'carapace-01', true)
  await expect.poll(visible).toBe(true)
  await page.locator('.viewer-status').filter({ hasText: 'Preparando CARAPACE 01' }).waitFor()
  await pending; await page.unroute('**/atelier_carapace_01_lossless_v002.glb')
  report.loadingVisibleAfterScroll = true
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const reduced = await select('Air Force 1', 'af1-white-gold', true)
  assert.equal(reduced.calls.at(-1).behavior, 'auto')
  assert.equal(await page.getByRole('button', { name: 'Activar flotación' }).isDisabled(), true)
  const count = requests.length
  await select('Air Force 1', 'af1-white-gold')
  assert.equal(requests.length, count, 'Selecting the active card must not reload its GLB')
  await page.screenshot({ path: '.tmp/mobile-selection/mobile.png', fullPage: true })

  await page.setViewportSize({ width: 1440, height: 900 })
  await page.evaluate(() => { window.mobileScrolls = [] })
  await card('CARAPACE 01').click(); await ready('carapace-01')
  assert.deepEqual(await page.evaluate(() => window.mobileScrolls), [])
  report.desktopUnchanged = true
  await page.screenshot({ path: '.tmp/mobile-selection/desktop.png' })
  await page.setViewportSize({ width: 320, height: 740 })
  await select('Sneaker Graffiti', 'sneaker-graffiti', true)
  report.mobile320Passed = true
  assert.deepEqual(report.errors, [])
  console.log(JSON.stringify({ ...report, selections: report.selections.map(({ name, keyboard, calls, positions }) => ({ name, keyboard, behavior: calls.at(-1).behavior, scrollSamples: positions.length })) }))
} finally { await writeFile('.tmp/mobile-selection/report.json', JSON.stringify(report, null, 2)); await browser.close() }
