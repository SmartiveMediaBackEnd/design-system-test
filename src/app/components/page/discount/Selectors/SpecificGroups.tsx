import { useTranslation } from 'react-i18next';
import { newDiscountInterface } from 'src/pages/MarketingPage/Discounts/NewDiscount/HookForNewDiscount';
import { UseFormReturn } from 'react-hook-form';
import SpecificAutoCompleteInput from '../../../ui/SpecificAutoCompleteInput';

const SpecificGroups = ({ formStore }: { formStore: UseFormReturn<newDiscountInterface> }) => {
	const { t } = useTranslation();
	return (
		<div className='flex-col-global gap-0'>
			<SpecificAutoCompleteInput<newDiscountInterface>
				name='specificCustomerGroup'
				label={t('Select Customer Group')}
				formStore={formStore}
			/>
		</div>
	);
};

export default SpecificGroups;
