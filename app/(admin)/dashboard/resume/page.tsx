import ResumeFormPage from '@/app/(components)/ResumeForm';
import { getCourseItems } from '@/app/api/(neon)/actions/actions';


export default async function ResumeBuilder() {
	const response = await getCourseItems();

	const courseItems = response as unknown as [
		{
			id: number;
			title: string;
			slug: string;
		},
	];
	console.log(courseItems);
	return (
		<main className='p-4'>
			<h1>Resume Builder</h1>
			{/* {courseItems ? <ResumeFormPage courses={courseItems} /> : null} */}
			{/* <ResumeFormPage props={courseItems} /> */}
			<ResumeFormPage props={courseItems} />
		</main>
	);
}
