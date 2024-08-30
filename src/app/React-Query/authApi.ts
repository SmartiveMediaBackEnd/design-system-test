import { UserInfoInterface } from 'src/pages/AuthPage/Registration/_tabs/AboutYourself/_comp/_hook/useUserInfoForm';
import { OtpVerificationInterface } from 'src/pages/AuthPage/Registration/_tabs/AboutYourself/_comp/_hook/UseOtpHook';
import { AboutYourBusinessInterface } from 'src/pages/AuthPage/Registration/_tabs/AboutYourBusiness/_hook/useAboutYourBusiness';
import MainApi from '../api/MainApi';
import { passwordSchemaForm } from 'src/pages/AuthPage/Login/_comp/PasswordForm/usePasswordForm';
import axios from 'axios';

const subdomain = localStorage.getItem('domain') || '';

console.log('subdomain', subdomain)

export const AuthApi = {
	signUp: (formData: UserInfoInterface) => { // done
		return axios.postForm(
			'https://my.dookan.net/api/v1/merchant/register/validate/step-one',
			formData,
		);
	},
	verify_otp: (formData: OtpVerificationInterface) => { // done
		return axios.postForm('https://my.dookan.net/api/v1/merchant/register/verify/mobile', formData);
	},
	send_code: (formData: OtpVerificationInterface) => { // done
		return axios.postForm(
			'https://my.dookan.net/api/v1/merchant/register/verify/mobile/send-code',
			formData,
		);
	},
	signUp_secondStep: (formData: AboutYourBusinessInterface) => { // done
		return axios.postForm(
			'https://my.dookan.net/api/v1/merchant/register/validate/step-tow',
			formData,
		);
	},
	login: (formData: passwordSchemaForm) => {
		return MainApi.postForm(`https://${subdomain}.dookan.net/api/v1/merchant/login`, formData);
	},
	getSubdomain: (formData: passwordSchemaForm) => {
		const { email } = formData;
		return MainApi.get(`https://my.dookan.net/api/v1/merchant/get-domain`, {
			params: { email }
		});
	},
	// login: async (formData: passwordSchemaForm) => {
	// 	const url = `https://${subdomain}.dookan.net/api/v1/merchant/login`;
	// 	try {
	// 		console.log("Login URL:", url);
	// 		const response = await MainApi.postForm(url, formData);
	// 		return response;
	// 	} catch (error) {
	// 		console.error("Login Error:", error);
	// 		throw error;
	// 	}
	// },

	logout: () => {
		return MainApi.delete('admin/logout');
	},
};
