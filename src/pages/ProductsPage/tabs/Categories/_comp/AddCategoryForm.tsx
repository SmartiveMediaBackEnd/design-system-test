import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Form } from 'src/app/components/ui/form';
import { Input } from 'src/app/components/ui/input';
import { Tab } from '@mui/material';

import TabbedFormField from 'src/app/components/ui/form/tabbed-field';

import Button from 'src/app/components/optimized/Buttons/Button';
import { TfiUpload } from 'react-icons/tfi';
import { GlobalDialog } from 'src/app/components/shared';
import { Product } from 'src/pages/ProductsPage/_comp/data';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import Tabs from 'src/app/components/optimized/Tabs/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';
import { InferredZodSchema, useForm } from 'src/app/utils/hooks/form';
import ImageInput from 'src/app/components/ui/form/ImageInput';
import FormField from 'src/app/components/ui/form/field';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import {
	getCategoriesTable,
	PostAddCategoryRequest,
	PutUpdateCategoryRequest,
} from 'src/app/store/slices/productsPage/categories/categoriesTable/categoriesTableAsyncThunks';

interface AddCategoryFormProps {
	openDialog: boolean;
	handleClose: () => void;
	allProducts: Product[];
	Edit_id: string;
	setEdit_id: (e: string) => void;
}
const stringValidation = z.string().min(1);
const CategorySchema = {
	name_en: stringValidation,
	name_ar: stringValidation,
	slug: stringValidation.url(),
	description_en: stringValidation,
	description_ar: stringValidation,

	image: z.instanceof(File),
	status: z.number(),
	products: z
		.array(
			z.object({
				id: stringValidation,
				name: stringValidation,
			}),
		)
		.min(1),
};
export type AddCategorySchemaValues = InferredZodSchema<typeof CategorySchema>;

export default function AddCategoryForm({
	openDialog,
	handleClose,
	allProducts,
	Edit_id,
	setEdit_id,
}: AddCategoryFormProps) {
	//  hooks
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	//  selectors
	const { isLoadingAddOrUpdate, categoryInfo } = useAppSelector((state) => state.categoriesTable);

	const { formStore, onSubmit } = useForm({
		schema: CategorySchema,
		handleSubmit: (values: AddCategorySchemaValues) => {
			const formData = new FormData();

			formData.append('en[name]', values.name_en);
			formData.append('ar[name]', values.name_ar);
			formData.append('en[description]', values.description_en);
			formData.append('ar[description]', values.description_ar);
			formData.append('slug', values.slug);

			formData.append('status', values.status);
			formData.append('image[]', values.image);
			formData.append('locale', 'all');
			// formData.append('groupPosterImage[]', values.image);
			Edit_id && formData.append('_method', 'put');
			values.products
				?.map((e: { id: string; name: string }) => e?.id)
				?.map((e: string) => {
					formData.append('products[]', e);
				});

			if (Edit_id) {
				dispatch(
					PutUpdateCategoryRequest({
						data: formData,
						id: Edit_id,
					}),
				).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						handleClose();
						setEdit_id('');
						dispatch(getCategoriesTable());
					}
				});
			} else {
				dispatch(PostAddCategoryRequest(formData)).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						handleClose();
						setEdit_id && setEdit_id('');
						dispatch(getCategoriesTable());
					}
				});
			}
		},
		defaultValues: {
			name_en: '',
			name_ar: '',
			description_en: '',
			description_ar: '',
			slug: '',
			image: undefined,
			status: 0,
			products: [],
		},
	});

	const style = {
		height: { md: '35.8rem', xs: '27.5rem' },
		width: { md: '40rem', xs: '25.8rem' },
	};

	useEffect(() => {
		formStore.setValue('status', formStore.watch('status') ? 1 : 0);
	}, [formStore.watch('status')]);

	useEffect(() => {
		if (Edit_id) {
			formStore.setValue('name_en', categoryInfo[0][0]?.en?.name);
			formStore.setValue('name_ar', categoryInfo[0][0]?.ar?.name);
			formStore.setValue('description_en', categoryInfo[0][0]?.en?.description);
			formStore.setValue('description_ar', categoryInfo[0][0]?.ar?.description);
			formStore.setValue('slug', categoryInfo[0][0]?.slug);

			categoryInfo[0][0]?.status > 0
				? formStore.setValue('status', 1)
				: formStore.setValue('status', 0);
			categoryInfo[1]?.products?.length > 0 &&
				formStore.setValue(
					'products',
					categoryInfo[1]?.products?.map((e) => {
						return {
							id: e.id ? e.id.toString() : '',
							name: e?.name ? e?.name : '',
						};
					}),
				);
		}
	}, [Edit_id, categoryInfo[0][0], categoryInfo[1]]);

	return (
		<GlobalDialog style={style} openDialog={openDialog} handleClose={handleClose}>
			<Form {...formStore}>
				<form onSubmit={onSubmit} className='flex-col-global'>
					<Tabs
						body={
							<>
								<TabPanel value='1'>
									<div className='flex md:flex-row items-start flex-col gap-[2rem]'>
										<div className='flex-col-global'>
											<ImageInput<AddCategorySchemaValues> name={'image'} formStore={formStore}>
												<TfiUpload className='text-[1.5rem]' />
												<p className='paragraph text-center'>{t('Add Category')}</p>
											</ImageInput>
										</div>

										<div className='flex-col-global md:w-[80%] w-full'>
											<TabbedFormField
												formStore={formStore}
												keys={[
													{ name: 'name_en', label: 'En' },
													{ name: 'name_ar', label: 'عربي' },
												]}
												label={t('Category name')}
												renderer={(field) => <Input {...field} />}
											/>

											<FormField
												formStore={formStore}
												name='slug'
												label={t('Category link (Slug)')}
												render={(field) => <Input {...field} placeholder={''} />}
											/>
											<TabbedFormField
												formStore={formStore}
												keys={[
													{ name: 'description_en', label: 'En' },
													{ name: 'description_ar', label: 'عربي' },
												]}
												label={t('Category description')}
												renderer={(field) => <Input {...field} />}
											/>
											<div className='flex-col-global gap-2'>
												<p>{t('Availability')}</p>
												<div className='flex-row-global gap-2'>
													<FormSwitchField<AddCategorySchemaValues>
														formStore={formStore}
														name='status'
														enable
													/>
													<p>{formStore.watch('status') ? 'On' : 'Off'}</p>
												</div>
											</div>
										</div>
									</div>
								</TabPanel>
								<TabPanel value='2'>
									<SpecificAutoCompleteInput<AddCategorySchemaValues>
										array={allProducts?.map((e) => {
											return {
												id: e.id.toString(),
												name: e.en.name,
											};
										})}
										label={t('Products')}
										name='products'
										formStore={formStore}
									/>
								</TabPanel>
							</>
						}
					>
						<Tab label={t('General Info')} value='1' />
						<Tab label={t('Products')} value='2' />
					</Tabs>
					<div className='flex justify-end items-center gap-4'>
						<Button onClick={handleClose} variant='tertiary'>
							{t('cancel')}
						</Button>
						<Button loading={isLoadingAddOrUpdate} onClick={onSubmit} variant='primary'>
							{t('Save')}
						</Button>
					</div>
				</form>
			</Form>
		</GlobalDialog>
	);
}
