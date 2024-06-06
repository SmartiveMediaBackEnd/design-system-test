import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons } from 'src/app/store/slices/marketing/coupons/couponsAsyncThunks';
import TopSectionDiscountAndCoupons from 'src/app/components/page/discount/TopSectionDiscountAndCoupons';
import CouponsTable from 'src/app/components/page/Coupons/CouponsTable';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';

const Coupons = () => {
	//  hooks
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { xs } = useResponsive();
	//  selectors
	const { isLoading, coupons, error } = useSelector((state) => state.coupons);

	//  call api to get coupons
	useEffect(() => {
		dispatch(getCoupons());
	}, [dispatch]);

	return (
		<div className='custom_container '>
			<div className='flex-col-top-section-pages '>
				{/*  top section */}
				<TopSectionDiscountAndCoupons addButton={t('add new coupon')} path='addCoupon' />
				{xs && <AddButtonMobile path='addCoupon' />}
				{/*  table section */}
				<CouponsTable coupons={coupons} isLoading={isLoading} />
			</div>
		</div>
	);
};

export default Coupons;
