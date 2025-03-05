'use client';
import { createCourseItem } from '@/app/api/(neon)/actions/actions';
import Markdown from 'marked-react';
import React, { useState } from 'react';
interface FormList {
	id: number;
	title: string;
	company: string;
	instructor: string;
	url: string;
	description: string;
}

export default function UpdateCourseForm(props: { formList: Array<FormList> }) {
	// console.log(props.formList);
	const [inputField, setInputField] = useState(props.formList[0].description);
	const [courseData, setCourseData] = useState({
		title: props.formList[0].title,
		company: props.formList[0].company,
		instructor: props.formList[0].instructor,
		url: props.formList[0].url,
	});
	const [courseId, setCourseId] = useState({
		id: props.formList[0].id,
		selected: 0,
	});

	const onSelectChange = (key: number) => {
		// console.log(key);
		setCourseId({
			id: props.formList[key].id,
			selected: key,
		});
		setCourseData({
			title: props.formList[key].title,
			company: props.formList[key].company,
			instructor: props.formList[key].instructor,
			url: props.formList[key].url,
		});
		setInputField(props.formList[key].description);
	};
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
			id: courseId.id,
		};
		const response = await createCourseItem(registerData);
		console.log('Response from update: ', response);
		// const response = await createCourseItem(registerData);
		// console.log(response);
		setCourseData({
			title: '' as string,
			company: '' as string,
			instructor: '' as string,
			url: '' as string,
		});
		setInputField('Type here...');
	};
	// console.log(inputField);
	// console.log(courseData);
	return (
		<div className='flex flex-col gap-4 py-4 items-center'>
			<select
				onChange={(e) => onSelectChange(parseInt(e.target.value))}
				value={courseId.selected}
			>
				{props.formList.map((item, key) => (
					<option
						key={key}
						value={key}
					>
						{item.title}
					</option>
				))}
			</select>
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
							value={courseData.title}
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
							value={courseData.company}
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
							value={courseData.instructor}
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
							value={courseData.url}
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
							value={inputField}
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
