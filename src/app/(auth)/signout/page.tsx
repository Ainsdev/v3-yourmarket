import type { Metadata } from "next"
import { env } from "@/env.mjs"

import { LogOutButtons } from "@/components/auth/logout-buttons"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Cerrar Session",
  description: "Cerrar sesion de tu cuenta",
}

export default function SignOutPage() {
  return (
    <Shell className="max-w-xs">
      <PageHeader
        id="sign-out-page-header"
        aria-labelledby="sign-out-page-header-heading"
        className="text-center"
      >
        <PageHeaderHeading size="sm">Cerrar Sesion</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Seguro que quieres cerrar sesion?
        </PageHeaderDescription>
      </PageHeader>
      <LogOutButtons />
    </Shell>
  )
}
