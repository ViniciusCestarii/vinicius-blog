'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

interface IbgeChartProps {
  url: string
}

export default function IbgeChart({ url }: IbgeChartProps) {
  const { theme, systemTheme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  const actualTheme = theme === 'system' ? systemTheme : theme

  const urlWithTheme = `${url}&theme=${actualTheme}`

  return <iframe src={urlWithTheme} width="100%" height="880" title="Gráfico" />
}
