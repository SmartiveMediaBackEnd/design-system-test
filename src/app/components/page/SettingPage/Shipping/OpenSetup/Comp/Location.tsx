import { useTranslation } from 'react-i18next';
import { Button } from 'src/app/components/optimized';
import { EditIcon, RemoveIcon, ViewIcon } from 'src/app/utils/icons';

interface LocationDataItem {
	id: number;
	title: string;
	location: string;
	city: string;
	country: string;
	phone: string;
	main: boolean;
}

interface LocationProps {
	data: LocationDataItem[];
}

export default function Location({ data }: { data: LocationProps }) {
	const { t } = useTranslation();
	return (
		<>
			{data.map((item: LocationDataItem) => {
				const { id, title, location, city, country, phone, main } = item;
				return (
					<div key={id} className='cardDetails-sharedClass p-3 flex justify-between'>
						<div className='text-xs text-title flex flex-col gap-0.5'>
							<div className='flex items-center gap-2'>
								<h4 className='text-title font-semibold text-sm'>{title}</h4>
								{main && (
									<span className='bg-borders-lines text-xs text-subtitle p-1.5'>{t('Main')}</span>
								)}
							</div>
							<p>{location}</p>
							<p>{city}</p>
							<p className='text-subtitle'>{country}</p>
							<p>+{phone}</p>
						</div>

						<div className='flex flex-col justify-between py-1'>
							<div className='flex items-center justify-end gap-5 '>
								<RemoveIcon className='fill-pri-dark cursor-pointer' />

								<EditIcon className='fill-pri-dark cursor-pointer' />
							</div>
							<Button variant='tertiary' LeftIcon={ViewIcon}>
								{t('view inventory')}
							</Button>
						</div>
					</div>
				);
			})}
		</>
	);
}
