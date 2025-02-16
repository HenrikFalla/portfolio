// app/actions.ts
'use server';
import { neon } from '@neondatabase/serverless';
interface ResumeData {
	title: string;
	description: string;
	category: string;
	company: string;
	institution: string;
	location: string;
	startDate: Date;
	endDate: Date;
	tags: string[];
}
export async function getUsers() {
	const sql = neon(process.env.DATABASE_URL as string);
	const data = await sql`SELECT email FROM authorised_users`;
	return data;
}
export async function createResumeItem(resumeData: ResumeData) {
	const sql = neon(process.env.DATABASE_URL as string);
	await sql`INSERT INTO public.resume (title, description, category, company, institution, location, "startDate", "endDate", tags) VALUES (${resumeData.title}, ${resumeData.description}, ${resumeData.category}, ${resumeData.company}, ${resumeData.institution}, ${resumeData.location}, ${resumeData.startDate}, ${resumeData.endDate}, ${resumeData.tags})`;
	const response =
		await sql`SELECT * FROM public.resume WHERE title = ${resumeData.title}`;
	console.log(response);
	if (response) {
		return 'Success';
	} else {
		return 'Failure';
	}
}
