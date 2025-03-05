'use client';
import React, { ChangeEvent, useCallback, useState } from 'react';
import Input from './fields/Input';
import TextAreaInput from './fields/TextAreaInput';
import FileInput from './fields/FileInput';
import Image from 'next/image';
import { put } from '@vercel/blob';
interface Project {
	title: string;
	description: string;
	slug: string;
	url: string;
	mainImage: File | undefined;
	galleryImages: File[];
}
interface HTMLInputEvent extends ChangeEvent<HTMLInputElement> {
	target: HTMLInputElement & EventTarget;
}
export default function CreateProjectForm() {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		slug: '',
		url: '',
		mainImage: undefined,
		galleryImages: [],
	} as Project);
	console.log(formData);
	const [mainImagePreview, setMainImagePreview] = useState('/placeholder.svg');
	const [galleryImagesPreview, setGalleryImagesPreview] = useState([
		'/placeholder.svg',
	]);
	const handleChangeInputField = useCallback(
		(
			e:
				| React.ChangeEvent<HTMLInputElement>
				| React.ChangeEvent<HTMLTextAreaElement>,
		) => {
			const { name, value } = e.target;
			console.log('Name: ', name, ' Value: ', value);
			setFormData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		},
		[],
	);
	const handleChangeFileInputField = useCallback((e: HTMLInputEvent) => {
		if (e.target.files) {
			setFormData((prevState) => ({
				...prevState,
				[e.target.name]: e.target.files,
			}));
			if (e.target.name === 'mainImage' && e.target.files) {
				setMainImagePreview(URL.createObjectURL(e.target.files[0]));
			} else {
				const urls: string[] = [];
				for (let i = 0; i < e.target.files.length; i++) {
					urls.push(URL.createObjectURL(e.target.files[i]));
				}
				setGalleryImagesPreview(urls);
			}
		}
	}, []);
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (formData.mainImage) {
			const response = await put(
				'portfolio/images/' + formData.mainImage.name,
				formData.mainImage,
				{
					access: 'public',
				},
			);
			console.log(response);
		}
	}

	return (
		<form
			className='grid grid-cols-3 gap-4 max-w-2xl p-8'
			onSubmit={handleSubmit}
		>
			<section className='col-span-3 md:col-span-2 flex flex-col gap-2 h-max'>
				<Input
					onChange={handleChangeInputField}
					placeholder='Title'
					value={formData.title}
					name='title'
					label='Title'
				/>
				<Input
					onChange={handleChangeInputField}
					placeholder='url'
					value={formData.url}
					name='url'
					label='Url'
					type='url'
				/>
				<TextAreaInput
					onChange={handleChangeInputField}
					placeholder='Description'
					value={formData.description}
					name='description'
					label='Description'
					type='text'
				/>
			</section>
			<section className='col-span-3 md:col-span-1 flex flex-col gap-2'>
				<Image
					alt='Main Image'
					width={500}
					height={300}
					src={mainImagePreview}
					className='max-h-80 w-auto rounded-xl object-cover'
				/>
				<FileInput
					onChange={handleChangeFileInputField}
					multiple={false}
					name='mainImage'
					label='Main Image'
					accept='image/*'
				/>
				<div className='flex flex-row flex-wrap gap-2'>
					{galleryImagesPreview.map((image, index) => {
						return (
							<Image
								key={index}
								alt='Gallery Image'
								width={100}
								height={100}
								src={image}
								className='max-h-20 max-w-20 rounded-xl object-cover'
							/>
						);
					})}
				</div>
				<FileInput
					onChange={handleChangeFileInputField}
					name='galleryImages'
					label='Gallery Images'
					multiple={true}
					accept='image/*'
				/>
			</section>
			<section className='col-span-3 flex flex-row items-center justify-center'>
				<button
					type='submit'
					className='py-2 px-4 rounded-md bg-foreground dark:bg-foreground-dark text-background dark:text-background-dark'
				>
					Submit
				</button>
			</section>
		</form>
	);
}
