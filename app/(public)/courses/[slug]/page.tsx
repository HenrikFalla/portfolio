import Header from '@/app/(components)/nav/header';
import { getCourseItem } from '@/app/api/(neon)/actions/actions';
import Markdown from 'marked-react';
import Link from 'next/link';

export default async function Course({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	const courseData = await getCourseItem(slug);
	// console.log(courseData);
	if (!courseData) {
		return <div>Course not found</div>;
	}
	return (
		<div className='grid grid-cols-2 gap-4 max-w-4xl mx-auto [&>header]:col-span-2'>
			<Header />
			<section className='col-span-2'>
				{courseData[0].title ? <h3>{courseData[0].title}</h3> : null}
				<div className='flex flex-row gap-4 w-full items-center justify-center py-4 bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(255,255,255,0.1)] rounded-lg my-4'>
					{courseData[0].company ? (
						<p>
							Kurs levert av <strong>{courseData[0].company}</strong>
						</p>
					) : null}
					{courseData[0].instructor ? (
						<p>
							Instruktør <strong>{courseData[0].instructor}</strong>
						</p>
					) : null}
					{courseData[0].url ? (
						<Link
							href={courseData[0].url}
							target='_blank'
							className='underline'
						>
							Kursinfo fra leverandør
						</Link>
					) : null}
				</div>
				<div className='markdown-section'>
					{courseData[0].title ? (
						<Markdown>{courseData[0].description}</Markdown>
					) : null}
				</div>
			</section>
		</div>
	);
}
