'use client';
import { getProject } from '@/app/api/(neon)/actions/actions';
import Markdown from 'marked-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Banner from './banner';
import ProjectItemSkeleton from './project-skeleton';

interface Project {
	title: string;
	description: string;
	mainimage: string;
	url?: string;
	githuburl?: string;
	galleryimages?: string[];
}
export default function ProjectItem({ slug }: { slug: string }) {
	const [projectData, setProjectData] = useState({
		loaded: false,
		title: '',
		description: '',
		mainimage: '',
		url: '',
		githuburl: '',
		galleryimages: [] as string[],
	});
	console.log('Current state', projectData);
	useEffect(() => {
		const getProjectData = async (slug: string) => {
			const response = await getProject(slug);
			return new Promise((resolve) => {
				resolve(response);
			});
		};
		getProjectData(slug).then((data) => {
			const project = data as unknown as Array<Project>;
			console.log('Resolved data: ', project);
			if (project.length === 0) {
				return;
			}
			setProjectData({
				loaded: true,
				title: project[0].title,
				description: project[0].description,
				mainimage: project[0].mainimage,
				url: project[0].url as string,
				githuburl: project[0].githuburl as string,
				galleryimages: project[0].galleryimages as Array<string>,
			});
		});
	}, [slug]);
	if (!projectData.loaded) {
		return <ProjectItemSkeleton />;
	} else {
		return (
			<section className='max-w-5xl w-full flex flex-col gap-4 px-8 py-4 mx-auto'>
				{projectData.mainimage ? (
					<Banner
						src={projectData.mainimage}
						alt='Main image'
					/>
				) : null}
				<h1 className='w-full text-center'>
					{projectData.title ? (projectData.title as string) : 'No title'}
				</h1>
				{projectData.url || projectData.githuburl ? (
					<div className='flex flex-row justify-center items-center gap-8 w-full py-4 px-8 rounded-lg bg-foreground dark:bg-foreground-dark text-background dark:text-background-dark bg-opacity-50'>
						{projectData.url ? (
							<span>
								<Link
									href={projectData.url}
									target='_blank'
									className='underline'
								>
									Demo
								</Link>
							</span>
						) : null}
						{projectData.githuburl ? (
							<span>
								<Link
									href={projectData.githuburl}
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
						{projectData.description
							? (projectData.description as string)
							: 'No description'}
					</Markdown>
				</div>
				{projectData.galleryimages ? (
					<section className='grid grid-cols-6 gap-2 md:gap-4 w-full'>
						{projectData.galleryimages.map((image: string, index: number) => {
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
}
