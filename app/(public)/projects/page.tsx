import ProjectsGrid from '@/app/(components)/projects/projects-grid';

export default function Projects() {
	return (
		<section className='px-4 gap-4 flex flex-col'>
			<div className='w-full text-center'>
				<h1>Projekter</h1>
			</div>
			<div>
				<ProjectsGrid />
			</div>
		</section>
	);
}
