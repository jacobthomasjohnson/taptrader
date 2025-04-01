import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Tap Trader',
  description: 'An incremental commodity trading game',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="h-[100vh] flex flex-col font-sans overflow-hidden">{children}</body>
    </html>
  )
}
