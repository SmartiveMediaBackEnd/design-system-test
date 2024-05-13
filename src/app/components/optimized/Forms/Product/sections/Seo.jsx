import { useTranslation } from 'react-i18next';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from 'src/app/components/ui/card';
import { FaCirclePlus } from 'react-icons/fa6';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { Textarea } from 'src/app/components/ui/textarea';
import { useWatch } from 'react-hook-form';
import { useState } from 'react';

/** @param {{ formStore: import("..").ProductFormStore; }} props */
function SearchResultsPreview(props) {
	const title = useWatch({
		control: props.formStore.control,
		name: 'generalInfo.pageTitle',
	});
	const metaDescription = useWatch({
		control: props.formStore.control,
		name: 'generalInfo.metaDescription',
	});

	return (
		<Card className='shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden'>
			<CardContent className='p-4 md:p-6'>
				<div className='space-y-2'>
					<h3 className='text-lg font-medium'>
						<a
							className='hover:underline pointer-events-none'
							href='#'
							aria-disabled
							target='_blank'
							rel='noopener noreferrer'
						>
							{title}
						</a>
					</h3>
					<a
						className='text-sec-pressed hover:underline pointer-events-none'
						href='#'
						aria-disabled
						target='_blank'
						rel='noopener noreferrer'
					>
						www.example.com
					</a>
					<p className='text-gray-500 dark:text-gray-400'>{metaDescription}</p>
				</div>
			</CardContent>
		</Card>
	);

	// return (
	// 	<Card>
	// 		<CardHeader>
	// 			<CardTitle>{t('Search Results Preview')}</CardTitle>
	// 		</CardHeader>
	// 		<CardContent>
	// 			<div className='flex flex-col gap-2'>
	// 				<div className='text-lg font-semibold'>{title}</div>
	// 				<div className='text-sm text-gray-400'>{metaDescription}</div>
	// 			</div>
	// 		</CardContent>
	// 	</Card>
	// );
}

/** @param {{ formStore: import("..").ProductFormStore; }} props */
function MetaKeywordsFormField(props) {
	const { t } = useTranslation();
	const metaKeywords = useWatch({
		control: props.formStore.control,
		name: 'generalInfo.metaKeywords',
	});
	const [keyword, setKeyword] = useState('');

	return (
		<div className='flex flex-col gap-1'>
			<div className='flex gap-2 border border-input rounded-md overflow-hidden'>
				<Input
					placeholder={t('e.g., T-Shirt, Clothes, Fashion')}
					className='border-0 rounded-none'
					minLength={3}
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
				/>
				<button
					type='button'
					onClick={() => {
						const newKeywords = new Set(metaKeywords);
						newKeywords.add(keyword);
						props.formStore.setValue('generalInfo.metaKeywords', [...newKeywords]);
					}}
				>
					<FaCirclePlus className='text-primary-500' />
					<span className='sr-only'>{t('Add')}</span>
				</button>
			</div>
			{metaKeywords.map((keyword) => (
				<div
					key={keyword}
					className='flex gap-2 justify-center items-center rounded-md text-pri-dark bg-gray-700 p-2'
				>
					<span>{keyword}</span>
					<button
						type='button'
						className='text-gray-300'
						onClick={() => {
							const newKeywords = metaKeywords.filter((key) => key !== keyword);
							props.formStore.setValue('generalInfo.metaKeywords', newKeywords);
						}}
					>
						x<span className='sr-only'>{t('Remove')}</span>
					</button>
				</div>
			))}
		</div>
	);
}

/** @param {{ formStore: import("..").ProductFormStore; }} props */
export default function SeoFormFaqsSection(props) {
	const { t } = useTranslation();

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t('SEO (Search engine listing preview)')}</CardTitle>
				<CardDescription className='text-gray-400'>
					{t('Answer qustions people frequently ask about your product')}
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				<SearchResultsPreview formStore={props.formStore} />
				<FormField
					formStore={props.formStore}
					name='generalInfo.pageTitle'
					label={t('Page Title')}
					render={(field) => <Input {...field} placeholder={t('e.g., T-Shirt')} />}
				/>
				{/* <FormField
						formStore={props.formStore}
						name='generalInfo.link'
						label={t('Link')}
						render={(field) => <Input {...field} placeholder={t('e.g., https://artisan.dookan.net/t-shirt')} />}
					/> */}
				<MetaKeywordsFormField formStore={props.formStore} />
				<FormField
					formStore={props.formStore}
					name='generalInfo.metaDescription'
					label={t('Meta Description')}
					render={(field) => <Textarea {...field} placeholder={t('Short description')} />}
				/>
			</CardContent>
		</Card>
	);
}
