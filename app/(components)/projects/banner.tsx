'use client';
import { Skeleton } from '@heroui/skeleton';
import Image from 'next/image';
import { useState } from 'react';

export default function Banner(props: { src: string; alt: string }) {
	const { src, alt } = props;
	const [loaded, setLoded] = useState(false);
	return (
		<>
			<Skeleton
				className='rounded-lg min-h-[320px]'
				is-loaded={loaded.toString()}
			>
				<Image
					alt={alt}
					src={src}
					width={900}
					height={300}
					className='w-full h-auto max-h-80 object-contain object-center'
					onLoad={() => {
						setLoded(true);
					}}
				/>
			</Skeleton>
		</>
	);
}
