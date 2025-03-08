import Banner from '@/app/(components)/projects/banner';
import { getProject } from '@/app/api/(neon)/actions/actions';
import Markdown from 'marked-react';
import Image from 'next/image';
import Link from 'next/link';
export default async function Project({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	const projectData = await getProject(slug);
	console.log(projectData);
	if (!projectData) {
		return <div>No project found.</div>;
	}
	console.log(projectData);
	return (
		<section className='max-w-5xl w-full flex flex-col gap-4 px-8 py-4 mx-auto'>
			{projectData[0].mainimage ? (
				<Banner
					src={projectData[0].mainimage}
					alt='Main image'
				/>
			) : null}
			<h1 className='w-full text-center'>
				{projectData[0].title ? (projectData[0].title as string) : 'No title'}
			</h1>
			{projectData[0].url || projectData[0].githuburl ? (
				<div className='flex flex-row justify-center items-center gap-8 w-full py-4 px-8 rounded-lg bg-foreground dark:bg-foreground-dark text-background dark:text-background-dark bg-opacity-50'>
					{projectData[0].url ? (
						<span>
							<Link
								href={projectData[0].url}
								target='_blank'
								className='underline'
							>
								Demo
							</Link>
						</span>
					) : null}
					{projectData[0].githuburl ? (
						<span>
							<Link
								href={projectData[0].githuburl}
								target='_blank'
								className='underline'
							>
								Github
							</Link>
						</span>
					) : null}
				</div>
			) : null}
			<div className='markdown-section'>
				<Markdown>
					{projectData[0].description
						? (projectData[0].description as string)
						: 'No description'}
				</Markdown>
			</div>
			{projectData[0].galleryimages ? (
				<section className='grid grid-cols-6 gap-2 md:gap-4 w-full'>
					{projectData[0].galleryimages.map((image: string, index: number) => {
						return (
							<Image
								key={index}
								alt='Gallery Image'
								src={image}
								width={400}
								height={400}
								className='col-span-6 md:col-span-3 w-full aspect-square object-contain object-center'
							/>
						);
					})}
				</section>
			) : null}
		</section>
	);
}
