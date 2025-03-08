// app/actions.ts
'use server';
import { neon } from '@neondatabase/serverless';
interface ResumeData {
	title: string;
	description?: string;
	category?: string;
	company?: string;
	institution?: string;
	issuer?: string;
	certificateUrl?: string;
	location?: string;
	startDate?: Date;
	endDate?: Date;
	tags?: string[];
}
interface CourseData {
	title: string;
	description: string;
	instructor: string;
	company: string;
	slug: string;
	url: string;
}
interface UpdateCourseData {
	id: number;
	title: string;
	description: string;
	instructor: string;
	company: string;
	slug: string;
	url: string;
}
interface ProjectData {
	title: string;
	description: string;
	slug: string;
	url: string;
	githubUrl: string;
	mainImage: string;
	galleryImages: string[];
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
	if (response) {
		return response;
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
export async function updateCourseItem(updateCourseData: UpdateCourseData) {
	const sql = neon(process.env.DATABASE_URL as string);
	const data =
		await sql`UPDATE pulic.courses WHERE id = ${updateCourseData.id} SET instructor = ${updateCourseData.instructor}, description = ${updateCourseData.description}, title = ${updateCourseData.title}, company = ${updateCourseData.company}, slug = ${updateCourseData.slug}, url = ${updateCourseData.url} `;
	return data;
}
export async function getCourseItem(slug: string) {
	const sql = neon(process.env.DATABASE_URL as string);
	const data = await sql`SELECT * FROM public.courses WHERE slug = ${slug}`;

	return data;
}
export async function getCourseItemTitle(id: string) {
	const sql = neon(process.env.DATABASE_URL as string);
	const data =
		await sql`SELECT title, slug FROM public.courses WHERE id = ${id}`;
	return data;
}
export async function getCourseItems() {
	const sql = neon(process.env.DATABASE_URL as string);
	const data = await sql`SELECT * FROM public.courses`;
	return data;
}
export async function getResumeId(title: string) {
	const sql = neon(process.env.DATABASE_URL as string);
	const data = await sql`SELECT id FROM public.resume WHERE title = ${title}`;
	return data;
}
export async function createResumeCourse(resumeId: number, courseId: number) {
	console.log('Getting resume id');
	const sql = neon(process.env.DATABASE_URL as string);
	const data =
		await sql`INSERT INTO public.resume_courses (resume_id, course_id) VALUES (${resumeId}, ${courseId})`;
	return data;
}
export async function getResumeCourseItems(resumeId: number) {
	const sql = neon(process.env.DATABASE_URL as string);
	console.log('Getting resume id', resumeId);
	try {
		const data =
			await sql`SELECT course_id FROM resume_courses WHERE EXISTS (SELECT * FROM resume_courses WHERE resume_id = ${resumeId}) AND resume_id = ${resumeId}`;
		return data;
	} catch (e) {
		return e;
	}
}
export async function createProject(projectData: ProjectData) {
	const sql = neon(process.env.DATABASE_URL as string);
	const data =
		await sql`INSERT INTO public.projects (title, description, slug, url, githuburl, mainimage, galleryimages) VALUES (${projectData.title}, ${projectData.description}, ${projectData.slug}, ${projectData.url}, ${projectData.githubUrl}, ${projectData.mainImage}, ${projectData.galleryImages})`;
	return data;
}
export async function getProject(slug: string) {
	const sql = neon(process.env.DATABASE_URL as string);
	const data = await sql`SELECT * FROM public.projects WHERE slug = ${slug}`;
	return data;
}
export async function getProjects() {
	const sql = neon(process.env.DATABASE_URL as string);
	const data = await sql`SELECT * FROM public.projects`;
	return data;
}
