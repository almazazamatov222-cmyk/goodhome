import { ModalProvider } from '@/providers/modal-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { Inter, Playfair_Display } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const dynamic = 'force-dynamic'

export const metadata = {
   title: 'GOOD HOME - Premium Textiles & Decor',
   description: 'Discover the finest collection of bedding, towels, and homewear at GOOD HOME.',
   keywords: ['Textiles', 'Bedding', 'Towels', 'Home Decor', 'GOOD HOME'],
   authors: [{ name: 'GOOD HOME', url: 'https://instagram.com/goodhomekz' }],
}

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={`${inter.variable} ${playfair.variable} font-sans`}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
               <ToastProvider />
               <ModalProvider />
               {children}
            </ThemeProvider>
         </body>
      </html>
   )
}
