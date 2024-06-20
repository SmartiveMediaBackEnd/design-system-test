import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { UseLanguage } from 'src/app/utils/hooks/LanguageHook';
import { Switch } from 'src/app/components/ui/switch';
import ThreeDotsButton from 'src/app/components/optimized/Buttons/ThreedotsButton';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import { nanoid } from 'nanoid';
import { AnalyticsIcon, CopyIcon, OrdersIcon, RemoveIcon, MoveIcon } from 'src/app/utils/icons';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from 'src/app/utils';
import BaseTable, {
	GlobalTableCell,
} from 'src/app/components/optimized/TableLayoutGlobal/base.table';

//  pass data to collapses row
function createData(name: string, products: number, active: boolean, img: string) {
	return {
		name,
		products,
		active,
		img,
		history: [
			{
				id: nanoid(),
				subName: 'mobility',
				subProducts: 51,
				subActive: true,
				subImg: 'images/product.png',
			},
			{
				id: nanoid(),
				subName: 'mobility',
				subProducts: 51,
				subActive: true,
				subImg: 'images/product.png',
			},
			{
				id: nanoid(),
				subName: 'mobility',
				subProducts: 51,
				subActive: true,
				subImg: 'images/product.png',
			},
		],
	};
}

//  handel collapsed row
function Row(props: { row: ReturnType<typeof createData> }) {
	//  props
	const { row } = props;
	//  hooks
	const [open, setOpen] = React.useState(false);
	//  custom hooks
	const language = UseLanguage();
	const { selectedOption, handleSelect } = useSelectBox();

	const Menu = [
		{ id: nanoid(), text: 'Copy subcategory link', icon: <CopyIcon className='iconClass' /> },
		{ id: nanoid(), text: 'Subcategory report', icon: <AnalyticsIcon className='iconClass' /> },
		{ id: nanoid(), text: 'Subcategory products', icon: <OrdersIcon className='iconClass' /> },
		{
			id: nanoid(),
			text: 'Delete subcategory',
			icon: <RemoveIcon className='iconClass' />,
		},
	];

	const SubMenu = [
		{ id: nanoid(), text: 'Copy product link', icon: <CopyIcon className='iconClass' /> },
		{ id: nanoid(), text: 'Product report', icon: <AnalyticsIcon className='iconClass' /> },
		{ id: nanoid(), text: 'Products', icon: <OrdersIcon className='iconClass' /> },
		{
			id: nanoid(),
			text: 'Delete product',
			icon: <RemoveIcon className='iconClass' />,
		},
	];


	return (
		<React.Fragment>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<GlobalTableCell>
					<IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</GlobalTableCell>
				<GlobalTableCell component='th' scope='row'>
					<div className='flex items-center gap-2'>
						<MoveIcon />
						<div className='box-photo'>
							<img src={getImageUrl(row.img)} />
						</div>

						<div>{row.name}</div>
					</div>
				</GlobalTableCell>
				<GlobalTableCell>{row.products}</GlobalTableCell>
				<GlobalTableCell>
					<Switch checked={row.active} />
				</GlobalTableCell>
				<GlobalTableCell>
					<div className='flex gap-4 items-center'>
						<ThreeDotsButton
							sortMenus={Menu}
							selectedOption={selectedOption}
							handelSelect={handleSelect}
						/>
					</div>
				</GlobalTableCell>
			</TableRow>
			<TableRow>
				<GlobalTableCell
					style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 100, paddingRight: 100 }}
					colSpan={15}
				>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<BaseTable
								collapse
								language={language}
								color='#55607A'
								rows={row.history.map((historyRow) => (
									<TableRow key={historyRow.id}>
										<GlobalTableCell component='th' scope='row'>
											<div className='flex items-center gap-2'>
												<MoveIcon />
												<div className='box-photo'>
													<img src={getImageUrl(row.img)} />
												</div>

												<div>{historyRow.subName}</div>
											</div>
										</GlobalTableCell>
										<GlobalTableCell>{historyRow.subProducts}</GlobalTableCell>
										<GlobalTableCell>
											<Switch checked={historyRow.subActive} />
										</GlobalTableCell>
										<GlobalTableCell>
											<div className='flex gap-4 items-center justify-end'>
												<ThreeDotsButton
													sortMenus={SubMenu}
													selectedOption={selectedOption}
													handelSelect={handleSelect}
												/>
											</div>
										</GlobalTableCell>
									</TableRow>
								))}
							/>
						</Box>
					</Collapse>
				</GlobalTableCell>
			</TableRow>
		</React.Fragment>
	);
}

const rows = [
	createData('General Wellness', 159, true, 'images/product.png'),
	createData('General Wellness', 237, true, 'images/product.png'),
	createData('General Wellness', 262, true, 'images/product.png'),
];

export default function SubCategoryTable() {
	//  hooks
	const language = UseLanguage();
	const { t } = useTranslation();

	// headers
	const subcategoriesHeaders = [
		{
			title: t('Name'),
		},
		{ title: t('PRODUCTS NO.') },
		{ title: t('AVAILABILITY') },

		{ title: t('actions') },
	];
	return (
		<BaseTable
			collapse
			language={language}
			color='#55607A'
			headers={subcategoriesHeaders}
			rows={rows.map((row) => (
				<Row key={row.name} row={row} />
			))}
		/>
	);
}
