import { useTranslation } from 'react-i18next';
import { UseLanguage } from 'src/app/components/CustomHook/LanguageHook';
import { ClockIcon } from 'src/app/utils/icons';
export default function Wallet() {
	const { t } = useTranslation();
	const language = UseLanguage();
	return (
		<div className='global-cards gap-3'>
			<h3 className='title text-lg'>{t('Wallet')}</h3>
			<h2 className='title font-normal text-[2.25rem]'>
				{language === 'ar' ? `200 ${t('SAR')}` : `${t('SAR')} 200`}
			</h2>
			<div className='flex-row-global gap-2'>
				<ClockIcon />
				<p className='text-sm'>{t('Deposited in')}: 5 Oct 2022</p>
			</div>
		</div>
	);
}
