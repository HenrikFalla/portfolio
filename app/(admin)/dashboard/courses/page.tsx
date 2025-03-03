import UpdateCourseForm from '@/app/(components)/forms/updateCourseForm';
import { getCourseItems } from '@/app/api/(neon)/actions/actions';
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
	console.log('FormList', formList);
	return <UpdateCourseForm formList={formList as FormList[]} />;
}
