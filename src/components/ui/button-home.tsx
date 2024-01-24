import Link from "next/link"

import { cn } from "@/lib/utils"

type Props = {
  title: string
  url: string
  color: string
}

export default function CustomButton({ title, url, color }: Props) {
  return (
    <Link
      href={url}
      className="group relative px-6 py-3 font-bold"
    >
      <span className="absolute inset-0 h-full w-full -translate-x-2 -translate-y-2 bg-foreground transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"></span>
      <span className="absolute inset-0 h-full w-full border-4 border-primary"></span>
      <span className="relative text-lg text-secondary">{title}</span>
    </Link>
  )
}