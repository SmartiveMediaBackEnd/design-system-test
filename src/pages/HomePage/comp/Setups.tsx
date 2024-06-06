import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Button, SetupCard, TabX } from 'src/app/components/optimized';
import { StoreLaunchStep, storeLaunchSteps } from './HomeConstants';
interface SetupsProps {
	startTour: () => void;
	handleSetup: () => void;
}
// Setups Parent Component
export default function Setups({ startTour, handleSetup }: SetupsProps) {
	const { t } = useTranslation();
	const [currentTab, setCurrentTab] = useState(0);
	const [_, setFinish] = useState(false);

	const handleTabClick = (index: number) => {
		setCurrentTab(index);
	};

	const handleNext = () => {
		if (currentTab < tabs.length - 1) {
			setCurrentTab(currentTab + 1);
		}
	};

	const handlePrev = () => {
		if (currentTab > 0) {
			setCurrentTab(currentTab - 1);
		}
	};

	const handleFinish = (value: boolean) => {
		setFinish(value);
	};
	const tabs = [
		{
			title: t('Basic setup'),
			content: <SetupCardsWrapper items={storeLaunchSteps.basicSetup} />,
		},
		{
			title: t('Services setup'),
			content: <SetupCardsWrapper items={storeLaunchSteps.servicesSetup} />,
		},
	];
	return (
		<section className='grid gap-3'>
			<SetupsHeader startTour={startTour} />
			<TabX
				tabs={tabs}
				currentTab={currentTab}
				handleNext={handleNext}
				handlePrev={handlePrev}
				handleFinish={handleFinish}
				handleTabClick={handleTabClick}
			/>
		</section>
	);
}

// Header Component
interface SetupsHeaderProps {
	startTour: () => void;
}
function SetupsHeader({ startTour }: SetupsHeaderProps) {
	const { t } = useTranslation();
	return (
		<h2 className='title mb-1'>
			{t('Get ready for your first sale')}
			<p className='text-subtitle paragraph sm:flex sm:flex-row flex-col'>
				{t('There are only 2 main steps to launch your store')},&nbsp;
				<Button onClick={startTour} variant='link' text={t('Follow our tips')} />
				&nbsp;
				{t('to get started')}
			</p>
		</h2>
	);
}

// Wrapper Component
interface SetupCardsWrapperProps {
	items: StoreLaunchStep[];
}
function SetupCardsWrapper({ items }: SetupCardsWrapperProps) {
	return (
		<div className='flex-col-top-section-pages lg:flex-row'>
			{items.map((item, index) => (
				<SetupCard key={index} Icon={item.icon} {...item} />
			))}
		</div>
	);
}
