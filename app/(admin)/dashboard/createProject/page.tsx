'use client';
import CreateProjectForm from '@/app/(components)/forms/CreateProjectForm';
import AdminLayout from '@/app/(components)/ui/adminLayout';

export default function CreateProject() {
	return (
		<AdminLayout title='Create Project'>
			<CreateProjectForm />
		</AdminLayout>
	);
}
