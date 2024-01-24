import * as React from "react"
import Link from "next/link"
import { Balancer } from "react-wrap-balancer"

import { productCategories } from "@/config/products"
import { getGithubStars } from "@/lib/fetchers/github"
import { getFeaturedProducts } from "@/lib/fetchers/product"
import { getFeaturedStores } from "@/lib/fetchers/store"
// import { cn } from "@/lib/utils"
// import { buttonVariants } from "@/components/ui/button"
import CustomButton from "@/components/ui/button-home"
import { Skeleton } from "@/components/ui/skeleton"
import { ContentSection } from "@/components/shells/content-section"
import { Shell } from "@/components/shells/shell"
import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton"
import { StoreCardSkeleton } from "@/components/skeletons/store-card-skeleton"

import { CategoryCard } from "./_components/category-card"
import { FeaturedProducts } from "./_components/featured-products"
import { FeaturedStores } from "./_components/featured-stores"
import { GithubStars } from "./_components/github-stars"

export default function IndexPage() {
  const productsPromise = getFeaturedProducts()
  const storesPromise = getFeaturedStores()
  const githubStarsPromise = getGithubStars()

  return (
    <Shell className="max-w-6xl pt-0 md:pt-0">
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-4 py-12 text-center md:pt-32"
      >
        <React.Suspense fallback={<Skeleton className="h-7 w-44" />}>
          <GithubStars githubStarsPromise={githubStarsPromise} />
        </React.Suspense>
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tighter md:text-9xl xl:text-[180px] 2xl:text-[200px]">
            Ropa y Sneakers
          </h1>
          <h1 className="px-5 text-5xl font-extrabold leading-tight tracking-tighter md:text-9xl xl:text-[180px] 2xl:text-[200px]">
            <span className="bg-secondary">100%</span>
            Exclusivos
          </h1>
        </div>
        <Balancer className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          El Lugar donde puedes comprar y vender Prendas unicas, exclusivas y de
          la marca que quieras.
        </Balancer>
        <div className="mt-12 flex items-center justify-center gap-4 ">
          <CustomButton
            title="Crea tu tienda"
            url="/signup/business"
            color="accent"
          />
          <CustomButton
            title="Ir a Comprar"
            url="/signup/client"
            color="primary"
          />
        </div>
        <div
          className="pattern-dots absolute top-0 -z-10 size-full pattern-bg-transparent 
  pattern-orange-500 pattern-opacity-10 pattern-size-4 dark:pattern-white dark:pattern-opacity-10 dark:pattern-size-4"
          style={{
            clipPath: "ellipse(57% 69% at 38% 97%)",
          }}
        />
      </section>
      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {productCategories.map((category) => (
          <CategoryCard key={category.title} category={category} />
        ))}
      </section>
      <ContentSection
        id="featured-products"
        aria-labelledby="featured-products-heading"
        title="Nuevos Productos"
        description="Explora los productos mas recientes"
        href="/products"
        linkText="Ver todos"
        className="pt-8 md:pt-10 lg:pt-12"
      >
        <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <React.Suspense
            fallback={Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          >
            <FeaturedProducts productsPromise={productsPromise} />
          </React.Suspense>
        </div>
      </ContentSection>
      <ContentSection
        id="featured-stores"
        aria-labelledby="featured-stores-heading"
        title="Mejores Tiendas"
        description="Explora las mejores tiendas"
        href="/stores"
        linkText="Ver todas"
        className="py-8 md:py-10 lg:py-12"
      >
        <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <React.Suspense
            fallback={Array.from({ length: 4 }).map((_, i) => (
              <StoreCardSkeleton key={i} />
            ))}
          >
            <FeaturedStores storesPromise={storesPromise} />
          </React.Suspense>
        </div>
      </ContentSection>
    </Shell>
  )
}
