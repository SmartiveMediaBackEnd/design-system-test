import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import DropDownMenu from 'src/app/components/optimized/DropDownMenu';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { CustomersFilter } from 'src/pages/CustomersPage/tabs/AllCustomers/_comp/_addCustomer/_hook/HookFilterCustomers';
export default function ProductStatusFilter({ formStore }: { formStore: UseFormReturn<CustomersFilter> }) {
	//  hooks
	const { t } = useTranslation();


	return (
		<DropDownMenu title={t('Date')}>
				<FormField
					formStore={formStore}
					name='date_from:'
					label={t('Date from')}
					render={(field) => <Input {...field} placeholder={'YYYY-MM-DD'} />}
				/>
				<FormField
					formStore={formStore}
					name='date_to'
					label={t('Date to')}
					render={(field) => <Input {...field} placeholder={'YYYY-MM-DD'} />}
				/>
		</DropDownMenu>
	);
}
