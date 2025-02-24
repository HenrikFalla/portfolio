import HistoryItem from '@/app/(components)/historyItem';
import {
	getCertificationItems,
	getResumeItems,
} from '@/app/api/(neon)/actions/actions';
import Header from '@/app/(components)/nav/header';

export default async function Resume() {
	const resumeItems = await getResumeItems();
	const certificationItems = await getCertificationItems();
	// console.log(resumeItems);
	const defaultDate: Date = new Date();
	return (
		<div className='grid grid-cols-2 gap-4 max-w-4xl mx-auto [&>header]:col-span-2'>
			<Header />
			<div className='col-span-2'>
				<h1 className='mx-auto w-fit'>Tidslinje</h1>
			</div>
			<div className='col-span-2 md:col-span-1 px-4 md:px-0'></div>
			<div className='col-span-2 md:col-span-1 px-4 md:px-0'>
				<h3
					className='pt-8'
					id='historikk'
				>
					Historikk
				</h3>
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
				<h3
					className='pt-8'
					id='sertifiseringer'
				>
					Sertifiseringer
				</h3>
				{certificationItems.map((item) => (
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
