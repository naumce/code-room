"use client"
import { ModeToggle } from "@/components/mode-goggle"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
export function Header() {
  const session = useSession()

  return (
    <header>
      <div>
        {session.data ? (
          <Button onClick={() => signOut()}>Sign out </Button>
        ) : (
          <Button onClick={() => signIn("google")}>Sign in</Button>
        )}
        {session.data?.user?.name}
        <ModeToggle />
      </div>
    </header>
  )
}
