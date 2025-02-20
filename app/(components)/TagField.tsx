import { useState, ChangeEvent } from 'react';

interface iTag {
	tags: string[];
	addTag: (tag: string) => void;
	removeTag: (tag: string) => void;
	maxTags: number;
}

export const TagField = ({ tags, addTag, removeTag, maxTags }: iTag) => {
	const [userInput, setUserInput] = useState<string>('');

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setUserInput(event.target.value);
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (
				// userInput.trim() !== '' &&
				userInput.length <= 20 &&
				tags.length < maxTags
			) {
				addTag(userInput);
				setUserInput('');
			}
		}
	};

	return (
		<div className='flex flex-col'>
			<input
				name='keyword_tags'
				type='text'
				placeholder={
					tags.length < maxTags
						? 'Add a tag'
						: `You can only enter max. of ${maxTags} tags`
				}
				className='w-full border border-gray-300 rounded-md px-4 py-2'
				onKeyDown={handleKeyPress}
				onChange={handleInputChange}
				value={userInput}
				disabled={tags.length === maxTags}
			/>

			{/* ===== Render the tags here ===== */}

			<div className='flex flex-row flex-wrap gap-3 mt-4'>
				{tags.map((tag: string, index: number) => (
					<span
						key={`${index}-${tag}`}
						className='inline-flex items-start justify-start px-3 py-2 rounded-[32px] text-sm shadow-xs font-medium bg-blue-100 text-blue-800 mr-2'
					>
						{tag}
						<button
							className='ml-2 hover:text-blue-500'
							onClick={() => removeTag(tag)}
							title={`Remove ${tag}`}
						>
							&times;
						</button>
					</span>
				))}
			</div>
		</div>
	);
};
