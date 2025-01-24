import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from '@/components/theme/provider'
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
  title: 'Vinicius Cestari Blog',
  description:
    'A blog about web development and other cool stuff by Vinicius Cestari',
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
            <div className="px-4 page-layout bg-noise before:content-[''] before:pointer-events-none before:fixed dark:before:opacity-60 before:opacity-40 before:bottom-0 before:left-0 before:right-0 before:bg-gradient-to-b before:from-transparent before:to-background before:h-16">
              {children}
            </div>
          </QueryClientProvider>
          <Toaster closeButton />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
