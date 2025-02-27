import type { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';
import { ThemeProvider } from 'next-themes';
import { Bungee_Shade, Bungee_Inline, Noto_Serif } from 'next/font/google';
import '../globals.css';
import Header from '../(components)/nav/header';

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
		<html
			lang='en'
			suppressHydrationWarning
		>
			<GoogleTagManager gtmId='GTM-5VN6WCTN' />
			<body
				className={`${bungeeShade.variable} ${bungeeInline.variable} ${notoSerif.variable} antialiased h-auto md:min-h-[100vh] flex flex-col items-center justify-center`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
