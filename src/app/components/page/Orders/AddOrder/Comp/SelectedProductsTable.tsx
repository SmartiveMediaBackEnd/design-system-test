import { TableCell } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from 'src/app/utils';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { IQuantity, Product } from '../Products';
import BaseTable from 'src/app/components/optimized/TableLayoutGlobal/base.table';
import { RemoveIcon } from 'src/app/utils/icons';
import useResponsive from 'src/app/utils/hooks/useResponsive';

interface SelectedProductsTableProps {
	formStore: UseFormReturn<IQuantity>;
	products: Product[];
	onQuantityChange: (productId: string, quantity: number) => void;
	onDelete: (productId: string) => void;
}

export default function SelectedProductsTable({
	formStore,
	products,
	onQuantityChange,
	onDelete,
}: SelectedProductsTableProps) {
	//  hooks
	const { t } = useTranslation();
	console.log('from table', products);
	//  headers
	const headers = [
		{ title: t('Product & Category') },
		{ title: t('Quantity') },
		{ title: t('Price') },
		{ title: t('Actions') },
	];
	const { xs } = useResponsive();
	const calculateTotal = () => {
		return products.reduce((total, product) => total + product.price * (product.quantity || 1), 0);
	};

	if (!xs) {
		return (
			<>
				<BaseTable
					color='#55607A'
					headers={headers.map((h) => h)}
					rows={products.map((item) => ({
						item,
						elements: [
							<TableCell>
								<ProductCategory product={item} />
							</TableCell>,
							<TableCell>
								<FormField
									formStore={formStore}
									name='quantity'
									render={(field) => (
										<Input
											{...field}
											type='number'
											min='1'
											value={item.quantity || 1}
											onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value, 10))}
										/>
									)}
								/>
							</TableCell>,
							<TableCell>
								<p className='text-title text-sm'>SAR {item.price}.00</p>
							</TableCell>,
							<TableCell>
								<button onClick={() => onDelete(item.id)}>
									<RemoveIcon className='fill-pri-dark' />
								</button>
							</TableCell>,
						],
					}))}
				/>
				<div className='flex items-center justify-between'>
					<p className='paragraph text-subtitle uppercase'>{t('Total')}:</p>
					<p className='text-title text-sm'>SAR {calculateTotal()}.00</p>
				</div>
			</>
		);
	}
	return (
		<div className='grid gap-3 divide-y'>
			{products.map((item, index) => (
				<section key={index} className='grid gap-3'>
					<ProductCategory product={item} />
					<div className='flex items-center justify-between' >
						<FormField
						container={{ className: 'w-[5.2rem]' }}
							formStore={formStore}
							name='quantity'
							render={(field) => (
								<Input
									{...field}
									type='number'
									min='1'
									value={item.quantity || 1}
									onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value, 10))}
								/>
							)}
						/>
						<button onClick={() => onDelete(item.id)}>
							<RemoveIcon className='fill-pri-dark' />
						</button>
						<p className='text-title text-sm'>SAR {item.price}.00</p>
					</div>
				</section>
			))}
			<section className='flex items-center justify-between'>
				<p className='paragraph text-subtitle uppercase'>{t('Total')}:</p>
				<p className='text-title text-sm'>SAR {calculateTotal()}.00</p>
			</section>
		</div>
	);
}

const ProductCategory = ({ product }: { product: Product }) => (
	<div className='flex gap-2'>
		<div className='size-11 rounded-md overflow-hidden flex-shrink-0'>
			<img
				src={getImageUrl(product.imageUrl)}
				alt={product.name}
				className='size-full object-cover'
			/>
		</div>
		<div className='grid place-content-between'>
			<h2 className='title text-sm'>
				{product.name}
				{product.selectedOptions && (
					<span className='paragraph text-subtitle'>
						{' / '}
						{product.selectedOptions.color}
						{' / '}
						{product.selectedOptions.size}
					</span>
				)}
			</h2>
			<p className='paragraph text-subtitle'>{product.category}</p>
		</div>
	</div>
);
