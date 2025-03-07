'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { BabyBear, AdultBear } from '@/app/(components)/ui/SVGs/icons';
const ThemeSwitcher = () => {
	const [mount, setMount] = useState(false);
	const { systemTheme, theme, setTheme } = useTheme();
	const currentTheme = theme === 'system' ? systemTheme : theme;
	useEffect(() => {
		setMount(true);
	}, []);
	console.log('Current set theme ', currentTheme);
	return mount ? (
		<button
			onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
			type='button'
			className='[&>div>h5]:hover:-rotate-6 [&>div>svg]:hover:rotate-6 col-span-1 flex flex-col gap-4 h-fit col-start-4'
		>
			<div className='dark:hidden flex flex-col justify-between h-[90%]'>
				<h5 className='navText transform -rotate-[25deg]  ease-in-out duration-300'>
					switch
				</h5>
				<AdultBear />
			</div>
			<div className='hidden dark:flex flex-col justify-between h-[90%]'>
				<h5 className='navText transform -rotate-[25deg]  ease-in-out duration-300'>
					Switch
				</h5>
				<BabyBear />
			</div>
		</button>
	) : null;
};
export default ThemeSwitcher;
