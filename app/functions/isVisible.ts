import { useEffect, useState } from 'react';

interface iLinks {
	url: string;
	title: string;
}
export function IsVisibleSection(links: Array<iLinks>) {
	const [visibleId, setVisibleId] = useState<string | undefined>();
	// let inThrottle: boolean | undefined;
	const isSectionVisible = (elementId: string) => {
		const section = document.getElementById(elementId);

		if (section) {
			const sectionPosition = section.getBoundingClientRect();
			const viewport = {
				height: window.innerHeight,
				width: window.innerWidth,
			};
			// console.log('Section info: ', sectionPosition, elementId);
			return (
				sectionPosition.top <= viewport.height / 4 &&
				sectionPosition.top >= 0 - viewport.height / 2
				// sectionPosition.left >= 0 &&
				// sectionPosition.bottom <= viewport.height &&
				// sectionPosition.right <= viewport.width
			);
		}
		return false;
	};
	const checkVisible = () => {
		// if (!inThrottle) {
		links.map((link) => {
			if (isSectionVisible(link.url)) {
				console.log(link.url);
				setVisibleId(link.url);
			}
		});
		// 	inThrottle = true;
		// 	setTimeout(() => (inThrottle = false), 300);
		// }
	};

	useEffect(() => {
		if (links) {
			window.addEventListener('scroll', checkVisible);
		}

		checkVisible();

		return () => {
			window.removeEventListener('scroll', checkVisible);
		};
	});
	return visibleId;
}
