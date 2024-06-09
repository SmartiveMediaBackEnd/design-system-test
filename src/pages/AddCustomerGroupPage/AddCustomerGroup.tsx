import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, SubHeader } from 'src/app/components/optimized';
import {
	AddCustomerGroupPageSchema,
	AddCustomerGroupPageSchemaValues,
} from 'src/app/components/page/AddCustomerGroup/AddCustomerGroupSchema';
import ChooseCustomers from 'src/app/components/page/AddCustomerGroup/ChooseCustomers';
import GeneralInfoCustomerGroupInfo from 'src/app/components/page/AddCustomerGroup/GeneralInfo';
import useCustomHookAddCustomerGroupForm from 'src/app/components/page/AddCustomerGroup/HookForAddCustomerGroupForm';
import { Form } from 'src/app/components/ui/form';
import { useForm } from 'src/app/utils/hooks/form';

export default function AddCustomerGroup() {
	//  hooks
	const { t } = useTranslation();
	const navigate = useNavigate();

	//  custome hook
	const { handelDefaultValue } = useCustomHookAddCustomerGroupForm();
	const handleSubmit = (values: AddCustomerGroupPageSchemaValues) => {
		console.log(values);
		// handleClose();
	};
	const { formStore, onSubmit } = useForm({
		schema: AddCustomerGroupPageSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});
	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-top-section-pages'>
				<SubHeader title={t('Add New Group')}>
					<Button variant='secondary' onClick={() => navigate(-1)}>
						{t('Discard')}
					</Button>
					<Button variant='primary' onClick={onSubmit}>
						{t('Save Changes')}
					</Button>
				</SubHeader>
				<div className='grid gap-5 lg:grid-cols-3 custom_container'>
					<div className='flex-col-top-section-pages lg:col-span-2'>
						<GeneralInfoCustomerGroupInfo formStore={formStore} />
						<ChooseCustomers formStore={formStore} />
					</div>
				</div>
			</form>
		</Form>
	);
}
