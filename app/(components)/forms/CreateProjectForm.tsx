'use client';
import { ChangeEvent, useCallback, useState } from 'react';
import Input from './fields/Input';
import TextAreaInput from './fields/TextAreaInput';
import FileInput from './fields/FileInput';
import Image from 'next/image';
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
	const [mainImagePreview, setMainImagePreview] = useState('');
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
			}
		}
	}, []);

	return (
		<form className='grid grid-cols-3 gap-4'>
			<section className='col-span-2 flex flex-col gap-2'>
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
			<section className='col-span-1 flex flex-col gap-2'>
				{formData.mainImage ? (
					<Image
						alt='Main Image'
						width={500}
						height={500}
						src={mainImagePreview}
					/>
				) : null}
				<FileInput
					onChange={handleChangeFileInputField}
					multiple={false}
					name='mainImage'
					label='Main Image'
					accept='image/*'
				/>

				<FileInput
					onChange={handleChangeFileInputField}
					name='galleryImages'
					label='Gallery Images'
					multiple={true}
					accept='image/*'
				/>
			</section>
		</form>
	);
}
