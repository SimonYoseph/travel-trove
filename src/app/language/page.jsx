import { getServerSession } from 'next-auth'
import Language from "../components/Translate"
import Link from "next/link"

export default async function language() {

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
      <main className="full_page">
          <Language />
      </main>
    )
  }
}