import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Work_Sans } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' })
const workSans = Work_Sans({ subsets: ['latin'], variable: '--font-work-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'Cabañas Inti Mar | El Quisco, Chile',
  description: 'Un refugio tranquilo junto al mar en El Quisco. Descansa, desconecta y disfruta la costa en Cabañas Inti Mar.',
  generator: 'v0.app',
  openGraph: { title: 'Cabañas Inti Mar', description: 'Tu pausa junto al mar en El Quisco.', type: 'website' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f8f5ee' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${fraunces.variable} ${workSans.variable}`}><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
