import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      {/* @ts-expect-error Server Component */}
      <Head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <Main />
        {/* @ts-expect-error Server Component */}
        <NextScript />
      </body>
    </Html>
  )
}
