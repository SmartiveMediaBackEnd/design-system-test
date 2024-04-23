import { Outlet } from 'react-router-dom';
import { HorizontalTabsLink } from 'src/app/components/optimized';
import AnalyticsPageGard from './comp/AnalyticsPageGard';

const AnalyticsPage = () => {
	const tabs = ['overview', 'products', 'orders', 'customers', 'integrations'];

	return (
		<AnalyticsPageGard>
			<div className='sticky top-[70px] z-50'>
				<HorizontalTabsLink tabs={tabs} path='/analytics' />
			</div>
			{/* AnalyticsTabs Page */}
			<main className='page-container'>
				<Outlet />
			</main>
		</AnalyticsPageGard>
	);
};

export default AnalyticsPage;
{
	/* <main className='container'>
	<Outlet />
</main>; */
}
