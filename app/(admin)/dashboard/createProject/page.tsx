'use client';
import CreateProjectForm from '@/app/(components)/forms/CreateProjectForm';
import AdminLayout from '@/app/UI/AdminLayout';

export default function CreateProject() {
	return (
		<AdminLayout title='Create Project'>
			<CreateProjectForm />
		</AdminLayout>
	);
}
