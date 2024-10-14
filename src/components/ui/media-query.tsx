import React, { useEffect, useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/../tailwind.config'

const fullConfig = resolveConfig(tailwindConfig)

interface MediaQueryProps {
  minWidth: keyof typeof fullConfig.theme.screens
  children: React.ReactNode
  fallback?: React.ReactNode
}

const MediaQuery = ({ minWidth, children, fallback }: MediaQueryProps) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (!minWidth) return

    const minWidthPx = fullConfig.theme.screens?.[minWidth]

    const mediaQuery = window.matchMedia(`(min-width: ${minWidthPx})`)

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    setMatches(mediaQuery.matches)

    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [minWidth])

  if (!matches) return fallback

  return <>{children}</>
}

export default MediaQuery
