import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { SubHeader } from 'src/app/components/optimized';
import CustomerOrderNotifcation from 'src/app/components/page/SettingPage/E-mailNotification/CustomOrderNotification';
import CustomizeNotificationForm from 'src/app/components/page/SettingPage/E-mailNotification/CustomizeNotificationForm';
import Customization from './Customization';

export default function EmailNotification() {
	//  hooks
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();

	const id = searchParams.get('id');
	return id ? (
		<CustomizeNotificationForm />
	) : (
		<div className='flex-col-global '>
			<SubHeader title={t('Notifications')} />
			<div className='grid gap-5 lg:grid-cols-3 custom_container'>
				<CustomerOrderNotifcation />
				<Customization />
			</div>
		</div>
	);
}
