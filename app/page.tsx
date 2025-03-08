import Link from 'next/link';
import {
	BabyDragonIcon,
	DragonIcon,
	KnightAdultIcon,
	KnightIcon,
	// LlamaIcon,
	// UnicornIcon,
} from './(components)/ui/SVGs/icons';
import LogoSvg, { LogoSubtitleSvg } from './(components)/ui/SVGs/logo';
import ThemeSwitcher from '@/app/(components)/ThemeSwitcher';
// import { getUsers } from './api/(neon)/actions/route';

export default function Home() {
	// const data = await getUsers();
	// console.log(data);
	// for (const u of data) {
	// 	console.log(u.email);
	// }
	return (
		<div className='flex flex-col items-center justify-center w-screen h-screen p-8'>
			<div className='w-full h-full rounded-2xl solid border-2 border-foreground dark:border-foreground-dark p-8 flex flex-col items-center justify-center'>
				{/* <style type='text/css'>header {display: none;}</style> */}
				<main className='m-auto p-0 md:p-5 flex flex-col items-center justify-center w-full max-w-6xl gap-4 relative'>
					<nav className='w-full max-w-md grid grid-cols-4 justify-end gap-4 md:gap-8 mb-2 md:mb-6 self-end justify-self-end items-end flex-row-reverse'>
						<Link
							href='/projects'
							className='[&>h5]:hover:-rotate-6 [&>svg]:hover:rotate-6 col-span-1 flex flex-col gap-0 md:gap-4 h-fit col-start-2'
						>
							<h5 className='navText transform -rotate-[25deg]  ease-in-out duration-300'>
								Prosjekt
							</h5>
							<DragonIcon />
							<BabyDragonIcon />
						</Link>
						<Link
							href='/timeline'
							className='[&>h5]:hover:-rotate-6 [&>svg]:hover:rotate-6 col-span-1 flex flex-col gap-0 md:gap-4 h-fit col-start-3'
						>
							<h5 className='navText transform -rotate-[25deg]  ease-in-out duration-300'>
								Erfaring
							</h5>
							<KnightIcon />
							<KnightAdultIcon />
						</Link>
						<ThemeSwitcher />
					</nav>

					<LogoSvg />
					<LogoSubtitleSvg />
				</main>
			</div>
		</div>
	);
}
