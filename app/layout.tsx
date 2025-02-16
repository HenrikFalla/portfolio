import type { Metadata } from 'next';
import { Bungee_Shade, Noto_Serif } from 'next/font/google';
import './globals.css';

const bungeeShade = Bungee_Shade({
	variable: '--font-bungee-shade',
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
				className={`${bungeeShade.variable} ${notoSerif.variable} antialiased min-h-[100vh] flex flex-col items-center justify-center`}
			>
				{children}
			</body>
		</html>
	);
}
