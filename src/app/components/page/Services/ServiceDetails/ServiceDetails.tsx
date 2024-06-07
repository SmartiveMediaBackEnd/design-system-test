import { useTranslation } from 'react-i18next';
import { Button, SubHeader } from '../../../optimized';
import { getImageUrl } from 'src/app/utils';
import ServiceDetailsSales from './ServiceDetailssales';
import ServiceProviderSection from './ServiceProviderSection';
import RecentReview from 'src/pages/ReviewsPage/StoreReviews/_comp/RecentReview';
import { useNavigate } from 'react-router-dom';

export default function ServiceDetails() {
	//  hooks
	const { t } = useTranslation();
	const navigate = useNavigate();
	return (
		<div className='flex-col-top-section-pages mb-[2rem]'>
			{/*  top section */}
			<div className='flex flex-col'>
				<SubHeader title={t('Service details')}>
					<Button onClick={() => navigate('purchaseServicesPage')} variant='primary'>
						{t('Purchase service')}
					</Button>
				</SubHeader>

				<img loading='lazy' alt='img' src={getImageUrl('Services/poster.svg')} />
			</div>
			<div className='custom_container'>
				<div className='flex-col-top-section-pages '>
					{/*  middle section */}
					<div className='grid lg:grid-cols-3 sm:grid-cols-1 items-start gap-4'>
						<div className='lg:col-span-2'>
							<ServiceDetailsSales />
						</div>
						<ServiceProviderSection />
						<div className='lg:col-span-2'>
							<RecentReview />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
