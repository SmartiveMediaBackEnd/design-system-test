import { UseLanguage } from 'src/app/components/CustomHook/LanguageHook';
import CustomTableHeaderCheckbox from '../../Customers/CustomTableHeaderChckbox';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Product } from 'src/app/interface/ProductInterface';
import CustomTableBodyCheckbox from '../../Customers/CustomTableBodyChckbox';
import { CameraIcon, StarActiveIcon, StarIcon } from 'src/app/utils/icons';
import { TableCell } from '@mui/material';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import BaseTable, { GlobalTableCell } from '../../Customers/TableLayoutGlobal/base.table';
import { getImageUrl } from 'src/app/utils';
import { useState } from 'react';
import { products } from 'src/pages/ProductsPage/AllProducts';

export default function InventoryTable({
	array,
	setArray,
}: {
	array: string[];
	setArray: (e: string[]) => void;
}) {
	//  hooks
	const language = UseLanguage();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [isFavorite, setIsFavorite] = useState(false);

	//  headers

	const inventoryHeaders = [
		{
			icon: (
				<CustomTableHeaderCheckbox
					array={array}
					setArray={setArray}
					mainArray={products?.map((e) => e.id)}
				/>
			),
			title: t('Product & Category'),
		},
		{ title: t('SKU') },
		{ title: t('QTY') },
		{ title: t('Price') },
	];

	function toggleFavorite() {
		setIsFavorite(!isFavorite);
	}
	return (
		<BaseTable
			language={language}
			color='#55607A'
			headers={inventoryHeaders.map((h) => h)}
			rows={products?.map((e: Product, i: number) => {
				return {
					item: e,
					elements: [
						<GlobalTableCell>
							<div className=' flex  items-center gap-[.4rem] '>
								<div className='flex-col-top-section-pages gap-[.4rem] items-center'>
									<CustomTableBodyCheckbox array={array} setArray={setArray} id={e.id} />
									<button onClick={toggleFavorite}>
										{isFavorite ? (
											<StarActiveIcon className='fill-neutral-1' />
										) : (
											<StarIcon className='fill-hint' />
										)}
									</button>
								</div>
								<div className='relative'>
									<img src={getImageUrl(e.imageUrl)} loading='lazy' alt={e.name} />
									<CameraIcon className='bg-white rounded-[50%] p-[.1rem] w-[19px] h-[19px] absolute bottom-[.5rem] left-[.3rem]' />
								</div>

								<div className='flex-col-top-section-pages gap-2'>
									<p className='title text-sm'>{e.name}</p>
									<p className='subtitle'>{e.category}</p>
									<p className='subtitle'>
										{e.option} {t('Options')}
									</p>
								</div>
							</div>
						</GlobalTableCell>,
						<GlobalTableCell>
							<p className='text-title'>{e.SKU}</p>
						</GlobalTableCell>,
						<GlobalTableCell>
							<p className={e.quantity === 0 ? 'text-error' : 'text-black'}>
								{e.quantity > 0 ? e.quantity : t('Out of stock')}
							</p>
						</GlobalTableCell>,
						<GlobalTableCell>
							<span className='text-primary'>SAR</span> {e.price}
						</GlobalTableCell>,

						<TableCell>
							{language === 'ar' ? (
								<IoIosArrowBack
									className='text-subtitle cursor-pointer'
									onClick={() => navigate(`/products/${e?.id}`)}
								/>
							) : (
								<IoIosArrowForward
									className='text-subtitle cursor-pointer'
									onClick={() => navigate(`/products/${e?.id}`)}
								/>
							)}
						</TableCell>,
					],
				};
			})}
		/>
	);
}
