import Link from 'next/link';
interface HistoryItem {
	id: number;
	title: string;
	description: string;
	category: string;
	company?: string;
	institution?: string;
	issuer?: string;
	certificateurl?: string;
	location: string;
	startDate: Date;
	endDate: Date;
	tags?: string[];
}
export default function HistoryItem(data: HistoryItem) {
	const startMonth = data.startDate.getMonth() + 1;
	const endMonth = data.endDate.getMonth() + 1;
	// console.log('History item: ', data);
	console.log(data);
	return (
		<div
			key={data.id}
			className='flex flex-col gap-2 my-8'
			id={data.title.trim().replace(/[\s(),.]/g, '-')}
		>
			<div>
				<h6>{data.title}</h6>
				{data.company ? <p>{data.company}</p> : null}
				{data.institution ? <p>{data.institution}</p> : null}
				{data.issuer ? <p>{data.issuer}</p> : null}
				{data.location ? <p>{data.location}</p> : null}
				<p>
					{`${data.startDate.getFullYear()}/${startMonth
						.toString()
						.padStart(2, '0')} - ${data.endDate.getFullYear()}/${endMonth
						.toString()
						.padStart(2, '0')}`}
				</p>
				{data.certificateurl ? (
					<Link
						href={data.certificateurl}
						className='underline'
					>
						Sertifisering
					</Link>
				) : null}
			</div>
			<div>
				<p className='text-justify'>{data.description}</p>{' '}
				{/* Unsure about using justify here... */}
			</div>
			<div className='inline-flex gap-4 flex-wrap'>
				{data.tags?.map((tag) => (
					<p
						key={tag + data.id}
						className='px-4 py-1.5 rounded-full bg-slate-900 text-slate-50 dark:bg-slate-500 dark:text-slate-50'
					>
						{tag}
					</p>
				))}
			</div>
		</div>
	);
}
