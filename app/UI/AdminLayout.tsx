import Link from 'next/link';
import Header from '../(components)/nav/header';
import { ReactNode } from 'react';

export default function AdminLayout({
	title,
	children,
}: {
	title: string;
	children?: ReactNode;
}) {
	return (
		<main className='grid grid-cols-12 gap-4 w-full h-full'>
			<nav className='col-span-2 flex flex-col gap-4 p-8 bg-foreground dark:bg-foreground-dark text-background dark:text-background-dark h-full min-h-[100vh]'>
				<div className='flex flex-col gap-4'>
					<Link href='/dashboard/resume'>Create reume item</Link>
					<Link href='/dashboard/createCourse'>Create Course</Link>
					<Link href='/dashboard/courses'>Edit Courses</Link>
					<Link href='/dashboard/createProject'>Create Project</Link>
					<Link href='/dashboard/projects'>Edit Projects</Link>
				</div>
                <div>
                    
                </div>
			</nav>
			<section className='flex flex-col col-span-10 items-center h-full justify-center'>
				<Header />
				<h2>{title}</h2>
				{children}
			</section>
		</main>
	);
}
