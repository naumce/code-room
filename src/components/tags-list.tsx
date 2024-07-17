import { Badge } from "lucide-react"
export function splitTags(tags: string) {
  console.log(tags)
  return tags.split(",").map((lang: any) => lang.trim())
}
export function TagsList({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map(tag => (
        <Badge className="w-fit" key={tag}>
          {tag}
        </Badge>
      ))}
    </div>
  )
}
