import { getRoom } from "@/src/services/rooms"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { GithubIcon } from "lucide-react"
import { splitTags, TagsList } from "@/src/components/tags-list"

export default async function RoomPage(props: { params: { roomId: string } }) {
  console.log("props", props)
  const roomId = props.params.roomId

  const room = await getRoom(roomId)
  if (!room) {
    return <div>No room with this ID found</div>
  }

  return (
    <div className="grid grid-cols-4 min-h-full">
      <div className="col-span-3 bg-blue-400 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          Video Player
        </div>
      </div>
      <div className="col-span-1 bg-blue-400 p-4 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base">{room?.name}</h1>

          {room?.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center gap-2 text-center text-sm self-center"
              target="_blank"
              rel="noopener"
            >
              Github Project <GithubIcon />
            </Link>
          )}

          <p className="text-base text-gray-600">{room?.description}</p>

          <TagsList tags={splitTags(room.tags)} />
        </div>
      </div>
    </div>
  )
}
