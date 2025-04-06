DO $$ BEGIN
 CREATE TYPE "public"."icon_name" AS ENUM('bubbles', 'dog_bowl', 'dog_head', 'grass', 'meds', 'paw_prints', 'scissors', 'toothbrush');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "packs" (
	"id" serial PRIMARY KEY NOT NULL,
	"avatar_url" text,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pack_activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"pack_id" integer NOT NULL,
	"name" text NOT NULL,
	"icon_name" "icon_name",
	"ranking" serial NOT NULL,
	"tracking" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pets" (
	"id" serial PRIMARY KEY NOT NULL,
	"pack_id" integer NOT NULL,
	"avatar_url" text,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pet_activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"pack_activity_id" integer NOT NULL,
	"pet_id" integer NOT NULL,
	"tracking" boolean DEFAULT true NOT NULL,
	"desired_frequency" integer,
	"daily_max" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pet_activity_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"activity_id" integer NOT NULL,
	"pet_id" integer NOT NULL,
	"time_stamp" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pack_activities" ADD CONSTRAINT "pack_activities_pack_id_packs_id_fk" FOREIGN KEY ("pack_id") REFERENCES "public"."packs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pets" ADD CONSTRAINT "pets_pack_id_packs_id_fk" FOREIGN KEY ("pack_id") REFERENCES "public"."packs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pet_activities" ADD CONSTRAINT "pet_activities_pack_activity_id_pack_activities_id_fk" FOREIGN KEY ("pack_activity_id") REFERENCES "public"."pack_activities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pet_activities" ADD CONSTRAINT "pet_activities_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pet_activity_logs" ADD CONSTRAINT "pet_activity_logs_activity_id_pet_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."pet_activities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pet_activity_logs" ADD CONSTRAINT "pet_activity_logs_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pet_activity_log_idx" ON "pet_activity_logs" USING btree ("id");