import { InputRow } from 'src/app/components/optimized';
import { AiOutlinePercentage } from 'react-icons/ai';
import useDiscountForm from '../../comp/useDiscountForm';

// import { useEffect } from "react";
const DiscountTypesOptions = ({ discountType }) => {
	const {
		percentage,
		setPercentage,
		fixedAmount,
		setFixedAmount,
		fixedAmountRef
	} = useDiscountForm();

	console.log('percentage', percentage);
	console.log('fixedAmount', fixedAmount);
	// useEffect(() => {
	//   localStorage.setItem("fixedAmount", fixedAmount);
	// }, [fixedAmount]);

	return (
		<div>
			{discountType === 'Percentage' && (
				<div className='w-[390px] mt-[18px]'>
					<InputRow
						label='Discount'
						leftIcon={<AiOutlinePercentage />}
						id='percentage'
						value={percentage}
						handleOnChange={setPercentage}
					/>
				</div>
			)}
			{discountType === 'Fixed amount' && (
				<div className='w-[390px] mt-[18px]'>
					<InputRow
						label='Discount'
						id='fixedAmount'
						value={fixedAmount}
						handleOnChange={setFixedAmount}
						_ref={fixedAmountRef.current}
					/>
				</div>
			)}
			{discountType === 'Free shipping' && (
				<h1 className='mt-[18px]'>Free shipping</h1>
			)}
		</div>
	);
};

export default DiscountTypesOptions;
