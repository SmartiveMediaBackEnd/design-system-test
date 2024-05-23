import { useTranslation } from 'react-i18next';
import BuyXGetY from './BuyXGetY';
import { UseFormReturn } from 'react-hook-form';
import { newDiscountInterface } from '../../HookForNewDiscount';
import SpecificAutoCompleteInput from 'src/app/components/page/discount/Selectors/SpecificAutoCompleteInput';

const ApplyToOptions = ({
	applyTo,
	formStore,
}: {
	applyTo: string;
	formStore: UseFormReturn<newDiscountInterface>;
}) => {
	//  hooks
	const { t } = useTranslation();
	// /////////////////////////////////////
	const handelRenderingComponentWithApplyTo = () => {
		switch (applyTo) {
			case 'Specific category':
				return (
					<SpecificAutoCompleteInput<newDiscountInterface>
						name='specificCategories'
						label={t('Select Category')}
						formStore={formStore}
					/>
				);
			case 'Specific products':
				return (
					<SpecificAutoCompleteInput<newDiscountInterface>
						name='specificProducts'
						label={t('select products')}
						formStore={formStore}
					/>
				);
			case 'Buy x get y':
				return <BuyXGetY formStore={formStore} />;
		}
	};
	return handelRenderingComponentWithApplyTo();
};

export default ApplyToOptions;
