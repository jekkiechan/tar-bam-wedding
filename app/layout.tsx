import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-playfair',
})

const lato = Lato({ 
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-lato',
})

export const metadata: Metadata = {
  title: 'Tar & Bam | December 20, 2025',
  description: 'Join us for the wedding celebration of Tar and Bam on December 20, 2025 at Mandarin Oriental, Bangkok',
  openGraph: {
    title: 'Tar & Bam Wedding | December 20, 2025',
    description: 'Join us for our wedding celebration at Mandarin Oriental, Bangkok',
    images: ['/images/couple_illustration_transparent_clean.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${lato.className} ${playfair.variable} ${lato.variable}`}>
        {children}
      </body>
    </html>
  )
}