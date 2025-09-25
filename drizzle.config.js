import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL + "?sslmode=require",
  }
});