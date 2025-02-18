import Link from 'next/link';
import { ResumeIcon } from './UI/SVGs/icons';
import LogoSvg, { LogoSubtitleSvg } from './UI/SVGs/logo';
// import { getUsers } from './api/(neon)/actions/route';

export default function Home() {
	// const data = await getUsers();
	// console.log(data);
	// for (const u of data) {
	// 	console.log(u.email);
	// }
	return (
		<div className='flex flex-col items-center justify-center w-screen h-screen p-8'>
			<div className='w-full h-full rounded-2xl solid border-2 border-slate-950 dark:border-slate-50 p-8 flex flex-col items-center justify-center'>
				<main className='m-auto p-5 flex flex-col items-center justify-center w-full max-w-6xl gap-4 relative'>
					<nav className='w-full flex justify-end'>
						<Link
							href='/resume'
							className='[&>h5]:hover:-rotate-6 [&>svg]:hover:rotate-6'
						>
							<h5 className='transform -rotate-12  ease-in-out duration-300'>
								CV
							</h5>
							<ResumeIcon />
						</Link>
					</nav>

					<LogoSvg />
					<LogoSubtitleSvg />
				</main>
			</div>
		</div>
	);
}
