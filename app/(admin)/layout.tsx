import type { Metadata } from 'next';
import { Bungee_Shade, Bungee_Inline, Noto_Serif } from 'next/font/google';
import '@/app/globals.css';
import LogoSvg, { LogoSubtitleSvg } from '@/app/UI/SVGs/logo';
import Link from 'next/link';

const bungeeShade = Bungee_Shade({
	variable: '--font-bungee-shade',
	subsets: ['latin'],
	weight: '400',
});
const bungeeInline = Bungee_Inline({
	variable: '--font-bungee-inline',
	subsets: ['latin'],
	weight: '400',
});

const notoSerif = Noto_Serif({
	variable: '--font-noto-serif',
	subsets: ['latin'],
});

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
				className={`${bungeeShade.variable} ${bungeeInline.variable} ${notoSerif.variable} antialiased min-h-[100vh] flex flex-col items-center justify-center`}
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
