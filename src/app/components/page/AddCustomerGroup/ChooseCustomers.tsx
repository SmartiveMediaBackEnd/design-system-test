import { useTranslation } from 'react-i18next';

import { UseFormReturn } from 'react-hook-form';
import SpecificAutoCompleteInput from '../discount/Selectors/SpecificAutoCompleteInput';

import { AddCustomerGroupPageSchemaValues } from './AddCustomerGroupSchema';

export default function ChooseCustomers({
	formStore,
}: {
	formStore: UseFormReturn<AddCustomerGroupPageSchemaValues>;
}) {
	//  hooks
	const { t } = useTranslation();

	// ///////////////////////////

	return (
		<div className='global-cards gap-[1.2rem]'>
			<h2 className='title'>
				{t('Customers')}({formStore.watch('Customers')?.length})
			</h2>
			<SpecificAutoCompleteInput<AddCustomerGroupPageSchemaValues>
				name='Customers'
				label={t('Customers')}
				formStore={formStore}
			/>
		</div>
	);
}
