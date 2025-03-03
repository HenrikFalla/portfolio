'use client';
import useTagInput from '@/app/hooks/useTag';
import { TagField } from '@/app/(components)/TagField';
import { useState, useReducer } from 'react';
import React from 'react';
import {
	createResumeCourse,
	createResumeItem,
} from '@/app/api/(neon)/actions/actions';
type CourseItems = [
	{
		id: number;
		title: string;
		slug: string;
	},
];
type ResumeId = [
	{
		category?: string;
		certificateurl?: string;
		company?: string;
		description?: string;
		endDate?: Date;
		id: number;
		institution?: string;
		issuer?: string;
		location?: string;
		startDate?: Date;
		tags?: string[];
		title?: string;
	},
];
interface iState {
	id: number[];
}
interface iAction {
	id: number;
}
const reducer = (state: iState, action: iAction) => {
	if (state.id.includes(action.id)) {
		return {
			...state,
			id: state.id.filter((id: number) => id !== action.id),
		};
	}

	return {
		...state,
		id: [...state.id, action.id],
	};
};
export default function ResumeFormPage(props: { props: CourseItems }) {
	// console.log('Props', courses);
	//define the MaxTags
	console.log('Props', props);
	const courseItems = props.props;
	console.log('CourseItems', courseItems);
	// const initialCourseItemsState = (courseItems: CourseItems) => {
	// 	const stateToReturn = [] as unknown as CourseItemState;
	// 	courseItems.map((item) => {
	// 		stateToReturn.push({
	// 			id: item.id,
	// 			title: item.title,
	// 			slug: item.slug,
	// 			checked: false,
	// 		});
	// 	});
	// 	return stateToReturn;
	// };

	// https://stackoverflow.com/questions/63020545/limit-number-of-checkboxes-selected-and-save-value/63021381#63021381
	// check this site for new solution!!!
	// const [checks, setChecks] = useState(initialCourseItemsState(courseItems));
	// const [checkBoxes, setCheckBoxes] = useState(
	// 	initialCourseItemsState(courseItems),
	// );
	// console.log('Checks state', checks);
	// const checkboxes = initialCourseItemsState(courseItems) as CourseItemState;

	// const handleCheckboxChange = (id: number) => {
	// 	setChecks((prevState) => {
	// 		checks.map((item) => {
	// 			if (item.id === id) {
	// 				item = { ...item, checked: !item.checked };
	// 			}
	// 			return item;
	// 		});
	// 		prevState = [...checks];
	// 		return prevState;
	// 	});
	// 	checkboxes.map((item) => {
	// 		if (item.id === id) {
	// 			item.checked = !item.checked;
	// 		}
	// 		console.log('New State', item.checked);
	// 		return item;
	// 	});
	// 	console.log('Checkboxes', checkboxes);
	// };
	// console.log('CheckBoxes', checkboxes);

	const initialState = { id: [] };
	const [state, dispatch] = useReducer(reducer, initialState);
	console.log('State: ', state);
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
		e.preventDefault();
		console.log('Tags: ', tags);
		console.log('Submitting resume item');
		const data = { ...formData, tags: tags };
		setFormData({
			...formData,
			tags: tags,
		});
		console.log('Data: ', data);
		console.log('Creating resume item');
		const response = await createResumeItem(data);
		const res = response as unknown as ResumeId;
		console.log('Response from create resume item: ', res);
		console.log('Checking if res is truthy');
		if (res && state.id.length >= 1) {
			console.log('res checks as truthy');
			state.id.map(async (id: number) => {
				const response = await createResumeCourse(res[0].id, id);
				return response;
			});
		}
		setFormData((prevState) => ({
			...prevState,
			title: '',
			description: '',
			category: '',
			company: '',
			institution: '',
			issuer: '',
			certificateUrl: '',
			location: '',
			startDate: new Date(),
			endDate: new Date(),
			tags: [],
		}));
	};

	return (
		<section>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-4 py-4 text-slate-900 [&>*]:bg-slate-50'
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
					<option value='Sertifisering'>Sertifisering</option>
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
				{courseItems.map((item) => {
					return (
						<div key={item.title + '-container'}>
							<input
								key={item.id.toString() + '-checkbox'}
								type='checkbox'
								name={item.title}
								id={item.id.toString()}
								onClick={() => dispatch({ id: item.id })}
								// defaultChecked={state.checkedIds.includes(item.id)}
							/>
							<label
								key={item.title + '-label'}
								htmlFor={item.id.toString()}
							>
								{item.title}
							</label>
						</div>
					);
				})}
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
}
