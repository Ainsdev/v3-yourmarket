"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { stores } from "@/db/schema"
import { and, eq, not } from "drizzle-orm"
import { products } from "drizzle/schema"
import { z } from "zod"

import { slugify } from "@/lib/utils"
import { storeSchema, updateStoreSchema } from "@/lib/validations/store"

const extendedStoreSchema = storeSchema.extend({
  userId: z.string(),
})

export async function addStore(rawInput: z.infer<typeof extendedStoreSchema>) {
  const input = extendedStoreSchema.parse(rawInput)

  const storeWithSameName = await db.query.stores.findFirst({
    where: eq(stores.name, input.name),
  })

  if (storeWithSameName) {
    throw new Error("Store name already taken.")
  }

  await db.insert(stores).values({
    name: input.name,
    description: input.description,
    userId: input.userId,
    slug: slugify(input.name),
  })

  revalidateTag("user-stores")
}

export async function updateStore(storeId: number, fd: FormData) {
  try {
    const input = updateStoreSchema.parse({
      name: fd.get("name"),
      description: fd.get("description"),
    })

    const storeWithSameName = await db.query.stores.findFirst({
      where: and(eq(stores.name, input.name), not(eq(stores.id, storeId))),
      columns: {
        id: true,
      },
    })

    if (storeWithSameName) {
      throw new Error("Store name already taken")
    }

    await db
      .update(stores)
      .set({
        name: input.name,
        description: input.description,
      })
      .where(eq(stores.id, storeId))

    revalidateTag("user-stores")
    revalidatePath(`/dashboard/stores/${storeId}`)

    return {
      message: "Store updated successfully.",
    }
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error("Something went wrong, please try again.")
  }
}

export async function deleteStore(storeId: number) {
  try {
    const store = await db.query.stores.findFirst({
      where: eq(stores.id, storeId),
      columns: {
        id: true,
      },
    })

    if (!store) {
      throw new Error("Store not found")
    }

    await db.delete(stores).where(eq(stores.id, storeId))

    // Delete all products of this store
    await db.delete(products).where(eq(products.storeId, storeId))

    const path = "/dashboard/stores"
    revalidatePath(path)
    redirect(path)
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error("Something went wrong, please try again.")
  }
}
