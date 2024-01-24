
import {
  decimal,
  integer,
  json,
  pgTable,
  serial,
  smallint,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"


export const addresses = pgTable("addresses", {
  id: serial("id").notNull().primaryKey(),
  line1: varchar("line1", { length: 191 }),
  line2: varchar("line2", { length: 191 }),
  city: varchar("city", { length: 191 }),
  state: varchar("state", { length: 191 }),
  postalCode: varchar("postalCode", { length: 191 }),
  country: varchar("country", { length: 191 }),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
})

export const carts = pgTable("carts", {
  id: serial("id").notNull().primaryKey(),
  paymentIntentId: varchar("paymentIntentId", { length: 191 }),
  clientSecret: varchar("clientSecret", { length: 191 }),
  items: json("items").default("null"),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
  closed: smallint("closed").default(0).notNull(),
})

export const emailPreferences = pgTable("email_preferences", {
  id: serial("id").notNull().primaryKey(),
  userId: varchar("userId", { length: 191 }),
  email: varchar("email", { length: 191 }).notNull(),
  token: varchar("token", { length: 191 }).notNull(),
  newsletter: smallint("newsletter").default(0).notNull(),
  marketing: smallint("marketing").default(0).notNull(),
  transactional: smallint("transactional").default(0).notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
})

export const orders = pgTable("orders", {
  id: serial("id").notNull().primaryKey(),
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
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
  quantity: integer("quantity"),
})

export const payments = pgTable("payments", {
  id: serial("id").notNull().primaryKey(),
  storeId: integer("storeId").notNull(),
  paykuAccountId: varchar("paykuAccountId", { length: 191 }).notNull(),
  paykuAccountCreatedAt: integer("paykuAccountCreatedAt"),
  paykuAccountExpiresAt: integer("paykuAccountExpiresAt"),
  detailsSubmitted: smallint("detailsSubmitted").default(0).notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
})

export const products = pgTable("products", {
  id: serial("id").notNull().primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  images: json("images").default("null"),
  price: decimal("price", { precision: 10, scale: 2 })
    .default("0.00")
    .notNull(),
  inventory: integer("inventory").default(0).notNull(),
  rating: integer("rating").default(0).notNull(),
  storeId: integer("storeId").notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
  tags: json("tags").default("null"),
  category: varchar("category", { length: 191 }).notNull(),
  subcategory: varchar("subcategory", { length: 191 }),
})

export const stores = pgTable(
  "stores",
  {
    id: serial("id").primaryKey(),
    userId: varchar("userId", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    description: text("description"),
    slug: text("slug"),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
    active: smallint("active").default(0).notNull(),
    paykuAccountId: varchar("paykuAccountId", { length: 191 }),
  }
)
