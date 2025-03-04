import Header from '@/app/(components)/nav/header';
import Link from 'next/link';

export default function Dashbaord() {
	return (
		<main className='grid grid-cols-12 gap-4 w-full h-full'>
			<nav className='col-span-2 flex flex-col gap-4 p-8 bg-foreground dark:bg-foreground-dark text-background dark:text-background-dark h-full min-h-[100vh]'>
				<Link href='/dashboard/resume'>Create reume item</Link>
				<Link href='/dashboard/createCourse'>Create Course</Link>
				<Link href='/dashboard/courses'>Edit Courses</Link>
				<Link href='/dashboard/createProject'>Create Project</Link>
				<Link href='/dashboard/projects'>Edit Projects</Link>
			</nav>
			<section className='flex flex-col col-span-10 items-center h-full justify-center'>
				<h1>Dashboard</h1>
				<Header />
			</section>
		</main>
	);
}
