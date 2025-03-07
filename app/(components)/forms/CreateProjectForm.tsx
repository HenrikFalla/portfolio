'use client';

import React, { ChangeEvent, useCallback, useState } from 'react';
import FileInput from './fields/FileInput';
import Image from 'next/image';
import Input from './fields/Input';
import TextAreaInput from './fields/TextAreaInput';

interface HTMLInputEvent extends ChangeEvent<HTMLInputElement> {
	target: HTMLInputElement & EventTarget;
}
export default function CreateProjectForm() {
	const [mainImage, setMainImage] = useState<File | null>();
	const [galleryImages, setGalleryImages] = useState<File[] | null>();
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		slug: '',
		url: '',
		mainImage: '/placeholder.svg',
		galleryImages: [] as string[],
	});
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
	function handleMainImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files) {
			setMainImage(e.target.files[0]);
			setMainImagePreview(URL.createObjectURL(e.target.files[0]));
		}
	}
	function handleGalleryImageChange(e: HTMLInputEvent) {
		if (e.target.files) {
			console.log(e.target.files);
			setGalleryImages(Array.from(e.target.files));
			setGalleryImagesPreview(
				Array.from(e.target.files).map((file) => URL.createObjectURL(file)),
			);
		}
	}
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const uploadedMedia = [];
		if (mainImage) {
			try {
				const mainImageFormData = new FormData();
				mainImageFormData.append('file', mainImage as Blob);
				const mainImageResponse = await fetch('/api/portfolio/images', {
					method: 'POST',
					body: mainImageFormData,
				});
				if (!mainImageResponse.ok) {
					throw new Error('Failed to upload main image');
				}
				const mainImageData = await mainImageResponse.json();
				console.log(mainImageData);
				uploadedMedia.push({
					src: mainImageData.url,
					alt: 'Featured image',
					type: 'image',
				});
				console.log(uploadedMedia);
			} catch (e) {
				console.log(e);
			}
		}
		if (galleryImages) {
			try {
				for (const file of galleryImages as File[]) {
					const galleryImageFormData = new FormData();
					galleryImageFormData.append('file', file);
					const galleryImagesResponse = await fetch('/api/portfolio/images', {
						method: 'POST',
						body: galleryImageFormData,
					});
					if (!galleryImagesResponse.ok) {
						throw new Error('Failed to upload gallery images');
					}
					const galleryImagesData = await galleryImagesResponse.json();
					console.log(galleryImagesData);
					uploadedMedia.push({
						src: galleryImagesData.url,
						alt: 'Gallery image',
						type: 'image',
					});
					console.log(uploadedMedia);
				}
			} catch (e) {
				console.log(e);
			}
		}
		const uploadForm = { ...formData };
		if (uploadedMedia.length > 0) {
			uploadedMedia.map((file) => {
				if (file.alt === 'Featured image') {
					uploadForm.mainImage = file.src;
				} else {
					uploadForm.galleryImages.push(file.src);
				}
			});
		}
		console.log(uploadForm);
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
					onChange={handleMainImageChange}
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
					onChange={handleGalleryImageChange}
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
