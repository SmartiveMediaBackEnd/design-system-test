import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UseLanguage } from 'src/app/components/CustomHook/LanguageHook';
import { NextIcon } from 'src/app/utils/icons';
import { AppsWrapperProps } from './useAppStore';

export default function AppsWrapper({
	socialApps,
	title,
	onButtonClick,
	warningMessage,
	ChildrenComponent,
}: AppsWrapperProps) {
	const { t } = useTranslation();
	const language = UseLanguage();

	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setScreenWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const calculateItemsToRender = useCallback(() => {
		return screenWidth < 1024 ? 2 : screenWidth < 1536 ? 3 : 4;
	}, [screenWidth]);
	const itemsToRender = useMemo(calculateItemsToRender, [calculateItemsToRender]);

	const renderItems =
		socialApps.length > 0 ? (
			socialApps.slice(0, itemsToRender).map((app) => (
				<div key={app.id} className='col-span-1'>
					<ChildrenComponent {...app} />
				</div>
			))
		) : (
			<p className='text-error text-center col-span-4 font-medium text-lg'>{warningMessage}</p>
		);

	return (
		<div className='grid gap-3'>
			<div className='flex justify-between'>
				<h2 className='text-lg font-semibold text-title'>{title}</h2>
				<div className='flex items-center'>
					<button className='text-sm font-semibold text-title mx-1' onClick={onButtonClick}>
						{t('View All')}
					</button>
						<NextIcon className={`fill-pri-dark ${language === 'ar' ? "rotate-180" : ""}`} />
				</div>
			</div>
			<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
				{renderItems}
			</div>
		</div>
	);
}
