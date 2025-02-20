import type { Metadata } from 'next';
import './globals.css';
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
				{children}
			</body>
		</html>
	);
}
