import { nanoid } from 'nanoid';


import { LiaTrashAlt } from 'react-icons/lia';
import { BrandsInterface } from 'src/app/interface/BrandInterface';
import { useAppSelector } from 'src/app/store';
import { UseCustomTableSorting } from 'src/app/utils/hooks/UseCustomTablesorting';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import { AnalyticsIcon, CopyIcon, OrdersIcon } from 'src/app/utils/icons';

export const Use_Hook_ForBrandsPage = (selectedOption: string) => {
	const { brands, isLoading } = useAppSelector((state) => state.brands);
	const { allProducts } = useAppSelector((state) => state.allProducts);

	const { language } = useLanguage();

	// /////////////////

	const brandsSettingMenus = [
		{ id: nanoid(), text: 'Copy brand link', icon: <CopyIcon className='fill-subtitle' /> },
		{ id: nanoid(), text: 'brand report', icon: <AnalyticsIcon className='fill-subtitle' /> },
		{ id: nanoid(), text: 'brand products', icon: <OrdersIcon className='fill-subtitle' /> },

		{
			id: nanoid(),
			text: 'Delete brand',
			icon: <LiaTrashAlt size='28' className='fill-error' />,
		},
	];
	let brandsIds = brands?.map((e) => e?.id.toString()).join(',');

	//  handel Sorting Table
	const sortFunctions = {
		'Name A to Z': (a: BrandsInterface, b: BrandsInterface) =>
			language === 'ar' ? a.name_ar.localeCompare(b.name_ar) : a.name_en.localeCompare(b.name_en),
		'Name Z to A': (a: BrandsInterface, b: BrandsInterface) =>
			language === 'ar' ? b.name_ar.localeCompare(a.name_ar) : b.name_en.localeCompare(a.name_en),
	};
	const sortMenus = [
		{ id: nanoid(), text: 'Name A to Z' },
		{ id: nanoid(), text: 'Name Z to A' },
		// { id: nanoid(), text: 'SKU Ascending' },
		// { id: nanoid(), text: 'SKU Descending' },
		// { id: nanoid(), text: 'Price Low in first' },
		// { id: nanoid(), text: 'Price High in first' },
		// { id: nanoid(), text: 'Date Added' },
		// { id: nanoid(), text: 'Date modified' },
	];
	const { arrangedData: BrandsArrangedData } = UseCustomTableSorting<BrandsInterface>(
		sortFunctions,
		brands,
		sortMenus?.map((e) => e.text).includes(selectedOption) ? selectedOption : '',
	);
	// //////////////////////
	return {
		brandsSettingMenus,
		allProducts,
		BrandsArrangedData,
		brandsIds,
		isLoading,
		language,
		sortMenus
		
	};
};
