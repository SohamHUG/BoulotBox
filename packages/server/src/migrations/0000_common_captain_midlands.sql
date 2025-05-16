CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."user_type" AS ENUM('freelance', 'client');--> statement-breakpoint
CREATE TYPE "public"."mission_status" AS ENUM('pending', 'in_progress', 'completed');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"firstname" varchar(255) NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"type" "user_type" NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "missions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"short_description" varchar(255),
	"long_description" text NOT NULL,
	"budget" numeric(10, 2) NOT NULL,
	"deadline" timestamp NOT NULL,
	"status" "mission_status" NOT NULL,
	"published_by" uuid NOT NULL,
	"published_on" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "missions" ADD CONSTRAINT "missions_published_by_users_id_fk" FOREIGN KEY ("published_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;