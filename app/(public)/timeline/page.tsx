import HistoryItem from '@/app/(components)/historyItem';
import {
	getCertificationItems,
	getResumeCourseItems,
	getResumeItems,
	getCourseItemTitle,
} from '@/app/api/(neon)/actions/actions';
import Header from '@/app/(components)/nav/header';
interface ResumeCourseItem {
	id: number;
	resume_id: string;
	course_id: string;
	courses?: CourseTitle[];
}
interface CourseTitle {
	title: string;
	slug: string;
}
export default async function Resume() {
	const resumeItems = await getResumeItems();
	const certificationItems = await getCertificationItems();
	// console.log(resumeItems);
	const defaultDate: Date = new Date();
	for (const item of resumeItems) {
		console.log(item.id);
		const response = (await getResumeCourseItems(
			item.id,
		)) as ResumeCourseItem[];
		console.log('Response from server', response);
		if (response && response.length > 0) {
			for (const resItem of response) {
				console.log('Res Item', resItem.course_id);
				const courseResponse = (await getCourseItemTitle(
					resItem.course_id,
				)) as CourseTitle[];
				console.log('Course Response', courseResponse);
				if (courseResponse && courseResponse.length > 0) {
					// const course = [...courseResponse];
					// console.log('Destructured response', course);
					item.courses = [...courseResponse];
				}
				// return resItem;
			}
		}
		console.log('Updated response', resumeItems);
	}
	return (
		<div className='grid grid-cols-2 gap-4 max-w-4xl mx-auto [&>header]:col-span-2'>
			<Header />
			<div className='col-span-2'>
				<h1 className='mx-auto w-fit'>Erfaring</h1>
			</div>
			<div className='col-span-2 md:col-span-1 px-4 md:px-0'></div>
			<div className='col-span-2 md:col-span-1 px-4 md:px-0'>
				<h3
					className='pt-8'
					id='historikk'
				>
					Historikk
				</h3>
				{resumeItems.map((item) => (
					<HistoryItem
						title={''}
						description={''}
						category={''}
						location={''}
						startDate={defaultDate}
						endDate={defaultDate}
						key={item.id}
						id={item.id}
						{...item}
					/>
				))}
				<h3
					className='pt-8'
					id='sertifiseringer'
				>
					Sertifiseringer
				</h3>
				{certificationItems.map((item) => (
					<HistoryItem
						title={''}
						description={''}
						category={''}
						location={''}
						startDate={defaultDate}
						endDate={defaultDate}
						key={item.id}
						id={item.id}
						{...item}
					/>
				))}
			</div>
		</div>
	);
}
