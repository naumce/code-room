"use server"

import { createRoom } from "@/src/services/rooms"
import { Room } from "@/src/db/schema"
import { getSession } from "@/src/lib/auth"
import { revalidatePath } from "next/cache"

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession()

  if (!session) {
    throw new Error("you must be logged in to create this room")
  }

  const room = await createRoom(roomData, session.user.id)

  revalidatePath("/browse")

  return room
}
