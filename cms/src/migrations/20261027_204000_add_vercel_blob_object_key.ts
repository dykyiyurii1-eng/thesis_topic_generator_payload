import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

/**
 * Vercel Blob adds this hidden field to upload collections. Existing databases
 * created before Blob was enabled need the column added explicitly.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "_objectkey" varchar;
  `)
}

// Keep existing Blob object keys intact if a migration rollback is requested.
export async function down(_: MigrateDownArgs): Promise<void> {}
