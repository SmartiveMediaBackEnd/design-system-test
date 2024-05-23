import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SingleChoiceChips from 'src/app/components/optimized/ChoiceChips/SingleChoiceChips';
import ApplyToOptions from './comp/ApplyToOptions';

import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import DiscountTypesOptions from 'src/app/components/page/discount/Comp/DiscountTypesOptions';
import { newDiscountInterface } from '../HookForNewDiscount';

const BasicInfo = ({ formStore }: { formStore: UseFormReturn<newDiscountInterface> }) => {
	const { t } = useTranslation();

	const applyToOptions = ['All products', 'Specific category', 'Specific products', 'Buy x get y'];

	const discountTypesOptions = ['Percentage', 'Fixed amount', 'Free shipping'];

	const handleDiscountType = (option: string) => {
		formStore.setValue('discountType', option);
	};

	const handleApplyTo = (option: string) => {
		formStore.setValue('applyToType', option);
	};
	return (
		<div className='global-cards'>
			<h3 className='title'>{t('Basic info')}</h3>
			<div className='flex-col-top-section-pages'>
				<div className='md:w-[24rem]'>
					<FormField
						formStore={formStore}
						name='discountName'
						label={t('discount name')}
						render={(field) => <Input {...field} />}
					/>
				</div>
			</div>

			<section className='flex-col-top-section-pages gap-[.5rem]'>
				<h5 className='text-sm title'>{t('Discount Type')}</h5>

				<SingleChoiceChips
					options={discountTypesOptions}
					setSelected={handleDiscountType}
					selected={formStore.watch('discountType')}
				/>
				<DiscountTypesOptions
					discountType={formStore.watch('discountType')}
					formStore={formStore}
				/>
			</section>

			<section className='flex-col-top-section-pages gap-[.5rem]'>
				<h5 className='text-sm title'>{t('Apply to')}</h5>
				<SingleChoiceChips
					options={applyToOptions}
					setSelected={handleApplyTo}
					selected={formStore.watch('applyToType')}
				/>

				<ApplyToOptions applyTo={formStore.watch('applyToType')} formStore={formStore} />
			</section>
		</div>
	);
};

export default BasicInfo;
