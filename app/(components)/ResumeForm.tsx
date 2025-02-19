'use client';
import useTagInput from '@/app/hooks/useTag';
import { TagField } from '@/app/(components)/TagField';
import { useState } from 'react';
import React from 'react';
import { createResumeItem } from '@/app/api/(neon)/actions/actions';

const ResumeFormPage = () => {
	//define the MaxTags

	const MAX_TAGS = 10;

	//Retrieve all the returned items from the hook
	const [formData, setFormData] = useState({
		title: '' as string,
		description: '' as string,
		category: '' as string,
		company: '' as string,
		institution: '' as string,
		issuer: '' as string,
		certificateUrl: '' as string,
		location: '' as string,
		startDate: new Date() as Date,
		endDate: new Date() as Date,
		tags: [] as string[],
	});
	const { tags, handleAddTag, handleRemoveTag } = useTagInput(MAX_TAGS); // pass the maximum tags

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};
	const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};
	const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		// Send tags to the backend
		e.preventDefault();
		console.log('Tags: ', tags);
		const data = { ...formData, tags: tags };
		setFormData({
			...formData,
			tags: tags,
		});
		console.log('Data: ', data);
		const response = await createResumeItem(data);
		console.log(response);
	};

	return (
		<section>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-4 py-4 text-slate-900'
			>
				<input
					type='text'
					onChange={handleChange}
					name='title'
					id='title'
					placeholder='Title'
					className='border border-gray-300 rounded-md px-4 py-2'
				/>
				<textarea
					onChange={handleChangeTextArea}
					name='description'
					id='description'
					placeholder='description'
					className='border border-gray-300 rounded-md px-4 py-2'
					value={formData.description}
				/>
				<select
					onChange={handleChangeSelect}
					name='category'
					id='category'
					className='border border-gray-300 rounded-md px-4 py-2 text-slate-900'
					defaultValue='select'
				>
					<option
						value='select'
						disabled
					>
						Please select
					</option>
					<option value='Utdanning'>Utdanning</option>
					<option value='Jobb'>Jobb</option>
					<option value='Certifisering'>Sertifisering</option>
				</select>
				<input
					type='text'
					onChange={handleChange}
					name='company'
					id='company'
					placeholder='company'
					className='border border-gray-300 rounded-md px-4 py-2 text-slate-900'
				/>
				<input
					type='text'
					onChange={handleChange}
					name='insitution'
					id='insitution'
					placeholder='insitution'
					className='border border-gray-300 rounded-md px-4 py-2 text-slate-900'
				/>
				<input
					type='text'
					onChange={handleChange}
					name='issuer'
					id='issuer'
					placeholder='issuer'
					className='border border-gray-300 rounded-md px-4 py-2 text-slate-900'
				/>
				<input
					type='text'
					onChange={handleChange}
					name='certificateUrl'
					id='certificateUrl'
					placeholder='certificateUrl'
					className='border border-gray-300 rounded-md px-4 py-2 text-slate-900'
				/>
				<input
					type='text'
					onChange={handleChange}
					name='location'
					id='location'
					placeholder='location'
					className='border border-gray-300 rounded-md px-4 py-2 text-slate-900'
				/>
				<input
					type='date'
					onChange={handleChange}
					name='startDate'
					id='startDate'
					className='border border-gray-300 rounded-md px-4 py-2 text-slate-900'
				/>
				<input
					type='date'
					onChange={handleChange}
					name='endDate'
					id='endDate'
					className='border border-gray-300 rounded-md px-4 py-2 text-slate-900'
				/>
				<TagField
					tags={tags}
					addTag={handleAddTag}
					removeTag={handleRemoveTag}
					maxTags={MAX_TAGS}
				/>

				<button
					type='submit'
					className='rounded-md px-4 py-2 bg-slate-900 dark:bg-slate-50 text-slate-50 dark:text-slate-900'
				>
					Submit
				</button>
			</form>
		</section>
	);
};

export default ResumeFormPage;
