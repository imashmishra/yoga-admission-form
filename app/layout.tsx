<<<<<<< HEAD
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'Your SaaS platform foundation.'
};
=======
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
>>>>>>> fa4b7cf74ab7b690ff735f527b3c66e633352173

export default function RootLayout({
  children,
}: {
<<<<<<< HEAD
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='{ `${inter.className} antialiased` }'>{children}</body>
    </html>
  );
=======
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
>>>>>>> fa4b7cf74ab7b690ff735f527b3c66e633352173
}
