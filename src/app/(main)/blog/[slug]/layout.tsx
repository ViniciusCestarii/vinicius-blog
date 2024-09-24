import Script from 'next/script'

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Script src="/copy-button-behavior.js" />
      {children}
    </>
  )
}
