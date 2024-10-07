import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from '@/components/theme/provider'
import { AuthProvider } from '@/context/auth-context'
import QueryClientProvider from '@/context/react-query-context'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from '@/components/ui/sonner'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Vinicius Blog',
  description: 'A blog about web development and other cool stuff',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased font-geist-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider>
            <AuthProvider>
              <div className="px-4 page-layout">{children}</div>
            </AuthProvider>
          </QueryClientProvider>
          <Toaster closeButton />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
