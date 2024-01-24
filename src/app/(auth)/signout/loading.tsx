import { Skeleton } from "@/components/ui/skeleton"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

export default function SignOutLoading() {
  return (
    <Shell className="max-w-md">
      <PageHeader className="text-center">
        <PageHeaderHeading size="sm">Cerrar Sesion</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Seguro que quieres salir?
        </PageHeaderDescription>
      </PageHeader>
      <div className="flex w-full items-center justify-center space-x-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </Shell>
  )
}
