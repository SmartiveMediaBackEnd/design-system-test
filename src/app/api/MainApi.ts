import axios from 'axios';
import PublicHandlingErrors from '../utils/AxiosUtils/PublicHandlingErrors';

//  get url from saved domain
let custom_Basic_Url: string | null | undefined = 'my.dookan.net';

if (typeof window !== 'undefined') {
    custom_Basic_Url = localStorage.getItem('domain');
    
}

export const baseUrl = `https://${custom_Basic_Url}/api/v1/`;



const MainApi = axios.create({
	baseURL: baseUrl,
});

MainApi.interceptors.request.use(
	function (config) {
		let token = undefined;
		let language = undefined;

		if (typeof window !== 'undefined') {
			token = localStorage.getItem('token');
			language = localStorage.getItem('language');
		}

		if (token) config.headers.authorization = `Bearer ${token}`;
		// if (language) config.headers['Accept-Language'] = language;

		// config.headers["Content-Type"] = "application/x-www-form-urlencoded";

		// config.headers['Content-Type'] = 'application/json';
		// application/json;charset=utf-8
		// config.headers['Accept'] = 'application/json';
		// config.headers['Access-Control-Allow-Origin'] = '*';
		// config.headers['Access-Control-Allow-Methods'] = '*';
		// config.headers['Access-Control-Allow-Headers'] = '*';
		if (!config.params) {
			config.params = {};
		}
		config.params['locale'] = language;
		config.params['accept_token'] = true;
		return config;
	},
	function (error) {
		// Do something with request error
		return PublicHandlingErrors.onErrorResponse(error);
	},
);

export default MainApi;

























///////////***************************************************** */
// import axios from 'axios';
// import PublicHandlingErrors from '../utils/AxiosUtils/PublicHandlingErrors';

// //  get url from saved domain
// let custom_Basic_Url: string | null | undefined= 'my.dookan.net';

// if (typeof window !== 'undefined') {
//     custom_Basic_Url = localStorage.getItem('domain') || 'my.dookan.net';
// }

// export const baseUrl = `https://${custom_Basic_Url}/api/v1/admin`;

// const MainApi = axios.create({
// 	baseURL: baseUrl,
// });



// MainApi.interceptors.request.use(
//     function (config) {
//         let token = undefined;
// 		let language = undefined;

// 		if (typeof window !== 'undefined') {
// 			token = localStorage.getItem('token');
// 			language = localStorage.getItem('language');
// 		}

//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         if (language) {
//             config.params = config.params || {};
//             config.params['locale'] = language;
//         }
//         config.params = config.params || {};
//         config.params['accept_token'] = true;

//         return config;
//     },
//     function (error) {
//         // التعامل مع أخطاء الطلب
//         return PublicHandlingErrors.onErrorResponse(error);
//     },
// );

// export default MainApi;





////////////////////////////////////////////////////////////////

// import axios from 'axios';
// import PublicHandlingErrors from '../utils/AxiosUtils/PublicHandlingErrors';

// // Get URL from saved domain or default to 'my.dookan.net'
// let custom_Basic_Url = '';

// if (typeof window !== 'undefined') {
//     custom_Basic_Url = localStorage.getItem('domain') || 'my.dookan.net';
// }

// export const baseUrl = `https://${custom_Basic_Url}/api/v1/admin`;

// const MainApi = axios.create({
//     baseURL: baseUrl,
// });

// MainApi.interceptors.request.use(
//     function (config) {
//         const token = localStorage.getItem('token');
//         const language = localStorage.getItem('language');

//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }

//         if (language) {
//             config.params = config.params || {};
//             config.params['locale'] = language;
//         }

//         config.params = config.params || {};
//         config.params['accept_token'] = true;

//         return config;
//     },
//     function (error) {
//         return PublicHandlingErrors.onErrorResponse(error);
//     },
// );

// export default MainApi;
