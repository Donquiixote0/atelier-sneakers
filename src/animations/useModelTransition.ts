import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import type { ShowcaseProduct } from '../types/product'

export function useModelTransition(product: ShowcaseProduct, reducedMotion: boolean) {
  const layer = useRef<HTMLDivElement>(null)
  const [displayed, setDisplayed] = useState(product)
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'entering' | 'ready'>('loading')

  useLayoutEffect(() => {
    const element = layer.current
    if (!element || product.id === displayed.id) return
    gsap.killTweensOf(element)
    const exit = gsap.to(element, {
      opacity: 0, duration: reducedMotion ? 0 : 0.18, ease: 'power1.in',
      onStart: () => setPhase('exiting'),
      onComplete: () => { setPhase('loading'); setDisplayed(product) },
    })
    return () => { exit.kill() }
  }, [product, displayed.id, reducedMotion])

  const onReady = useCallback(() => {
    const element = layer.current
    if (!element || product.id !== displayed.id) return
    gsap.killTweensOf(element)
    setPhase('entering')
    gsap.fromTo(element, { opacity: 0 }, {
      opacity: 1, duration: reducedMotion ? 0 : 0.32, ease: 'power2.out',
      onComplete: () => setPhase('ready'),
    })
  }, [product.id, displayed.id, reducedMotion])

  useLayoutEffect(() => {
    const element = layer.current
    return () => { if (element) gsap.killTweensOf(element) }
  }, [])

  return { layer, displayed, phase, onReady }
}
