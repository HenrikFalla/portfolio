import CourseForm from '@/app/(components)/forms/courseForm';
import AdminLayout from '@/app/(components)/ui/adminLayout';

export default function course() {
	return (
		<AdminLayout title='Create course'>
			<CourseForm />
		</AdminLayout>
	);
}
