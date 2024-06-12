import CustomersComponenet from 'src/pages/CustomersPage/_comp/ResponsiveSmallMedia/CustomersComponent';

import TopSectionCategoriesTable from './_comp/TopSectionCategoriesTable';
import { nanoid } from 'nanoid';
import { AnalyticsIcon, CopyIcon, OrdersIcon, RemoveIcon } from 'src/app/utils/icons';
import { useTranslation } from 'react-i18next';
import { CategoryTable } from './_comp/CategoryTable';
export interface Category {
	id: string;
	img: string;
	name: string;
	subtitle: string;
	products: number;
	subcategories: number;
	active: boolean;
}

export default function Categories() {
	//  hooks 
	const {t}=useTranslation()
	// body
	const categoryData = [
		{
			id: "1",
			img: 'images/product.png',
			name: 'General Wellness',
			subtitle: 'lorem ipsum dolor sit amet dolor ...',
			products: 51,
			subcategories: 179,
			active: true,
		},
		{
			id: "2",
			img: 'images/product.png',
			name: 'General Wellness',
			subtitle: 'lorem ipsum dolor sit amet dolor ...',
			products: 51,
			subcategories: 179,
			active: false,
		},
	];

	const Menue = [
		{ id: nanoid(), text: t('Copy category link'), icon: <CopyIcon className='iconClass' /> },
		{ id: nanoid(), text: t('Category report'), icon: <AnalyticsIcon className='iconClass' /> },
		{ id: nanoid(), text: t('Category products'), icon: <OrdersIcon className='iconClass' /> },
		{
			id: nanoid(),
			text: t('Delete category'),
			icon: <RemoveIcon className='iconClass' />,
		},
	];
	return (
		<div className='custom_container'>
			<div className='flex-col-global'>
				{/*  top section */}
				<TopSectionCategoriesTable />

				{/* table */}
				<CategoryTable Menue={Menue} categoryData={categoryData} />

				{/*  case of small media */}
				<div className='flex-col-global sm:hidden'>
					{categoryData?.map((e, i) => (
						<CustomersComponenet
							noAvatar
							id={e.id}
							settingMenus={Menue}
							key={i}
							firstName={e.name}
							email={e.subtitle}
							imageUrl={e.img}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
