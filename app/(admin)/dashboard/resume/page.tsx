import ResumeFormPage from '@/app/(components)/forms/ResumeForm';
import { getCourseItems } from '@/app/api/(neon)/actions/actions';
import AdminLayout from '@/app/(components)/ui/adminLayout';

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
		<AdminLayout title='Resume Builder'>
			<h1>Resume Builder</h1>
			{/* {courseItems ? <ResumeFormPage courses={courseItems} /> : null} */}
			{/* <ResumeFormPage props={courseItems} /> */}
			<ResumeFormPage props={courseItems} />
		</AdminLayout>
	);
}
