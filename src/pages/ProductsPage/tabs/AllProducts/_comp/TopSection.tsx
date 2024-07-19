import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosAddCircle, IoMdArrowDropdown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Button } from 'src/app/components/optimized';
import ActionsComp from 'src/app/components/optimized/Buttons/ActionsComp';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import PopoverComponenet from 'src/app/components/optimized/UiKits/Popover';
import FilterOrdersComponent from 'src/app/components/page/Orders/FilterOrder/FilterOrdersComponent';
import { GlobalDialog } from 'src/app/components/shared';
import { getImageUrl } from 'src/app/utils';
import { useOpenFilterDrawer } from 'src/app/utils/hooks/CustomHookOpenDrawer';
import {
	productActionsMenu,
	productDropdownMenu,
	productSortMenu,
} from 'src/pages/ProductsPage/_comp/data';
import { SimpleProductForm } from '../../_comp';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { getCategoriesTable } from 'src/app/store/slices/productsPage/categories/categoriesTable/categoriesTableAsyncThunks';

export default function TopSection({
	verticalCard,
	setVerticalCard,
}: {
	verticalCard: boolean;
	setVerticalCard: (e: boolean) => void;
}) {
	//  hooks
	const { t } = useTranslation();

	//  custom hook
	const { HandelopenDrawer, openDrawer, HandelCloseDrawer } = useOpenFilterDrawer();
	const { selectedOption, handleSelect } = useSelectBox();
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	//  selectors
	const { categoriesTable } = useAppSelector((state) => state.categoriesTable);
	const handleClose = (status: boolean) => {
		setOpenDialog(status);
	};

	const dialogStyle = {
		width: { lg: '1150px', md: '600px', xs: '375px' },
		// height: { md: '500px', xs: '300px' },
	};

	const handelListAndGridImg = () => {
		return (
			<div className='flex-row-global gap-[.7rem]'>
				<img
					onClick={() => setVerticalCard(false)}
					src={getImageUrl(
						!verticalCard
							? 'images/AllProductsImg/listActive.svg'
							: 'images/AllProductsImg/listNotActive.svg',
					)}
					loading='lazy'
					alt='listImg'
					className='cursor-pointer'
				/>
				<img
					onClick={() => setVerticalCard(true)}
					src={getImageUrl(
						!verticalCard
							? 'images/AllProductsImg/gridNotActive.svg'
							: 'images/AllProductsImg/gridActive.svg',
					)}
					loading='lazy'
					alt='gridImg'
					className='cursor-pointer'
				/>
			</div>
		);
	};

	useEffect(() => {
		dispatch(getCategoriesTable());
	}, [dispatch]);
	return (
		<>
			<div className='flex-col-global'>
				<div className='topTable'>
					{/*  left dropdow */}
					<PopoverComponenet
						button={
							<Button variant='primary' LeftIcon={IoIosAddCircle} RightIcon={IoMdArrowDropdown}>
								{t('Add Product')}
							</Button>
						}
					>
						<div
							style={{ boxShadow: '0px 10px 16px 0px #0000000D' }}
							className='py-[.8rem] px-[.6rem] w-[20rem] h-[24rem] rounded-[.4rem] bg-white'
						>
							<div className=' flex flex-col gap-[1rem]'>
								{productDropdownMenu?.map((e) => (
									<Link
										className='flex flex-col gap-[.9rem]'
										key={e.id}
										to={e.to == '/products/new/simple' ? '' : e.to}
										onClick={e.to == '/products/new/simple' ? () => setOpenDialog(true) : () => {}}
									>
										<div className='flex flex-col gap-[.2rem] cursor-pointer'>
											<div className='flex-row-global gap-[.4rem]'>
												<p className=' text-[.9rem] font-semibold'>{e.title}</p>
												{e.shipping && <img src={getImageUrl(`badges/shipped.svg`)} alt='status' />}
											</div>

											<p className='text-[.7rem]'>{e.describtion}</p>
										</div>
										<hr />
									</Link>
								))}
							</div>
						</div>
					</PopoverComponenet>

					<GlobalDialog
						openDialog={openDialog}
						handleClose={() => handleClose(false)}
						style={dialogStyle}
					>
						<SimpleProductForm
							handleClose={() => handleClose(false)}
							categoriesTable={categoriesTable}
						/>
					</GlobalDialog>

					{/*  actions filter arrange,... */}
					<div className='flex-row-global  gap-[1.2rem]'>
						<ActionsComp
							HandelopenDrawer={HandelopenDrawer}
							filter
							sortMenus={productSortMenu}
							ActionsMenus={productActionsMenu}
							selectedOption={selectedOption}
							handelSelect={handleSelect}
						/>

						{handelListAndGridImg()}
					</div>
				</div>
				<hr />
			</div>

			{/* open filter drawer */}
			{openDrawer && (
				<FilterOrdersComponent openDrawer={openDrawer} HandelCloseDrawer={HandelCloseDrawer} />
			)}
		</>
	);
}
