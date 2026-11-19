import { useEffect, useState, useSyncExternalStore, type RefObject } from 'react'

function subscribeVisibility(onChange: () => void) {
  document.addEventListener('visibilitychange', onChange)
  return () => document.removeEventListener('visibilitychange', onChange)
}

function isTabVisible() { return document.visibilityState === 'visible' }

export function useViewerActivity(stage: RefObject<HTMLElement | null>) {
  const [intersects, setIntersects] = useState(false)
  const tabVisible = useSyncExternalStore(subscribeVisibility, isTabVisible, () => false)

  useEffect(() => {
    const element = stage.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      setIntersects(entry.isIntersecting && entry.intersectionRatio > 0)
    }, { threshold: 0 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [stage])

  return intersects && tabVisible
}
