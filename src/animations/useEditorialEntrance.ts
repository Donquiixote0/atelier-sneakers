import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from 'gsap'

export function useEditorialEntrance(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from(scope.current?.querySelectorAll('[data-enter]') ?? [], {
          opacity: 0,
          y: 12,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
        })
      }, scope)
      return () => context.revert()
    })
    return () => media.revert()
  }, [scope])
}
