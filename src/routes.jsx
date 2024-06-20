import {
	AddCustomerGroup,
	AddCustomerPage,
	AddNewAddressCustomer,
	AddOrder,
	AnalyticsPage,
	AppsPage,
	AppsTabs,
	BillingAndPlans,
	Config,
	CustomerInfo,
	CustomersPage,
	EmailForm,
	HomePage,
	MarketingPage,
	Nested_pages_SettingsConfig,
	OrderDetails,
	OrdersPage,
	OrdersTabs,
	ProductsPage,
	ProductsTabs,
	ReviewsPage,
	ServicesPage,
	SettingsConfig,
	SettingsPage,
	SetupConfig,
	SetupOpenConfig,
	ShippingConfig,
	SocialAppDetails,
	StorePage,
} from 'src/pages';

import { AnalyticsTabs } from './pages/AnalyticsPage/_comp';
import { MarketingConfig, MarketingTabs } from './pages/MarketingPage/_comp';

import PagesConfig from './pages/PagesPage/_comp/PagesConfig';
import PagesPage from './pages/PagesPage/PagesPage';
import SuccessfullyPurchased from './pages/ServicesPage/_comp/PurchaseServices/_comp/SuccessfullyPurchased/SuccessfullyPurchased';
import PurchaseConfig from './pages/ServicesPage/_comp/PurchaseServices/_comp/PurchaseConfig';
import StoreTabs from './pages/StorePage/_comp/StoreTabs';
import StoreConfig from './pages/StorePage/_comp/StoreConfig';
import { SubCategories } from './pages/ProductsPage/tabs/Categories/_comp/subCategory/SubCategories';

import {
	BundleProductPage,
	ConfigurableProductPage,
	FoodProductPage,
	SimpleProductPage,
	VirtualProductPage,
} from './pages/ProductsPage/tabs/_comp';

// Route Definitions
export const routes = [
	{ path: '/', element: <HomePage /> },
	// reviews page
	{ path: '/reviews', element: <ReviewsPage /> },

	// services Routes
	{ path: '/services', element: <ServicesPage /> },
	{ path: '/services/:config', element: <PurchaseConfig /> },
	{ path: '/services/:config/:config', element: <SuccessfullyPurchased /> },

	// Customers Routes
	{
		path: '/customers',
		element: <CustomersPage />,
	},
	{
		path: '/customers/:id',
		element: <CustomerInfo />,
	},
	{
		path: '/customers/:id/addNewAddresse',
		element: <AddNewAddressCustomer />,
	},
	{ path: '/customers/addCustomer', element: <AddCustomerPage /> },
	{ path: '/customers/addGroupCustomer', element: <AddCustomerGroup /> },
	// Apps Routes
	{
		path: '/apps',
		element: <AppsPage />,
		children: [
			{ path: ':tab', element: <AppsTabs /> },
			{ path: 'app_store/:platform', element: <SocialAppDetails /> },
		],
	},

	// Pages Routes
	{
		path: '/pages',
		element: <PagesPage />,
	},
	{
		path: '/pages/:config',
		element: <PagesConfig />,
	},

	// Orders Routes
	{
		path: '/orders',
		element: <OrdersPage />,
		children: [
			{
				path: ':tab',
				element: <OrdersTabs />,
			},
		],
	},
	// /orders/orderDetails/8965742
	{
		path: '/orders/orderDetails/:id',
		element: <OrderDetails />,
	},
	{
		path: '/order/addOrder',
		element: <AddOrder />,
	},

	// Products Routes
	{
		path: '/products',
		element: <ProductsPage />,
		children: [{ path: ':tab', element: <ProductsTabs /> }],
	},
	// '/products/new/configurable'
	{ path: '/products/new/configurable', element: <ConfigurableProductPage /> },
	// '/products/new/simple'
	{ path: '/products/new/simple', element: <SimpleProductPage /> },
	// '/products/new/virtual'
	{ path: '/products/new/virtual', element: <VirtualProductPage /> },
	// '/products/new/food'
	{ path: '/products/new/food', element: <FoodProductPage /> },
	// '/products/new/bundle'
	{ path: '/products/new/bundle', element: <BundleProductPage /> },

	// sub categories
	{
		path: '/products/categories/SubCategories',
		element: <SubCategories />,
	},
	// Settings Routes
	{
		path: '/settings',
		element: <SettingsPage />,
	},
	{
		path: '/settings/:config',
		element: <SettingsConfig />,
	},
	{
		path: '/settings/billing',
		element: <BillingAndPlans />,
	},
	{
		path: '/settings/:config/:nested_page',
		element: <Nested_pages_SettingsConfig />,
	},

	{
		path: '/settings/shipping/:config',
		element: <ShippingConfig />,
	},
	{
		path: '/settings/shipping/:config/:config',
		element: <Config />,
	},
	{
		path: '/settings/shipping/:config/:config/:setup',
		element: <SetupOpenConfig />,
	},
	{
		path: '/settings/shipping/:config/:config/:setup/:config',
		element: <SetupConfig />,
	},
	// Marketing Routes
	{
		path: '/marketing',
		element: <MarketingPage />,
		children: [
			{ path: ':tab', element: <MarketingTabs /> },
			{ path: ':tabName/:config', element: <MarketingConfig /> },
			{ path: 'email-form', element: <EmailForm /> },
		],
	},

	// store Routes
	{
		path: '/store',
		element: <StorePage />,
		children: [
			{ path: ':tab', element: <StoreTabs /> },
			{ path: ':tabName/:id', element: <StoreConfig /> },
		],
	},

	// Analytics Routes
	{
		path: '/analytics',
		element: <AnalyticsPage />,
		children: [{ path: ':tab', element: <AnalyticsTabs /> }],
	},
];
