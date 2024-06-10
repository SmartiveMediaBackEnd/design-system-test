import { useTranslation } from 'react-i18next';

import { Form } from 'src/app/components/ui/form';
import { Input } from 'src/app/components/ui/input';
import { Button } from 'src/app/components/optimized';
import FormField from 'src/app/components/ui/form/field';
import useTaxPrograms, { addRateTypes } from './useTaxPrograms';
import GlobalDialog from 'src/app/components/Dialogs/GlobalDialog';
import TabbedFormField from 'src/app/components/ui/form/tabbed-field';
import FormChoiceChips from '../../../../ui/form/FormChoiceChips';
import { useEffect, useState } from 'react';

const style = {
	width: { md: '40rem', xs: '22rem' },
};
interface Props {
	onClose: () => void;
	isOpen: boolean;
	title: string;
}

export default function RatePopup({ onClose, isOpen, title }: Props) {
	const { t } = useTranslation();
	const [type, setType] = useState('Percentage');
	const { formStore, onSubmit } = useTaxPrograms(type);

	useEffect(() => {
		setType(formStore.watch('rateType'));
	}, [formStore]);
	return (
		<GlobalDialog openDialog={isOpen} handleClose={onClose} style={style}>
			<Form {...formStore}>
				<form onSubmit={onSubmit} className='gap-5 grid '>
					<h3 className='title capitalize'>{title}</h3>
					<div className='grid gap-4 '>
						<TabbedFormField
							formStore={formStore}
							keys={[
								{ name: 'rateNameEn', label: 'En' },
								{ name: 'rateNameAr', label: 'عربي' },
							]}
							label={t('Rate name')}
							renderer={(field) => <Input {...field} />}
						/>
						<FormChoiceChips<addRateTypes>
							formStore={formStore}
							name='rateType'
							label='Type'
							options={['Percentage', 'Fixed amount']}
						/>
						{formStore.watch('rateType') === 'Percentage' ? (
							<FormField
								formStore={formStore}
								name='percentage'
								label={t('Percentage')}
								render={(field) => <Input {...field} />}
							/>
						) : (
							<FormField
								formStore={formStore}
								name='fixedAmount'
								label={t('Fixed amount')}
								render={(field) => <Input {...field} />}
							/>
						)}
					</div>
					<div className='flex items-center justify-end gap-4 '>
						<Button variant='tertiary' onClick={() => onClose()} text={t('Cancel')} />
						<Button variant='primary' onClick={onSubmit} text={t('Add')} />
					</div>
				</form>
			</Form>
		</GlobalDialog>
	);
}
