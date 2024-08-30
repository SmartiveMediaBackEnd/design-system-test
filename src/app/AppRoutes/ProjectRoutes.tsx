import LoginPage from 'src/pages/AuthPage/Login/LoginPage';
import { PagesRoutes } from './ProjectRoutesData';
import { Navigate, Outlet, Route } from 'react-router-dom';
import RegistrationPage from 'src/pages/AuthPage/Registration/RegistrationPage';
import ForgotPassword from 'src/pages/AuthPage/ForgotPassword/ForgotPassword';
import { ErrorPage, HomePage } from 'src/pages';
import RootLayout from 'src/pages/RootLayout';
import AnimatedRoutes from '../navigation/animated-routes.component';

const currentUrl = window.location.href;
const conditionPath = currentUrl.includes('my.dookan.net') || currentUrl.includes('localhost');
export const conditionLocal = currentUrl.includes('localhost');

const ProjectRoutes = () => {
	const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

	const PrivateRoutesProject = () => {
		return token ? <Outlet /> : <Navigate to='/login' />;
	};

	const PublicRoutes = () => {
		return !token ? <Outlet /> : <Navigate to='/home' />;
	};

	return (
		<AnimatedRoutes>
			<Route element={<PublicRoutes />}>
				{/* <Route path='/' element={<HomePage />} /> */}
				<Route path='/' element={<Navigate to={token ? '/home' : '/login'} />} />
				{conditionPath && <Route path='/register' element={<RegistrationPage />} />}
				<Route path='/login' element={<LoginPage />} />
				<Route path='/forgot_password' element={<ForgotPassword />} />
			</Route>

			<Route element={<PrivateRoutesProject />}>
				{PagesRoutes.map((route) => {
					if (route?.children && route?.children?.length > 0) {
						return (
							<Route
								key={route.path}
								path={route.path}
								// path={conditionLocal ? `admin${route.path}` : route.path}
								element={<RootLayout>{route.element}</RootLayout>}
							>
								{route.children?.map((e) => (
									<Route key={e.path} 
									path={e.path}
									// path={conditionLocal ? `admin${e.path}` : e.path}
									element={e.element} />
								))}
							</Route>
						);
					} else {
						return (
							<Route
								key={route.path}
								path={route.path}
								// path={conditionLocal ? `admin${route.path}` : route.path}
								element={<RootLayout>{route.element}</RootLayout>}
							/>
						);
					}
				})}
			</Route>

			<Route path={'/*'} element={<ErrorPage />} />
			{/* <Route path={conditionLocal ? 'admin/*' : '/*'} element={<ErrorPage />} /> */}
		</AnimatedRoutes>
	);
};

export default ProjectRoutes;
/////////////////////////////////////////////////////

// import LoginPage from 'src/pages/AuthPage/Login/LoginPage';
// import { PagesRoutes } from './ProjectRoutesData';
// import { Navigate, Outlet, Route } from 'react-router-dom';
// import RegistrationPage from 'src/pages/AuthPage/Registration/RegistrationPage';
// import ForgotPassword from 'src/pages/AuthPage/ForgotPassword/ForgotPassword';
// import { ErrorPage, HomePage } from 'src/pages';
// import RootLayout from 'src/pages/RootLayout';
// import AnimatedRoutes from '../navigation/animated-routes.component';

// const ProjectRoutes = () => {
// 	const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
// 	const currentUrl = window.location.href;

// 	// Function to check if the current domain is the main domain
// 	const isMainDomain = () => {
// 		return currentUrl.includes('my.dookan.net');
// 	};

// 	// Function to check if the current domain is localhost
// 	const isLocalhost = () => {
// 		return currentUrl.includes('localhost');
// 	};

// 	// Public routes for login, register, and forgot_password
// 	const PublicRoutes = () => {
// 		if (isMainDomain() || isLocalhost()) {
// 			return !token ? <Outlet /> : <Navigate to='/admin/home' />;
// 		}
// 		return <Navigate to='/admin/home' />;
// 	};

// 	// Private routes for authenticated users
// 	const PrivateRoutesProject = () => {
// 		if (!isMainDomain()) {
// 			return token ? <Outlet /> : <Navigate to='/login' />;
// 		}
// 		return <Navigate to='/login' />;
// 	};

// 	return (
// 		<AnimatedRoutes>
// 			<Route element={<PublicRoutes />}>
// 				{/* Routes for login, registration, and forgot_password */}
// 				<Route path='/' element={<HomePage />} />
// 				{(isMainDomain() || isLocalhost()) && <Route path='/register' element={<RegistrationPage />} />}
// 				<Route path='/login' element={<LoginPage />} />
// 				<Route path='/forgot_password' element={<ForgotPassword />} />
// 			</Route>

// 			<Route element={<PrivateRoutesProject />}>
// 				{/* Protected routes for subdomain */}
// 				{PagesRoutes.map((route) => {
// 					if (route?.children && route?.children?.length > 0) {
// 						return (
// 							<Route
// 								key={route.path}
// 								path={route.path}
// 								element={<RootLayout>{route.element}</RootLayout>}
// 							>
// 								{route.children?.map((e) => (
// 									<Route key={e.path} path={e.path} element={e.element} />
// 								))}
// 							</Route>
// 						);
// 					} else {
// 						return (
// 							<Route
// 								key={route.path}
// 								path={route.path}
// 								element={<RootLayout>{route.element}</RootLayout>}
// 							/>
// 						);
// 					}
// 				})}
// 			</Route>

// 			{/* Other Routes */}
// 			<Route path='/*' element={<ErrorPage />} />
// 		</AnimatedRoutes>
// 	);
// };

// export default ProjectRoutes;
