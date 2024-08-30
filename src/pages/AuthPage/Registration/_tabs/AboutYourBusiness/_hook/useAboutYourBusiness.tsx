import { z } from 'zod';
import { useForm } from 'src/app/utils/hooks/form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import PublicHandlingErrors from 'src/app/utils/AxiosUtils/PublicHandlingErrors';
import { AuthApi } from 'src/app/React-Query/authApi';
import Cookies from 'js-cookie';

export interface AboutYourBusinessInterface {
	name: string;
	username: string;
	industry: string;
	agreementTerms: boolean;
	email?: string;
	mobile?: string;
	admin_name?: string;
	password?: string;
}
// ///////////////////////////////////////
// ///////////////////////////////////////
const aboutYourBusinessSchema = {
	name: z.string().min(3, 'Store name is required'),
	username: z.string().min(3, 'Store link is required'),
	industry: z.string().min(3, 'Industry is required'),
	agreementTerms: z.boolean().refine((val) => val, 'You must agree to the terms and conditions'),
};
// //////////////////////////////
// /////////////////////////////
const handleDefaultValue = (): AboutYourBusinessInterface => ({
	name: '',
	username: '',
	industry: '',
	agreementTerms: false,
});
// /////////////////////////////
///////////////////////////////
export default function useAboutYourBusiness({ onFinish }: { onFinish: () => void }) {
	const { t } = useTranslation();
	//  get user info data from localstorage
	let userInfoData = {
		email: '',
		admin_name: '',
		mobile: '',
		password: '',
	};
	if (typeof window !== 'undefined') {
		userInfoData = JSON.parse(localStorage.getItem('userInfoData') as any);
	}
	//  linking with api
	const { mutate, isLoading, error } = useMutation('sign-up', AuthApi.signUp_secondStep);


const handleSubdomainRedirection = () => {
    const currentDomain = localStorage.getItem('domain');
    if (currentDomain) {
        const subdomain = currentDomain.split('.')[0];
        const redirectUrl = `https://${subdomain}.dookan.net/admin/home`;
        window.location.href = redirectUrl;
    }
};



const handleSubmit = (values: AboutYourBusinessInterface) => {
	let domain = localStorage.getItem('domain') || '';
	let token = localStorage.getItem('token') || '';

	let SendingData = {
		...values,
		...userInfoData,
		domain,
		token,
	};

	console.log("Sending Data:", SendingData);

	const currentUrl = window.location.href;

	mutate(SendingData, {
		onSuccess: async (response) => {
			console.log("API Response:", response);
			onFinish();

			const responseToken = response?.data?.data?.token;
			const responseDomain = response?.data?.data?.data?.company?.domain;
			const responsePanelUrl = response?.data?.data?.merchant_url?.panel;

			localStorage.setItem('token', responseToken);
			localStorage.setItem('domain', responseDomain);

			Cookies.set('token', responseToken, { domain: '.dookan.net', path: '/' });
			Cookies.set('domain', responseDomain, { domain: '.dookan.net', path: '/' });

			toast.success(response?.data?.message);

			if (responsePanelUrl) {
				if(currentUrl.includes('localhost')){
					window.location.href = 'http://localhost:5173';
				} else {
					window.location.href = responsePanelUrl; // for production
				}
				 
			}
			
		},
		onError: PublicHandlingErrors.onErrorResponse,
	});
};


	// /////////////////
	// ////////////////
	const industryOptions = [
		{ value: 'fashion', label: t('Fashion') },
		{ value: 'electronics', label: t('Electronics') },
		{ value: 'groceries', label: t('Groceries') },
	];
	const { formStore, onSubmit } = useForm({
		schema: aboutYourBusinessSchema,
		handleSubmit: handleSubmit,
		defaultValues: handleDefaultValue(),
	});

	return { formStore, onSubmit, industryOptions, isLoading };
}



	// const handleSubmit = (values: AboutYourBusinessInterface) => {
	// 	let SendingData = {
	// 		...values,
	// 		...userInfoData,
	// 	};
	// 	//Perform verification before moving to the next step
	// 	mutate(SendingData, {
	// 		onSuccess: async (response) => {
	// 			onFinish();
	// 			localStorage.setItem('token', response?.data?.data?.token);
	// 			localStorage.setItem('domain', response?.data?.data?.data?.company?.domain);
	// 			toast.success(response?.data?.message);
	// 		},
	// 		onError: PublicHandlingErrors.onErrorResponse,
	// 	});
	// };
/////////////////////////////////////////////////////////////////////////////////////////
	// const handleSubmit = (values: AboutYourBusinessInterface) => {
	// 	let domain = localStorage.getItem('domain') || ''; 
	
	// 	let SendingData = {
	// 		...values,
	// 		...userInfoData,
	// 		domain, 
	// 	};
	
	// 	console.log("Sending Data:", SendingData); 
	
	// 	mutate(SendingData, {
	// 		onSuccess: async (response) => {
	// 			console.log("API Response:", response);
	// 			onFinish();
	// 			localStorage.setItem('token', response?.data?.data?.token);
	// 			localStorage.setItem('domain', response?.data?.data?.data?.company?.domain);
	// 			toast.success(response?.data?.message);
	
	// 			const clientUrl = response?.data?.data?.merchant_url?.client; 
	// 			if (clientUrl) {
	// 				window.location.href = clientUrl; 
	// 			}
	// 		},
	// 		onError: PublicHandlingErrors.onErrorResponse,
	// 	});
	// };
	///////////////////////////////////////////////////////////////////////////////



// const handleSubmit = (values: AboutYourBusinessInterface) => {
//     let domain = localStorage.getItem('domain') || ''; 

//     let SendingData = {
//         ...values,
//         ...userInfoData,
//         domain, 
//     };

//     console.log("Sending Data:", SendingData); 

//     mutate(SendingData, {
//         onSuccess: async (response) => {
//             console.log("API Response:", response);
//             onFinish();
            
//             Cookies.set('token', response?.data?.data?.token, { domain: '.dookan.net', secure: true, sameSite: 'None' });
//             Cookies.set('domain', response?.data?.data?.data?.company?.domain, { domain: '.dookan.net', secure: true, sameSite: 'None' });

//             toast.success(response?.data?.message);

//             const clientUrl = response?.data?.data?.merchant_url?.client; 
//             if (clientUrl) {
//                 window.location.href = clientUrl; 
//             }
//         },
//         onError: PublicHandlingErrors.onErrorResponse,
//     });
// };
////////////////////////////////////////////////////