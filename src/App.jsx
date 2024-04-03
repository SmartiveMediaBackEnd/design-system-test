import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AppsPage,
  HomePage,
  StorePage,
  ErrorPage,
  PagesPage,
  OrdersPage,
  ReviewsPage,
  SettingsPage,
  ProductsPage,
  ServicesPage,
  AnalyticsPage,
  CustomersPage,
  MarketingPage,
  SocialAppDetails,
} from "src/pages";
import RootLayout from "./pages/RootLayout";
import { MarketingConfig, MarketingTabs } from "./pages/MarketingPage/comp";
import { UseLanguage } from "./app/components/CustomHook/LanguageHook";
import { useEffect } from "react";
import i18n from "./app/language/i18n";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/apps", element: <AppsPage /> },
      { path: "/pages", element: <PagesPage /> },
      { path: "/store", element: <StorePage /> },
      { path: "/orders", element: <OrdersPage /> },
      { path: "/reviews", element: <ReviewsPage /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/customers", element: <CustomersPage /> },
      {
        path: "/marketing",
        element: <MarketingPage />,
        children: [{ path: ":tab", element: <MarketingTabs /> }],
      },
      { path: "/analytics", element: <AnalyticsPage /> },
      { path: "/apps/:platform", element: <SocialAppDetails /> },
      { path: "/marketing/:tab/:config", element: <MarketingConfig /> },
    ],
  },
]);

const App = () => {

  const language = UseLanguage()
  useEffect(() => {

    language === "ar"
      ? i18n.changeLanguage("ar")
      : i18n.changeLanguage("en");

    document.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);
  return <RouterProvider router={router} />;
};

export default App;
