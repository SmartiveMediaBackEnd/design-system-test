import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DownIcon } from 'src/app/utils/icons';
import { OrderStatus } from '../..';
import { UseLanguage } from 'src/app/components/CustomHook/LanguageHook';

export default function OrderNo() {
	const [showOrderStatus, setShowOrderStatus] = useState(false);
	const { t } = useTranslation();
	const language = UseLanguage();
	const flexClass = 'flex gap-1.5 items-center ';
	return (
		<div className='capitalize global-cards grid lg:grid-cols-6'>
			<div
				className={`col-span-1 flex-col-top-section-pages gap-2 relative after:lg:absolute after:lg:h-[100%] after:lg:w-[1px] after:bg-constrained ${
					language === 'ar' ? 'after:left-0' : 'after:right-[-5%]'
				} after:top-0`}
			>
				<p className='subtitle'>{t('order No')}.</p>
				<p className='title  '>#8965742</p>
			</div>

			<div className='col-span-3 flex-col-top-section-pages gap-2 subtitle '>
				<div className={flexClass}>
					<p>{t('payment status')}:</p>
					<button onClick={() => setShowOrderStatus(true)} className='flex text-warning capitalize'>
						{t('awaiting payment')} <DownIcon className='fill-warning' />
					</button>
				</div>

				<div className={flexClass}>
					<p>{t('order status')}:</p>
					<button onClick={() => setShowOrderStatus(true)} className='flex capitalize text-title'>
						{t('processing')} <DownIcon className='fill-hint' />
					</button>
				</div>
			</div>
			<div className='col-span-2 flex-col-top-section-pages lg:items-end justify-between gap-2'>
				<h2 className='title  '>SAR 1000.00</h2>
				<p className='subtitle'>
					<span>15/10/2020</span> {t('at')} <span>12:05</span> AM
				</p>
			</div>

			{showOrderStatus && (
				<OrderStatus showOrderStatus={showOrderStatus} onClose={() => setShowOrderStatus(false)} />
			)}
		</div>
	);
}
