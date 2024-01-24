CREATE TABLE IF NOT EXISTS "addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"line1" varchar(191),
	"line2" varchar(191),
	"city" varchar(191),
	"state" varchar(191),
	"postalCode" varchar(191),
	"country" varchar(191),
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "carts" (
	"id" serial PRIMARY KEY NOT NULL,
	"paymentIntentId" varchar(191),
	"clientSecret" varchar(191),
	"items" json DEFAULT 'null',
	"createdAt" timestamp DEFAULT now(),
	"closed" smallint DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar(191),
	"email" varchar(191) NOT NULL,
	"token" varchar(191) NOT NULL,
	"newsletter" smallint DEFAULT 0 NOT NULL,
	"marketing" smallint DEFAULT 0 NOT NULL,
	"transactional" smallint DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"storeId" integer NOT NULL,
	"items" json DEFAULT 'null',
	"amount" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"paykuPaymentIntentId" varchar(191) NOT NULL,
	"paykuPaymentIntentStatus" varchar(191) NOT NULL,
	"name" varchar(191),
	"email" varchar(191),
	"addressId" integer,
	"createdAt" timestamp DEFAULT now(),
	"quantity" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"storeId" integer NOT NULL,
	"paykuAccountId" varchar(191) NOT NULL,
	"paykuAccountCreatedAt" integer,
	"paykuAccountExpiresAt" integer,
	"detailsSubmitted" smallint DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(191) NOT NULL,
	"description" text,
	"images" json DEFAULT 'null',
	"price" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"inventory" integer DEFAULT 0 NOT NULL,
	"rating" integer DEFAULT 0 NOT NULL,
	"storeId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"tags" json DEFAULT 'null',
	"category" varchar(191) NOT NULL,
	"subcategory" varchar(191)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stores" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar(191) NOT NULL,
	"name" varchar(191) NOT NULL,
	"description" text,
	"image" varchar(191),
	"country" varchar(191),
	"region" varchar(191),
	"city" varchar(191),
	"slug" text,
	"createdAt" timestamp DEFAULT now(),
	"active" smallint DEFAULT 0 NOT NULL,
	"paykuAccountId" varchar(191)
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "store_id_idx" ON "products" ("storeId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_id_idx" ON "stores" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "city_idx" ON "stores" ("city");