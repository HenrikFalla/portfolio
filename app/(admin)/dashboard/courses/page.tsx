import UpdateCourseForm from '@/app/(components)/forms/updateCourseForm';
import { getCourseItems } from '@/app/api/(neon)/actions/actions';
import AdminLayout from '@/app/(components)/ui/adminLayout';
interface FormList {
	id: number;
	title: string;
	company: string;
	instructor: string;
	url: string;
	description: string;
}

export default async function course() {
	const formItems = await getCourseItems();
	const formList: FormList[] = formItems.map((item) => ({
		id: item.id,
		title: item.title,
		company: item.company,
		instructor: item.instructor,
		url: item.url,
		description: item.description,
	}));
	// console.log('FormList', formList);
	return (
		<AdminLayout title='Update Course'>
			<UpdateCourseForm formList={formList as FormList[]} />;
		</AdminLayout>
	);
}
