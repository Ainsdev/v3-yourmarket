import { type Metadata } from "next"
import Link from "next/link"
import { env } from "@/env.mjs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OAuthSignIn } from "@/components/auth/oauth-signin"
import { SignInForm } from "@/components/forms/signin-form"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Iniciar Sesion",
  description: "Inicia sesion en tu cuenta",
}

export default function SignInPage() {
  return (
    <Shell className="max-w-lg">
      <Card className="w-full drop-shadow-[0_20px_50px_rgba(266,_120,_81,_0.1)] transition-all duration-150 hover:drop-shadow-[0_20px_50px_rgba(266,_120,_81,_0.25)]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Inicia Sesion</CardTitle>
          <CardDescription>
          Bienvenido de vuelta, a tu lugar en la moda👋
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <OAuthSignIn />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O 
              </span>
            </div>
          </div>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">
            ¿No tienes una cuenta?{" "}
            </span>
            <Link
              aria-label="Sign up"
              href="/signup"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Crear Cuenta
            </Link>
          </div>
          <Link
            aria-label="Reset password"
            href="/signin/reset-password"
            className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:underline"
          >
            Reset password
          </Link>
        </CardFooter>
      </Card>
    </Shell>
  )
}
