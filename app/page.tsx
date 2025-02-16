import LogoSvg, { LogoSubtitleSvg } from './UI/SVGs/logo';

export default function Home() {
	return (
		<main className='m-auto p-5 flex flex-col items-center justify-center w-full max-w-6xl gap-4'>
			<LogoSvg />
			<LogoSubtitleSvg />
		</main>
	);
}

