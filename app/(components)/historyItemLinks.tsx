'use client';

import { IsVisibleSection } from '../functions/isVisible';

// import { useState } from 'react';

interface iLinks {
	url: string;
	title: string;
}
export default function HistoryItemLinks(props: { links: iLinks[] }) {
	// console.log('DisplayLinks: ', displayLinks);
	const visibleLink = IsVisibleSection(props.links);
	return (
		<div className='flex flex-col gap-8  sticky top-[40vh] left-0 h-fit'>
			<h3>Nav</h3>
			<div className='link-menu flex flex-col gap-2 sticky'>
				{props.links.map((item) => {
					return (
						<div key={item.url + '-container'}>
							<a
								key={item.url + '-link'}
								href={'#' + item.url}
								className='display-link'
								data-active={visibleLink === item.url}
							>
								{item.title}
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
}
