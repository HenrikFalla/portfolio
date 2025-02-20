import type { Metadata } from 'next';
import '@/app/globals.css';
import LogoSvg, { LogoSubtitleSvg } from '@/app/UI/SVGs/logo';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Henrik Falla',
	description: 'Front-End Engineer',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`antialiased h-auto md:min-h-[100vh] flex flex-col items-center justify-center`}
			>
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
				{children}
			</body>
		</html>
	);
}
