// A/B validation using the existing studio. Candidates are served from exports,
// before publishing them or changing catalog URLs. Requires local Vite on 5173.
import { chromium } from '@playwright/test'
import sharp from 'sharp'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, basename } from 'node:path'
import assert from 'node:assert/strict'
const manifest=JSON.parse(await readFile('blender/exports/catalog-lossless-v002.json','utf8'))
const names={'af1-white-gold':'Air Force 1','sneaker-graffiti':'Sneaker Graffiti','carapace-01':'CARAPACE 01'}
const directory='.tmp/optimization';await mkdir(directory,{recursive:true})
const browser=await chromium.launch({channel:'msedge',headless:true})
const report={method:'Edge headless, existing studio, reduced motion, cold HTTP cache; local HTTP load through Vite. Load timings include fetch, decode and first ready frame, excluding navigation. Frame rate is an approximate 1-second interactive sample.',models:[],errors:[]}
async function state(page,action) {
  return page.evaluate(async action=>{
    const moduleUrl=performance.getEntriesByType('resource').find(x=>x.name.includes('/@react-three_fiber.js')).name
    const {_roots}=await import(moduleUrl),s=[..._roots.values()][0].store.getState(),c=s.controls
    if(action.view) {
      c.reset();const base=s.camera.position.distanceTo(c.target)
      const views={studio:[.491809,1.2651,1],side:[0,Math.PI/2,1],top:[.491809,.22,1],close:[.491809,1.08,.72]}
      const [theta,phi,zoom]=views[action.view],distance=base*zoom
      s.camera.position.set(Math.sin(phi)*Math.sin(theta),Math.cos(phi),Math.sin(phi)*Math.cos(theta)).multiplyScalar(distance).add(c.target)
      c.update();s.invalidate();await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))
    }
    if(action.fps) {
      let first,last,frames=0
      await new Promise(resolve=>{function tick(now){first??=now;last=now;frames++;c.setAzimuthalAngle(c.getAzimuthalAngle()+.003);if(now-first<1000)requestAnimationFrame(tick);else resolve()}requestAnimationFrame(tick)})
      return {fps:(frames-1)*1000/(last-first),gpu:s.gl.getContext().getParameter(s.gl.getContext().getExtension('WEBGL_debug_renderer_info')?.UNMASKED_RENDERER_WEBGL??s.gl.getContext().RENDERER)}
    }
    return {camera:s.camera.position.toArray(),target:c.target.toArray(),memory:s.gl.info.memory,horizontalOverflow:document.documentElement.scrollWidth>innerWidth}
  },action)
}
try {
  for(const model of manifest.models) {
    const result={id:model.id,variants:{},comparisons:[]}
    for(const variant of ['original','optimized']) {
      const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'})
      page.on('pageerror',error=>report.errors.push(error.message))
      const cdp=await page.context().newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true})
      let requestStarted
      await page.route('**/*.glb',async route=>{
        if([basename(model.input),basename(model.output)].some(name=>route.request().url().endsWith(name))) {
          requestStarted=performance.now()
          if(variant==='optimized') return route.continue({url:'http://127.0.0.1:5173/@fs/'+resolve(model.output).replaceAll('\\','/')})
          return route.continue({url:'http://127.0.0.1:5173/models/'+basename(model.input)})
        }
        return route.continue()
      })
      await page.goto('http://127.0.0.1:5173')
      if(model.id!=='af1-white-gold')await page.getByRole('button',{name:new RegExp('^'+names[model.id]+',')}).click()
      await page.locator(`.viewer-region[data-state="ready"][data-model="${model.id}"]`).waitFor({timeout:90000})
      result.variants[variant]={loadReadyMs:performance.now()-requestStarted,state:await state(page,{})}
      assert.equal(result.variants[variant].state.horizontalOverflow,false)
      for(const view of ['studio','side','top','close']) {
        await state(page,{view})
        await page.locator('.viewer-stage').screenshot({path:`${directory}/${model.id}-${variant}-${view}.png`})
      }
      result.variants[variant].performance=await state(page,{fps:true})
      await page.setViewportSize({width:390,height:844});await page.locator('#showroom').scrollIntoViewIfNeeded();await state(page,{view:'studio'})
      await page.locator('.viewer-stage').screenshot({path:`${directory}/${model.id}-${variant}-mobile.png`})
      if(variant==='optimized')await page.screenshot({path:`${directory}/${model.id}-mobile-page.png`,fullPage:true})
      await page.close()
    }
    for(const view of ['studio','side','top','close','mobile']) {
      const original=await sharp(`${directory}/${model.id}-original-${view}.png`).removeAlpha().raw().toBuffer({resolveWithObject:true})
      const optimized=await sharp(`${directory}/${model.id}-optimized-${view}.png`).removeAlpha().raw().toBuffer({resolveWithObject:true})
      assert.deepEqual(original.info,optimized.info)
      let sum=0,max=0,changed=0
      for(let i=0;i<original.data.length;i++){const d=Math.abs(original.data[i]-optimized.data[i]);sum+=d;max=Math.max(max,d);if(d>8)changed++}
      const diff={view,meanRGBDelta:sum/original.data.length,maxChannelDelta:max,channelsOver8Percent:changed/original.data.length*100}
      result.comparisons.push(diff)
    }
    // Side-by-side studio, side, top and detail comparisons at useful review size.
    const panels=[];let h=0
    for(const [row,view] of ['studio','side','top','close'].entries())for(const [column,variant] of ['original','optimized'].entries()) {
      const {data,info}=await sharp(`${directory}/${model.id}-${variant}-${view}.png`).resize({width:460}).toBuffer({resolveWithObject:true});h=info.height
      panels.push({input:data,left:column*460,top:row*h})
    }
    await sharp({create:{width:920,height:h*4,channels:3,background:'#eee8de'}}).composite(panels).png().toFile(`${directory}/${model.id}-comparison.png`)
    report.models.push(result);console.log(JSON.stringify(result))
  }
  assert.deepEqual(report.errors,[])
} finally {await writeFile(`${directory}/visual-performance.json`,JSON.stringify(report,null,2));await browser.close()}
