import { getProjects } from '@/app/api/(neon)/actions/actions';
import { Skeleton } from '@heroui/skeleton';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProjectsGrid() {
	const projects = await getProjects();
	if (projects.length > 0) {
		return (
			<>
				<section className='grid grid-cols-6 gap-2 w-full max-w-5xl'>
					{projects.map((project, index) => (
						<Skeleton
							className='col-span-3 md:col-span-2 min-h-[300px]'
							key={index}
						>
							<Link
								href={'/projects/' + project.slug}
								className='grid-cols-3 md:grid-cols-2'
							>
								<div className='w-full'>
									<div className=' border-8 border-foreground dark:border-foreground-dark bg-foreground dark:bg-foreground-dark w-fit h-fit rounded-lg overflow-hidden'>
										<Image
											src={project.mainimage}
											alt={project.title}
											width={300}
											height={300}
											className='aspect-square rounded-lg w-full object-contain'
										/>
									</div>
									<h6>{project.title}</h6>
								</div>
							</Link>
						</Skeleton>
					))}
				</section>
			</>
		);
	} else {
		return (
			<>
				<section>
					<p>No projects found</p>
				</section>
			</>
		);
	}
}
