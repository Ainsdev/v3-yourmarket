import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Category } from "@/types"

import {
  getProductCount,
  type ProductCountPromise,
} from "@/lib/fetchers/product"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  CardDescription,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const productCountPromise = getProductCount({ category })

  return (
    <Link href={`/categories/${category.title}`}>
      {/* <span className="sr-only">{category.title}</span>
      <Card className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent transition-colors hover:bg-muted/50">
        <CardHeader>
          <div className="grid h-11 w-11 place-items-center rounded-full border-2">
            <category.icon className="h-5 w-5" aria-hidden="true" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-1.5">
          <CardTitle className="capitalize">{category.title}</CardTitle>
          <React.Suspense fallback={<Skeleton className="h-4 w-20" />}>
            <ProductCount productCountPromise={productCountPromise} />
          </React.Suspense>
        </CardContent>
      </Card> */}
      <div className="group relative overflow-hidden rounded-md">
        <AspectRatio ratio={4 / 5}>
          <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
          <Image
            src={category.image}
            alt={category.title}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="object-cover transition-transform group-hover:scale-105"
            priority
          />
        </AspectRatio>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          <h3 className="text-3xl font-medium capitalize text-slate-100 md:text-2xl">
            {category.title}
          </h3>
          <React.Suspense fallback={<Skeleton className="h-4 w-20" />}>
            <ProductCount productCountPromise={productCountPromise} />
          </React.Suspense>
        </div>
      </div>
    </Link>
  )
}

interface ProductCountProps {
  productCountPromise: ProductCountPromise
}

async function ProductCount({ productCountPromise }: ProductCountProps) {
  const productCount = await productCountPromise

  return <CardDescription>{productCount} productos</CardDescription>
}
