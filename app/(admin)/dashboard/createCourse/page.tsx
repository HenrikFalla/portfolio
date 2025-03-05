import CourseForm from '@/app/(components)/forms/courseForm';
import AdminLayout from '@/app/UI/AdminLayout';

export default function course() {
	return (
		<AdminLayout title='Create corse'>
			<CourseForm />
		</AdminLayout>
	);
}
