import { Form } from '../../../ui/form';
import { useForm } from 'src/app/utils/hooks/form';
import ProductFormMediaSection from './sections/Media';
import ProductFormBasicInfoSection from './sections/BasicInfo';
import ProductFormDescriptionAndSpecificationsSection from './sections/DescriptionAndSpecifications';
import ProductFormPricingSection from './sections/Pricing';
import ProductFormStockSection from './sections/Stock';
import ProductFormShippingSection from './sections/Shipping';
import ProductFormOptionsAndVariationsSection from './sections/OptionsAndVariations';
import ProductFormFaqsSection from './sections/Faqs';
import SeoFormFaqsSection from './sections/Seo';
import { ProductSchema } from './utils';

/**
 * @typedef {import("src/app/utils/hooks/form").InferredZodSchema<typeof ProductSchema>} ProductFormValues
 *
 * @typedef {import('react-hook-form').UseFormReturn<ProductFormValues>} ProductFormStore
 */

/**
 * @param {{
 *  defaultValues?: ProductFormValues;
 *  handleSubmit: (values: ProductFormValues) => void;
 * }} props
 *
 * @example
 *
 * ```jsx
 *	<ProductForm
 *		handleSubmit={(values) => {
 *			console.log(values);
 *		}}
 *	/>
 * ```
 */
export default function ProductForm(props) {
	const { formStore, onSubmit } = useForm({
		schema: ProductSchema,
		handleSubmit: props.handleSubmit,
		defaultValues: {
			isTaxable: true,
			price: 0,
			canContinueSellingWhenOutOfStock: false,
			isShippableOrPickupable: true,
			weightUnit: 'kg',
			dimensionUnit: 'cm',
			branches: [{ id: '1', name: 'Main Branch', quantity: 0 }],
			metaKeywords: [],
			options: [
				{
					tempId: '17170196345830.08869498755538041',
					type: 'text',
					values: [
						{
							tempId: '17170197021430.5009182178058251',
							value: 'Red',
							nameEn: 'Red',
							nameAr: 'أحمر',
						},
						{
							tempId: '17170197021430.6915686753370636',
							value: 'Green',
							nameEn: 'Green',
							nameAr: 'أخضر',
						},
					],
					name: 'color',
					id: '3a37cdfa-5e07-4a34-a50f-21902f5d0bf1',
					isRequired: true,
				},
			],
			...props.defaultValues,
		},
	});

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex flex-col gap-4'>
				<ProductFormMediaSection formStore={formStore} />
				<ProductFormBasicInfoSection formStore={formStore} />
				<ProductFormDescriptionAndSpecificationsSection formStore={formStore} />
				<ProductFormPricingSection formStore={formStore} />
				<ProductFormStockSection formStore={formStore} />
				<ProductFormShippingSection formStore={formStore} />
				<ProductFormOptionsAndVariationsSection formStore={formStore} />
				<SeoFormFaqsSection formStore={formStore} />
				<ProductFormFaqsSection formStore={formStore} />
			</form>
		</Form>
	);
}
