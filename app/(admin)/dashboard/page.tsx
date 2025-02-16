import Link from 'next/link';

export default function Dashbaord() {
	return (
		<main className='flex flex-col items-center justify-center w-full h-full p-4 max-w-2xl'>
			<h1>Dashboard</h1>
			<section className='grid grid-cols-4 gap-4 m-4 w-full'>
				<Link href='/dashboard/resume'>
					<div className='flex flex-col items-center justify-center min-h-16 w-full rounded-2xl bg-slate-200 dark:bg-slate-900'>
						<p>Resume Builder</p>
					</div>
				</Link>
				<Link href='/dashboard/resume'>
					<div className='flex flex-col items-center justify-center min-h-16 w-full rounded-2xl bg-slate-200 dark:bg-slate-900'>
						<p>Resume</p>
					</div>
				</Link>
				<Link href='/dashboard/resume'>
					<div className='flex flex-col items-center justify-center min-h-16 w-full rounded-2xl bg-slate-200 dark:bg-slate-900'>
						<p>Resume</p>
					</div>
				</Link>
				<Link href='/dashboard/resume'>
					<div className='flex flex-col items-center justify-center min-h-16 w-full rounded-2xl bg-slate-200 dark:bg-slate-900'>
						<p>Resume</p>
					</div>
				</Link>
				<Link href='/dashboard/resume'>
					<div className='flex flex-col items-center justify-center min-h-16 w-full rounded-2xl bg-slate-200 dark:bg-slate-900'>
						<p>Resume</p>
					</div>
				</Link>
				<Link href='/dashboard/resume'>
					<div className='flex flex-col items-center justify-center min-h-16 w-full rounded-2xl bg-slate-200 dark:bg-slate-900'>
						<p>Resume</p>
					</div>
				</Link>
				<Link href='/dashboard/resume'>
					<div className='flex flex-col items-center justify-center min-h-16 w-full rounded-2xl bg-slate-200 dark:bg-slate-900'>
						<p>Resume</p>
					</div>
				</Link>
			</section>
		</main>
	);
}
