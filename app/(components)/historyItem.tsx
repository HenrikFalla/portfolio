import Link from 'next/link';
import {
	getResumeCourseItems,
	getCourseItemTitle,
} from '../api/(neon)/actions/actions';
interface HistoryItem {
	id: number;
	title: string;
	description: string;
	category: string;
	company?: string;
	institution?: string;
	issuer?: string;
	certificateurl?: string;
	location: string;
	startDate: Date;
	endDate: Date;
	tags?: string[];
}
interface CourseTitle {
	title: string;
	slug: string;
}
interface CourseId {
	course_id: string;
}
//consider getting the course ID's from here instead...
export default async function HistoryItem(data: HistoryItem) {
	const startMonth = data.startDate.getMonth() + 1;
	const endMonth = data.endDate.getMonth() + 1;
	const courses = (await getResumeCourseItems(data.id)) as CourseId[];
	console.log('Courses: ', courses.length);
	let courseTitles = [] as CourseTitle[];
	if (courses && courses.length > 0) {
		console.log('Course array is greater than 0');
		// const courseTitles = (await Promise.all(
		// 	courses.map((item) =>  {
		// 	console.log('Item: ', item);
		// 	const courseItem = await getCourseItemTitle(item.course_id);
		// 	console.log('Course item: ', courseItem);
		// 	return [...courseItem]
		// }))) as CourseTitle[];
		const response = await Promise.all(
			courses.map((item) => {
				return getCourseItemTitle(item.course_id);
			}),
		);
		console.log('Response: ', response);
		courseTitles = response.flat(1) as CourseTitle[];
		console.log('Course titles: ', courseTitles);
	} else {
		courseTitles = [] as CourseTitle[];
		console.log(courseTitles);
	}
	// console.log('History item: ', data);
	// console.log(data);
	return (
		<div
			key={data.id}
			className='flex flex-col gap-4 my-8'
			id={data.title.trim().replace(/[\s(),.]/g, '-')}
		>
			<div>
				<h6 className='pb-2'>{data.title}</h6>
				{data.company ? <p>{data.company}</p> : null}
				{data.institution ? <p>{data.institution}</p> : null}
				{data.issuer ? <p>{data.issuer}</p> : null}
				{data.location ? <p>{data.location}</p> : null}
				<p>
					{data.category == 'Sertifisering'
						? `${data.endDate.getFullYear()}/${endMonth
								.toString()
								.padStart(2, '0')}`
						: `${data.startDate.getFullYear()}/${startMonth
								.toString()
								.padStart(2, '0')} - ${data.endDate.getFullYear()}/${endMonth
								.toString()
								.padStart(2, '0')}`}
				</p>
				{data.certificateurl ? (
					<Link
						href={data.certificateurl}
						className='underline'
						target='_blank'
					>
						Sertifisering
					</Link>
				) : null}
			</div>
			<div>
				<p className='text-justify'>{data.description}</p>
				{courseTitles && courseTitles.length > 0 ? (
					<ul className='list-disc list-inside'>
						{courseTitles.map((course) => (
							<li key={course.title}>
								<Link
									key={course.slug}
									href={`/courses/${course.slug}`}
									className='underline'
								>
									{course.title}
								</Link>
							</li>
						))}
					</ul>
				) : null}
				{/* Unsure about using justify here... */}
			</div>
			<div className='inline-flex gap-4 flex-wrap'>
				{data.tags?.map((tag) => (
					<p
						key={tag + data.id}
						className='px-4 py-1.5 rounded-full bg-foreground text-background dark:bg-foreground-dark dark:text-background-dark'
					>
						{tag}
					</p>
				))}
			</div>
		</div>
	);
}
