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
      onClick={handleThemeChange}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] group-hover:rotate-90 transition-all block dark:hidden" />
      <Moon className="h-[1.2rem] w-[1.2rem] group-hover:rotate-45 -rotate-90 transition-all dark:rotate-0 hidden dark:block p-[0.001rem]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
