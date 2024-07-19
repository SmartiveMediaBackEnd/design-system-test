import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ActionsComp from 'src/app/components/optimized/Buttons/ActionsComp';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import { FaRegEdit } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import { LiaTrashAlt } from 'react-icons/lia';
import { Button } from 'src/app/components/optimized';

export default function TopSectionInventoryTable({
	sortMenus,
	selectedOption,
	handleSelect,
}: {
	sortMenus: { id: string; text: string }[];
	selectedOption: string;
	handleSelect: (e: string) => void;
}) {
	//  hooks
	const navigate = useNavigate();
	const { t } = useTranslation();
	
	const { xs } = useResponsive();

	const ActionsMenus = [
		{ id: nanoid(), text: t('Bulk edit'), icon: <FaRegEdit className='iconClass' /> },
		{
			id: nanoid(),
			text: 'Delete all inventories',
			icon: <LiaTrashAlt size='28' className='fill-error' />,
		},
	];

	return (
		<div className='flex-col-global'>
			<div className='topTable'>
				{/* add inventory button */}
				{!xs && (
					<Button
						variant='primary'
						LeftIcon={IoIosAddCircle}
						onClick={() => {
							navigate('addInventory');
						}}
					>
						{t('Add Inventory')}
					</Button>
				)}
				{/*   arrange,... */}
				<div className='flex-row-global  gap-[1.2rem]'>
					<ActionsComp
						ActionsMenus={ActionsMenus}
						sortMenus={sortMenus}
						selectedOption={selectedOption}
						handelSelect={handleSelect}
					/>
				</div>
			</div>
			<hr />
		</div>
	);
}
