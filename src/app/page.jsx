import { Suspense } from "react"
import FlightSearch from "./components/FlightSearch"
import Flights from "./components/Flights"
import { getServerSession } from 'next-auth'
import Link from "next/link"


export default async function Home() {

  const session = await getServerSession();

  if (!session) {
    return (
      <main className="full_page">
        <Link href="/login">
          <button className="go-to-login-btn">Click Here to login</button>
        </Link>
      </main>
    )
  } else if (session) {
    return (
      <main>
        <div className="full_page">
        <FlightSearch />
        <Suspense fallback={<div>Loading...</div>}>
          <Flights />
        </Suspense>
        </div>
      </main>
    )
  }
}
