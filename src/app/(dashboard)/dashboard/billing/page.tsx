import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { CheckIcon } from "@radix-ui/react-icons"

import { storeSubscriptionPlans } from "@/config/subscriptions"
import { getCacheduser } from "@/lib/fetchers/auth"
// import { getSubscriptionPlan } from "@/lib/fetchers/stripe"
import { cn, formatDate, formatPrice } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ManageSubscriptionForm } from "@/components/forms/manage-subscription-form"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Tu Suscripción",
  description: "Administra tu suscripción de YourMarket",
}

export default async function BillingPage() {
  const user = await getCacheduser()

  if (!user) {
    redirect("/signin")
  }

  // const subscriptionPlan = await getSubscriptionPlan({ userId: user.id })

  return (
    <Shell variant="sidebar" as="div">
      <PageHeader separated>
        <PageHeaderHeading size="sm">Suscripcion</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Administra tu suscripcion
        </PageHeaderDescription>
      </PageHeader>
      <section className="space-y-5">
        <h2 className="text-xl font-semibold sm:text-2xl"> Info de suscripcion</h2>
        <Card className="grid gap-4 p-6">
          {/* <h3 className="text-lg font-semibold sm:text-xl">
            {subscriptionPlan?.name ?? "Ollie"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {!subscriptionPlan?.isSubscribed
              ? "Haz Upgrade, para crear mas tiendas y productos"
              : subscriptionPlan.isCanceled
                ? "Tu plan sera cancelado el "
                : "Tu plan se renueva el "}
            {subscriptionPlan?.stripeCurrentPeriodEnd
              ? `${formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.`
              : null}
          </p> */}
          <h3 className="text-lg font-semibold sm:text-xl">
            Proximamente....
          </h3>
        </Card>
      </section>
      <section className="space-y-5 pb-2.5">
        <h2 className="text-xl font-semibold sm:text-2xl">
          Planes de suscripcion
        </h2>
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {storeSubscriptionPlans.map((plan, i) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col",
                i === storeSubscriptionPlans.length - 1 &&
                  "lg:col-span-2 xl:col-span-1",
                i === 1 && "border-primary shadow-md"
              )}
            >
              <CardHeader>
                <CardTitle className="line-clamp-1">{plan.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              {/* <CardContent className="grid flex-1 place-items-start gap-6">
                <div className="text-3xl font-bold">
                  {formatPrice(plan.price, {
                    currency: "CLP",
                  })}
                  <span className="text-sm font-normal text-muted-foreground">
                    /mes
                  </span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4" aria-hidden="true" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent> */}
              {/* <CardFooter className="pt-4">
                {plan.id === "basic" ? (
                  <Link
                    href="/dashboard/stores"
                    className={cn(
                      buttonVariants({
                        className: "w-full",
                      })
                    )}
                  >
                    Empiza ahora
                    <span className="sr-only">Empieza ahora</span>
                  </Link>
                ) : (
                  <ManageSubscriptionForm
                    stripePriceId={plan.stripePriceId}
                    stripeCustomerId={subscriptionPlan?.stripeCustomerId}
                    stripeSubscriptionId={
                      subscriptionPlan?.stripeSubscriptionId
                    }
                    isSubscribed={subscriptionPlan?.isSubscribed ?? false}
                    isCurrentPlan={subscriptionPlan?.name === plan.name}
                  />
                )}
              </CardFooter> */}
            </Card>
          ))}
        </div>
      </section>
    </Shell>
  )
}
