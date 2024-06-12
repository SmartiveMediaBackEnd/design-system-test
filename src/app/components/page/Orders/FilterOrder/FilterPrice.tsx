import { useTranslation } from 'react-i18next';
import DropDownMenu from '../../../optimized/DropDownMenu';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
function valuetext(value: number) {
	return `${value}°C`;
}
export default function FilterPrice() {
	//  hooks
	const { t } = useTranslation();
	const [value, setValue] = useState<number[]>([20, 37]);

	const handleChange = (event: Event, newValue: number | number[]) => {
		setValue(newValue as number[]);
	};
	return (
		<DropDownMenu title={t('Price')}>
			<Slider
				getAriaLabel={() => 'Temperature range'}
				value={value}
				onChange={handleChange}
				valueLabelDisplay='auto'
				getAriaValueText={valuetext}
			/>
		</DropDownMenu>
	);
}
