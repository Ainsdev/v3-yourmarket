import Link from "next/link"

import { siteConfig } from "@/config/site"
import { type GithubStarsPromise } from "@/lib/fetchers/github"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"

interface GithubStarsProps {
  githubStarsPromise: GithubStarsPromise
}

export async function GithubStars({ githubStarsPromise }: GithubStarsProps) {
  const githubStars = await githubStarsPromise

  return (
    <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
      <Badge
        aria-hidden="true"
        className="rounded-md px-3.5 py-1.5"
        variant="secondary"
      >
        <Icons.robot className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
        Version 2 ya disponible!!!
      </Badge>  
    </Link>
  )
}
