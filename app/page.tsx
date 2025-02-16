import LogoSvg, { LogoSubtitleSvg } from './UI/SVGs/logo';

export default function Home() {
	return (
		<div className='m-auto flex flex-col items-center justify-center w-[calc(100vw-36px)] h-[calc(100vh-36px)] rounded-2xl solid border-2 border-slate-950 dark:border-slate-50'>
			<main className='m-auto p-5 flex flex-col items-center justify-center w-full max-w-6xl gap-4'>
				<LogoSvg />
				<LogoSubtitleSvg />
			</main>
		</div>
	);
}
