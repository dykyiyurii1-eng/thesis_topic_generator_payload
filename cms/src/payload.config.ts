import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { commonEndpoint, pageEndpoint } from './endpoints'
import { Common } from './globals/Common'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages],
  globals: [Common],
  endpoints: [commonEndpoint, pageEndpoint],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: [FRONTEND_URL],
  csrf: [FRONTEND_URL],
  serverURL: process.env.CMS_URL || 'http://localhost:3000',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})