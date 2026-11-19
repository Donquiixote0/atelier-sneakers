// Controlled cold-cache transfer comparison; requires the local Vite server.
import { chromium } from '@playwright/test'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve, basename } from 'node:path'
import assert from 'node:assert/strict'
const models=JSON.parse(await readFile('blender/exports/catalog-lossless-v002.json','utf8')).models
const names={'af1-white-gold':'Air Force 1','sneaker-graffiti':'Sneaker Graffiti','carapace-01':'CARAPACE 01'}
const browser=await chromium.launch({channel:'msedge',headless:true})
const report={downloadMbps:20,latencyMs:40,cache:'disabled',method:'One sample per file, request start to viewer ready, same running studio, HTTP through local Vite with CDP network throttling; not a real mobile network.',models:[]}
try {
  const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'})
  await page.goto('http://127.0.0.1:5173');await page.locator('.viewer-region[data-state="ready"]').waitFor({timeout:90000})
  const cdp=await page.context().newCDPSession(page)
  await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true})
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:40,downloadThroughput:2500000,uploadThroughput:1250000,connectionType:'cellular4g'})
  let variant='original',requestStarted
  await page.route('**/*.glb',route=>{
    const model=models.find(m=>[basename(m.input),basename(m.output)].some(name=>route.request().url().endsWith(name)))
    requestStarted=performance.now()
    return route.continue({url:variant==='original'?'http://127.0.0.1:5173/models/'+basename(model.input):'http://127.0.0.1:5173/@fs/'+resolve(model.output).replaceAll('\\','/')})
  })
  for(variant of ['original','optimized'])for(const model of models) {
    await page.getByRole('button',{name:new RegExp('^'+names[model.id]+',')}).click()
    await page.locator(`.viewer-region[data-model="${model.id}"][data-state="ready"]`).waitFor({timeout:90000})
    const result={id:model.id,variant,readyMs:performance.now()-requestStarted};report.models.push(result);console.log(JSON.stringify(result))
  }
  for(const model of models)assert.ok(report.models.find(x=>x.id===model.id&&x.variant==='optimized').readyMs<report.models.find(x=>x.id===model.id&&x.variant==='original').readyMs)
} finally {await writeFile('.tmp/optimization/network.json',JSON.stringify(report,null,2));await browser.close()}
