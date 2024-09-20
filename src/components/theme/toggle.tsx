'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const handleThemeChange = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="group"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={handleThemeChange}
    >
      <Sun className="size-icon group-hover:rotate-90 transition-transform block dark:hidden" />
      <Moon className="size-icon group-hover:rotate-45 -rotate-90 transition-transform dark:rotate-0 hidden dark:block p-[0.05px]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
