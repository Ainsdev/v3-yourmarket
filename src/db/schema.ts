import { relations } from "drizzle-orm"
import {
  decimal,
  integer,
  json,
  pgTable,
  serial,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core"

export const stores = pgTable(
  "stores",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
    userId: varchar("userId", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    description: text("description"),
    image: varchar("image", { length: 191 }),
    country: varchar("country", { length: 191 }),
    region: varchar("region", { length: 191 }),
    city: varchar("city", { length: 191 }),
    slug: text("slug"),
    active: smallint("active").default(0).notNull(),
    paykuAccountId: varchar("paykuAccountId", { length: 191 }),
  },
  (stores) => {
    return {
      userIdIndex: uniqueIndex("user_id_idx").on(stores.userId),
      cityIndex: uniqueIndex("city_idx").on(stores.city),
    }
  }
)

export type Store = typeof stores.$inferSelect
export type NewStore = typeof stores.$inferInsert

export const storesRelations = relations(stores, ({ many }) => ({
  products: many(products),
  payments: many(payments),
}))

export const products = pgTable(
  "products",
  {
    id: serial("id").notNull().primaryKey(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
    name: varchar("name", { length: 191 }).notNull(),
    description: text("description"),
    images: json("images").default("null"),
    price: decimal("price", { precision: 10, scale: 2 })
      .default("0.00")
      .notNull(),
    inventory: integer("inventory").default(0).notNull(),
    rating: integer("rating").default(0).notNull(),
    storeId: integer("storeId").notNull(),
    tags: json("tags").default("null"),
    category: varchar("category", { length: 191 }).notNull(),
    subcategory: varchar("subcategory", { length: 191 }),
  },
  (products) => {
    return {
      storeIdIndex: uniqueIndex("store_id_idx").on(products.storeId),
    }
  }
)

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert

export const productsRelations = relations(products, ({ one }) => ({
  store: one(stores, { fields: [products.storeId], references: [stores.id] }),
}))

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const carts = pgTable("carts", {
  id: serial("id").notNull().primaryKey(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  paymentIntentId: varchar("paymentIntentId", { length: 191 }),
  clientSecret: varchar("clientSecret", { length: 191 }),
  items: json("items").default("null"),
  closed: smallint("closed").default(0).notNull(),
})

export type Cart = typeof carts.$inferSelect
export type NewCart = typeof carts.$inferInsert

export const emailPreferences = pgTable("email_preferences", {
  id: serial("id").notNull().primaryKey(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  userId: varchar("userId", { length: 191 }),
  email: varchar("email", { length: 191 }).notNull(),
  token: varchar("token", { length: 191 }).notNull(),
  newsletter: smallint("newsletter").default(0).notNull(),
  marketing: smallint("marketing").default(0).notNull(),
  transactional: smallint("transactional").default(0).notNull(),
})
export type EmailPreference = typeof emailPreferences.$inferSelect
export type NewEmailPreference = typeof emailPreferences.$inferInsert

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const payments = pgTable("payments", {
  id: serial("id").notNull().primaryKey(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  storeId: integer("storeId").notNull(),
  paykuAccountId: varchar("paykuAccountId", { length: 191 }).notNull(),
  paykuAccountCreatedAt: integer("paykuAccountCreatedAt"),
  paykuAccountExpiresAt: integer("paykuAccountExpiresAt"),
  detailsSubmitted: smallint("detailsSubmitted").default(0).notNull(),
})
export type Payment = typeof payments.$inferSelect
export type NewPayment = typeof payments.$inferInsert

export const paymentsRelations = relations(payments, ({ one }) => ({
  store: one(stores, { fields: [payments.storeId], references: [stores.id] }),
}))

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const orders = pgTable("orders", {
  id: serial("id").notNull().primaryKey(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  storeId: integer("storeId").notNull(),
  items: json("items").default("null"),
  amount: decimal("amount", { precision: 10, scale: 2 })
    .default("0.00")
    .notNull(),
  paykuPaymentIntentId: varchar("paykuPaymentIntentId", {
    length: 191,
  }).notNull(),
  paykuPaymentIntentStatus: varchar("paykuPaymentIntentStatus", {
    length: 191,
  }).notNull(),
  name: varchar("name", { length: 191 }),
  email: varchar("email", { length: 191 }),
  addressId: integer("addressId"),
  quantity: integer("quantity"),
})

export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const addresses = pgTable("addresses", {
  id: serial("id").notNull().primaryKey(),
  line1: varchar("line1", { length: 191 }),
  line2: varchar("line2", { length: 191 }),
  city: varchar("city", { length: 191 }),
  state: varchar("state", { length: 191 }),
  postalCode: varchar("postalCode", { length: 191 }),
  country: varchar("country", { length: 191 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export type Address = typeof addresses.$inferSelect
export type NewAddress = typeof addresses.$inferInsert
