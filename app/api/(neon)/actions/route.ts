// app/actions.ts
'use server';
import { neon } from '@neondatabase/serverless';

export async function getUsers() {
	const sql = neon(process.env.DATABASE_URL as string);
	const data = await sql`SELECT email FROM authorised_users`;
	return data;
}
