import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import { getServerSession } from 'next-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TravelTroveAI',
  description: 'TravelTroveAI Group Project',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en" className="full_page">
      <body className={inter.className} >

        <Navbar session={session}/>
        {children}
      </body>
    </html>
  )
}
