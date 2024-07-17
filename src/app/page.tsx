import Image from "next/image"
import { db } from "@/src/db"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/src/components/ui/card"
import { Room } from "@/src/db/schema"
import { GithubIcon } from "lucide-react"
import { getRooms } from "../services/rooms"
import { splitTags, TagsList } from "../components/tags-list"
function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagsList tags={splitTags(room.tags)} />
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener"
          >
            Github Project <GithubIcon />
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}></Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
export default async function Home({
  searchParams
}: {
  searchParams: { search: string }
}) {
  const items = await getRooms(searchParams.search)

  return (
    <main className=" min-h-screen  p-16 ">
      <div className="flex justify-between items-center mb-8 ">
        <h1 className="text-4xl"> Fine Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room"> Create Room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item: any) => {
          return <RoomCard key={item.id} room={item}></RoomCard>
        })}
      </div>
    </main>
  )
}
