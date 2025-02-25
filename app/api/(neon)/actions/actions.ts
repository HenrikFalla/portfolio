// app/actions.ts
'use server';
import { neon } from '@neondatabase/serverless';
interface ResumeData {
	title: string;
	description: string;
	category: string;
	company: string;
	institution: string;
	issuer: string;
	certificateUrl: string;
	location: string;
	startDate: Date;
	endDate: Date;
	tags: string[];
}
interface CourseData {
	title: string;
	description: string;
	instructor: string;
	company: string;
	slug: string;
	url: string;
}
export async function getUsers() {
	const sql = neon(process.env.DATABASE_URL as string);
	const data = await sql`SELECT email FROM authorised_users`;
	return data;
}
export async function createResumeItem(resumeData: ResumeData) {
	const sql = neon(process.env.DATABASE_URL as string);
	await sql`INSERT INTO public.resume (title, description, category, company, institution, issuer, certificateurl, location, "startDate", "endDate", tags) VALUES (${resumeData.title}, ${resumeData.description}, ${resumeData.category}, ${resumeData.company}, ${resumeData.institution}, ${resumeData.issuer}, ${resumeData.certificateUrl}, ${resumeData.location}, ${resumeData.startDate}, ${resumeData.endDate}, ${resumeData.tags})`;
	const response =
		await sql`SELECT * FROM public.resume WHERE title = ${resumeData.title}`;
	console.log(response);
	if (response) {
		return 'Success';
	} else {
		return 'Failure';
	}
}
export async function getResumeItems() {
	const sql = neon(process.env.DATABASE_URL as string);
	const data =
		await sql`SELECT * FROM resume WHERE category IN ('Utdanning', 'Jobb') ORDER BY "endDate" DESC NULLS LAST`;
	return data;
}
export async function getCertificationItems() {
	const sql = neon(process.env.DATABASE_URL as string);
	const data =
		await sql`SELECT * FROM resume WHERE category IN ('Sertifisering') ORDER BY "endDate" DESC NULLS LAST`;
	return data;
}
export async function createCourseItem(courseData: CourseData) {
	const sql = neon(process.env.DATABASE_URL as string);
	const data =
		await sql`INSERT INTO public.courses (title, description, instructor, company, slug, url) VALUES (${courseData.title}, ${courseData.description}, ${courseData.instructor}, ${courseData.company}, ${courseData.slug}, ${courseData.url})`;
	return data;
}
export async function getCourseItem(slug: string) {
	const sql = neon(process.env.DATABASE_URL as string);
	const data = await sql`SELECT * FROM public.courses WHERE slug = ${slug}`;
	return data;
}
