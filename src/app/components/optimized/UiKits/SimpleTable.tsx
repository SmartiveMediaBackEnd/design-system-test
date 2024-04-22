import React, { useState } from 'react';
import _ from 'lodash';
import Pagination from './Pagination';
import { Button } from 'src/app/components/optimized';
import { IoPrintOutline } from 'react-icons/io5';
import { RiFileExcel2Line } from 'react-icons/ri';
import { exportToExcel } from 'src/app/utils';

interface TableColumn {
	header: string;
	accessor: string;
}

interface TableRow {
	[key: string]: any;
}

interface TableProps {
	columns: TableColumn[];
	data: TableRow[];
	itemsPerPage: number;
	exportFilename: string;
}

const style = {
	columns: `px-5 py-3 border-b bg-white rounded-md border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer`,
	row: `px-5 py-5 border-b border-gray-200 bg-white text-left text-gray-800 rounded-md`,
};

type Direction = boolean | 'asc' | 'desc';

// useSortableTable
const useSortableTable = (initialData: TableRow[]) => {
	const [sortedData, setSortedData] = useState<TableRow[]>(initialData);
	const [sortConfig, setSortConfig] = useState<{
		key: string;
		direction: Direction | undefined;
	} | null>(null);

	const sortData = (key: string) => {
		let direction: Direction = 'asc';
		if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc';
		}
		setSortConfig({ key, direction });
		const sorted = _.orderBy(initialData, [key], [direction]);
		setSortedData(sorted);
	};

	return { sortedData, sortData, sortConfig };
};

// SimpleTable
const SimpleTable: React.FC<TableProps> = ({ columns, data, itemsPerPage, exportFilename }) => {
	const { sortedData, sortData, sortConfig } = useSortableTable(data);
	const [currentPage, setCurrentPage] = useState(1);
	// Pagination
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};
	const totalItems = sortedData.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const handlePrint = () => {
		window.print();
	};

	const handleExportToExcel = () => {
		exportToExcel(data, exportFilename + '.xlsx');
	};

	const renderColumns = () => {
		return columns.map((column, index) => {
			const isSorted = sortConfig && sortConfig.key === column.accessor;
			const sortIcon = isSorted ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '';
			return (
				<th key={index} className={style.columns} onClick={() => sortData(column.accessor)}>
					{column.header} {sortIcon}
				</th>
			);
		});
	};

	const renderRows = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return sortedData.slice(startIndex, endIndex).map((row, rowIndex) => (
			<tr key={rowIndex}>
				{columns.map((column, colIndex) => (
					<td key={colIndex} className={style.row}>
						{row[column.accessor]}
					</td>
				))}
			</tr>
		));
	};

	return (
		<div className='overflow-x-auto'>
			<div className='mb-4 flex justify-end space-x-2'>
				<Button onClick={handlePrint} variant='secondary' LeftIcon={<IoPrintOutline />}>
					Print
				</Button>
				<Button onClick={handleExportToExcel} variant='secondary' LeftIcon={<RiFileExcel2Line />}>
					Export
				</Button>
			</div>
			<div className='print-only'>
				<table className='table-auto w-full'>
					<thead>
						<tr>{renderColumns()}</tr>
					</thead>
					<tbody>{renderRows()}</tbody>
				</table>
			</div>
			<Pagination
				totalItems={totalItems}
				itemsPerPage={itemsPerPage}
				currentPage={currentPage}
				onPageChange={handlePageChange}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default SimpleTable;

/*
const columns = [
		{ header: 'ID', accessor: 'id' },
		{ header: 'Name', accessor: 'name' },
		{ header: 'Age', accessor: 'age' },
		{ header: 'Switch', accessor: 'switch' },
		{ header: 'Actions', accessor: 'actions' },
	];

	const data = Array.from({ length: 100 }, (_, index) => ({
		id: index + 1,
		name: `Person ${index + 1}`,
		age: Math.floor(Math.random() * 50) + 20, // Random age between 20 and 70
		switch: <button onClick={() => alert('Switch')}>Switch</button>,
		actions: (
			<div className='flex space-x-2'>
				<button onClick={() => alert('Edit')}>Edit</button>
				<button onClick={() => alert('Delete')}>Delete</button>
			</div>
		),
	}));

<SimpleTable columns={columns} data={data} itemsPerPage={5} exportFilename='test' />
*/
