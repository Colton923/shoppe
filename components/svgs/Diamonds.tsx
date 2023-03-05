'use client'
import { useEffect } from 'react'
import styles from './Diamonds.module.css'

export default function Diamonds() {
  const onScroll = () => {
    const scrollY = window.scrollY * 0.3
    const scrollX = window.scrollX * 0.3
    const svg = document.querySelector('svg')
    if (svg) {
      svg.style.transform = `translate(${scrollX}px, ${scrollY}px)`
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '200%',
        zIndex: -1,
        overflow: 'hidden',
        backgroundImage: 'linear-gradient(45deg, #000, #fff)',
        mixBlendMode: 'plus-lighter',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <pattern
            id="diamond-pattern"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(0)"
          >
            <rect
              x="0"
              y="0"
              width="25"
              height="25"
              fill="000"
              transform="rotate(45, 5, 25)"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#diamond-pattern)" />
      </svg>
    </div>
  )
}
