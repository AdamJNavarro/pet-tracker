CREATE TABLE IF NOT EXISTS "pets" (
	"id" serial PRIMARY KEY NOT NULL,
	"avatar_url" text,
	"name" text NOT NULL,
	"bathed_at" timestamp,
	"fed_at" timestamp,
	"groomed_at" timestamp,
	"outside_at" timestamp,
	"walked_at" timestamp,
	CONSTRAINT "pets_name_unique" UNIQUE("name")
);
