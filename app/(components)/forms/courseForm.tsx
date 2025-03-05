'use client';
import { createCourseItem } from '@/app/api/(neon)/actions/actions';
import Markdown from 'marked-react';
import { useState } from 'react';

export default function CourseForm() {
	const [inputField, setInputField] = useState('Type here...');
	const [courseData, setCourseData] = useState({
		title: '',
		company: '',
		instructor: '',
		url: '',
	});
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCourseData({
			...courseData,
			[name]: value,
		});
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(courseData);
		const slug = courseData.title
			.toLowerCase()
			.replace(/ /g, '-')
			.replace(/[^\w-]+/g, '');
		const registerData = {
			...courseData,
			description: inputField,
			slug: slug,
		};
		const response = await createCourseItem(registerData);
		console.log(response);
		setCourseData({
			title: '',
			company: '',
			instructor: '',
			url: '',
		});
		setInputField('Type here...');
	};
	console.log(inputField);
	console.log(courseData);
	return (
		<div className='flex flex-col gap-4 py-4 items-center'>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-4 py-4 max-w-lg'
			>
				<section className='flex flex-row gap-2 flex-wrap'>
					<div className='flex flex-col gap-2'>
						<label htmlFor='title'>Title</label>
						<input
							onChange={onChange}
							type='text'
							name='title'
							id='title'
							placeholder='Title'
							className='rounded-md p-2'
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='company'>Company</label>
						<input
							onChange={onChange}
							type='text'
							name='company'
							id='company'
							placeholder='Company'
							className='rounded-md p-2'
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='instructor'>Instructor</label>
						<input
							onChange={onChange}
							type='text'
							name='instructor'
							id='instructor'
							placeholder='Instructor'
							className='rounded-md p-2'
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='url'>Url</label>
						<input
							onChange={onChange}
							type='text'
							name='url'
							id='url'
							placeholder='Url'
							className='rounded-md p-2'
						/>
					</div>
				</section>
				<section>
					<div className='flex flex-col gap-2'>
						<label htmlFor='description'>Description</label>
						<textarea
							name='description'
							id='description'
							defaultValue={inputField}
							onChange={(e) => setInputField(e.target.value)}
							className='min-h-28 rounded-md p-2'
						/>
					</div>
				</section>
				<section className='flex justify-center items-center'>
					<button
						type='submit'
						className='py-2 px-4 rounded-md border-2 border-foreground dark:border-foreground-dark'
					>
						Submit form
					</button>
				</section>
			</form>
			<section className='markdown-section'>
				<h1>{courseData.title}</h1>
				<p>{courseData.company}</p>
				<p>{courseData.instructor}</p>
				<Markdown>{inputField}</Markdown>
			</section>
		</div>
	);
}
