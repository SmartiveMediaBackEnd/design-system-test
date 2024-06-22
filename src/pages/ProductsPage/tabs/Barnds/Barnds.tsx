import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomersComponenet from 'src/pages/CustomersPage/_comp/ResponsiveSmallMedia/CustomersComponent';
import BrandsTable from 'src/pages/ProductsPage/tabs/Barnds/_comp/BrandsTable';
import TopSectionBrandsTable from 'src/pages/ProductsPage/tabs/Barnds/_comp/TopSectionBrandsTable';
import { getBrandsTable } from 'src/app/store/slices/productsPage/brands/brandsAsyncThunks';
import { CopyIcon, AnalyticsIcon, OrdersIcon } from 'src/app/utils/icons';
import { LiaTrashAlt } from 'react-icons/lia';

export default function Barnds() {
	// redux
	const dispatch = useDispatch();
	const { isLoading, brands, error } = useSelector((state) => state.brands);
	useEffect(() => {
		dispatch(getBrandsTable());
	}, [dispatch]);

	const barndsSettingMenus = [
		{ id: nanoid(), text: 'Copy brand link', icon: <CopyIcon className='fill-subtitle' /> },
		{ id: nanoid(), text: 'brand report', icon: <AnalyticsIcon className='fill-subtitle' /> },
		{ id: nanoid(), text: 'brand products', icon: <OrdersIcon className='fill-subtitle' /> },

		{
			id: nanoid(),
			text: 'Delete brand',
			icon: <LiaTrashAlt size='28' className='fill-error' />,
		},
	];

	return (
		<div className='custom_container'>
			<div className='flex-col-global '>
				{/*  top section */}
				<TopSectionBrandsTable />

				{/*  table  */}
				<BrandsTable settingMenus={barndsSettingMenus} brands={brands} isLoading={isLoading} />

				{/*  case of small media */}
				<div className='flex-col-global sm:hidden'>
					{brands?.map((e, i) => (
						<CustomersComponenet
							noAvatar
							id={e.id}
							settingMenus={barndsSettingMenus}
							key={i}
							firstName={e.title}
							email={e.describtion}
							imageUrl={e.img}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
