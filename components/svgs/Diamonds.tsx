'use client'
import { useEffect } from 'react'
import styles from './Diamonds.module.css'

export default function Diamonds() {
  const onScroll = () => {
    const scrollY = window.scrollY * 0.3
    const scrollX = window.scrollX * 0.3
    const svg = document.getElementById('diamondSvg')
    if (svg) {
      svg.style.transform = `translate(${scrollX}px, ${scrollY / 7}px)`
    }
    const pattern = document.getElementById('diamond-pattern')
    if (pattern) {
      pattern.setAttribute('fill', 'rgba(139, 0, 0, .95)')
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
        height: '500%',
        overflow: 'hidden',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        id="diamondSvg"
      >
        <defs>
          <pattern
            id="diamond-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(0)"
          >
            <rect
              x="0"
              y="0"
              width="2"
              height="2"
              fill="rgba(167, 0, 0, 1)"
              transform="rotate(45, 5, 25)"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#diamond-pattern)" />
      </svg>
    </div>
  )
}
