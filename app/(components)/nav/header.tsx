import Link from 'next/link';
import LogoSvg, { LogoSubtitleSvg } from '@/app/UI/SVGs/logo';
export default function Header() {
	return (
		<header className='ml-auto mr-auto p-5 flex flex-col items-center justify-center w-full max-w-lg gap-4'>
			<Link
				href='/'
				className='w-full'
			>
				<LogoSvg />
			</Link>
			<Link
				href='/'
				className='w-full'
			>
				<LogoSubtitleSvg />
			</Link>
		</header>
	);
}
