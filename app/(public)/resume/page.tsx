import HistoryItem from '@/app/(components)/historyItem';
import { getResumeItems } from '@/app/api/(neon)/actions/actions';

export default async function Resume() {
	const resumeItems = await getResumeItems();
	console.log(resumeItems);
	const defaultDate: Date = new Date();
	return (
		<div className='grid grid-cols-2 gap-4 max-w-4xl mx-auto'>
			<div className='col-span-2'>
				<h1 className='mx-auto w-fit'>Resume</h1>
			</div>
			<div className='col-span-2 md:col-span-1'></div>
			<div className='col-span-2 md:col-span-1'>
				{resumeItems.map((item) => (
					<HistoryItem
						title={''}
						description={''}
						category={''}
						location={''}
						startDate={defaultDate}
						endDate={defaultDate}
						key={item.id}
						id={item.id}
						{...item}
					/>
				))}
			</div>
		</div>
	);
}
