import HistoryItem from '@/app/(components)/historyItem';
import {
	getCertificationItems,
	// getResumeCourseItems,
	getResumeItems,
	// getCourseItemTitle,
} from '@/app/api/(neon)/actions/actions';
import Header from '@/app/(components)/nav/header';
import HistoryItemLinks from '@/app/(components)/historyItemLinks';
// interface ResumeCourseItem {
// 	id: number;
// 	resume_id: string;
// 	course_id: string;
// 	courses?: CourseTitle[];
// }
// interface CourseTitle {
// 	title: string;
// 	slug: string;
// }
export default async function Resume() {
	const resumeItems = await getResumeItems();
	const certificationItems = await getCertificationItems();
	console.log(resumeItems);
	const resumeLinks = resumeItems.map((item) => {
		const link = {
			url: item.title.trim().replace(/[\s(),.]/g, '-'),
			title: item.title,
		};
		return link;
	});
	resumeLinks.push({
		url: 'sertifiseringer',
		title: 'Sertifiseringer',
	});

	console.log('Resume Links: ', resumeLinks);
	const defaultDate: Date = new Date();
	return (
		<div className='grid grid-cols-2 gap-4 max-w-4xl mx-auto [&>header]:col-span-2'>
			<Header />
			<div className='col-span-2'>
				<h1 className='mx-auto w-fit'>Erfaring</h1>
			</div>
			<div className='link-section'>
				<HistoryItemLinks links={resumeLinks} />
			</div>
			<div className='col-span-2 md:col-span-1 order-1 md:order-2 px-4 md:px-0 pb-20'>
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
				<h3 className='pt-8 relative'>
					<span
						id='sertifiseringer'
						className='absolute -top-[35vh]'
					></span>
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
