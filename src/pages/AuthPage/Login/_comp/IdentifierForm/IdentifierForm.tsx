import { Link } from 'react-router-dom';
import { Form } from 'src/app/components/ui/form';
import { Input } from 'src/app/components/ui/input';
import { Button } from 'src/app/components/optimized';
import FormField from 'src/app/components/ui/form/field';
import useIdentifierForm, { IdentifierFormProps } from './useIdentifierForm';
import { useTranslation } from 'react-i18next';

export default function IdentifierForm({
	setStep,
	onIdentifierChange,
	setEmail,
}: IdentifierFormProps) {
	const { formStore, onSubmit } = useIdentifierForm({
		setStep,
		onIdentifierChange,
		setEmail,
	});
	const { t } = useTranslation();

	return (
		<Form {...formStore}>
			<form className='w-full' onSubmit={onSubmit}>
				<FormField
					formStore={formStore}
					name='emailOrPhone'
					render={(field) => <Input {...field} placeholder={t('Email or phone')} />}
				/>
				<div className='flex  justify-end mt-2 mb-5'>
					<Link to='/forgot_password' className='paragraph text-primary'>
						{t('Forgot Password?')}
					</Link>
				</div>
				<div className='flex justify-end mb-11'>
					<Button type='submit' variant='primary' text={t('Next')} className='w-36' />
				</div>
				<p className='paragraph text-subtitle text-center'>
					{t("Don't have an account?")}&nbsp;
					<Link to='/register' className='font-semibold text-primary'>
						{t('Sign up')}
					</Link>
				</p>
			</form>
		</Form>
	);
}

////////////////////////////////////////

// import { Link, useNavigate } from 'react-router-dom';
// import { Form } from 'src/app/components/ui/form';
// import { Input } from 'src/app/components/ui/input';
// import { Button } from 'src/app/components/optimized';
// import FormField from 'src/app/components/ui/form/field';
// import useIdentifierForm, { IdentifierFormProps } from './useIdentifierForm';
// import { useTranslation } from 'react-i18next';
// import { toast } from 'react-toastify';
// import { AuthApi } from 'src/app/React-Query/authApi';
// import { useMutation } from 'react-query';

// export default function IdentifierForm({
// 	setStep,
// 	onIdentifierChange,
// 	setEmail,
// }: IdentifierFormProps) {
// 	const { formStore, onSubmit } = useIdentifierForm({
// 		setStep,
// 		onIdentifierChange,
// 		setEmail,
// 	});
// 	const { t } = useTranslation();
// 	const navigate = useNavigate();
// 	const { mutate } = useMutation(AuthApi.getSubdomain, {
// 		onSuccess: (response: any) => {
// 			toast.success('Account found. Redirecting to subdomain...');
// 			const subdomain = response.data;
// 			setTimeout(() => {
// 				window.location.href = `https://${subdomain}/admin/home`;
// 			}, 1500);
// 		},
// 		onError: () => {
// 			toast.error('Email not registered. Redirecting to registration...');
// 			navigate('/register');
// 		}
// 	});

// 	const handleFormSubmit = (values) => {
// 		const emailOrPhone = formStore.getFieldState('emailOrPhone').value;
// 		const sendingData = { ...values, emailOrPhone };

// 		mutate(sendingData);
// 	};

// 	return (
// 		<Form {...formStore}>
// 			<form className='w-full' onSubmit={onSubmit}>
// 				<FormField
// 					formStore={formStore}
// 					name='emailOrPhone'
// 					render={(field) => <Input {...field} placeholder={t('Email or phone')} />}
// 				/>
// 				<div className='flex justify-end mt-2 mb-5'>
// 					<Link to='/forgot_password' className='paragraph text-primary'>
// 						{t('Forgot Password?')}
// 					</Link>
// 				</div>
// 				<div className='flex justify-end mb-11'>
// 					<Button type='submit' variant='primary' text={t('Next')} className='w-36' onClick={handleFormSubmit}/>
// 				</div>
// 				<p className='paragraph text-subtitle text-center'>
// 					{t("Don't have an account?")}&nbsp;
// 					<Link to='/register' className='font-semibold text-primary'>
// 						{t('Sign up')}
// 					</Link>
// 				</p>
// 			</form>
// 		</Form>
// 	);
// }

/////////////////////////////////////////////////////////////////

// import { Link, useNavigate } from 'react-router-dom';
// import { Form } from 'src/app/components/ui/form';
// import { Input } from 'src/app/components/ui/input';
// import { Button } from 'src/app/components/optimized';
// import FormField from 'src/app/components/ui/form/field';
// import useIdentifierForm, { IdentifierFormProps } from './useIdentifierForm';
// import { useTranslation } from 'react-i18next';
// import { toast } from 'react-toastify';
// import { AuthApi } from 'src/app/React-Query/authApi';
// import { useMutation } from 'react-query';

// export default function IdentifierForm({
// 	setStep,
// 	onIdentifierChange,
// 	setEmail,
// }: IdentifierFormProps) {
// 	const { formStore, onSubmit } = useIdentifierForm({
// 		setStep,
// 		onIdentifierChange,
// 		setEmail,
// 	});
// 	const { t } = useTranslation();
// 	const navigate = useNavigate();

// 	const mutation = useMutation({
// 		mutationFn: AuthApi.getSubdomain,
// 		onSuccess: (response: any) => {
// 			toast.success(response.message);
// 			const subdomainArray = response.data;
// 			const subdomain = subdomainArray.length > 0 ? subdomainArray[0] : null;

// 			if (subdomain && typeof subdomain === 'string') {
// 				setTimeout(() => {
// 					window.location.href = `https://${subdomain}/admin/home`;
// 				}, 1500);
// 			} else {
// 				toast.error('Subdomain not found.');
// 				navigate('/register');
// 			}
// 		},
// 	});

// 	const handleFormSubmit = async (values: any) => {
// 		const emailOrPhone = values.emailOrPhone;
// 		const sendingData = { email: emailOrPhone };

// 		mutation.mutate(sendingData);
// 	};

// 	return (
// 		<Form {...formStore} >
// 			<form className='w-full' onSubmit={onSubmit}>
// 				<FormField
// 					formStore={formStore}
// 					name='emailOrPhone'
// 					render={(field) => <Input {...field} placeholder={t('Email or phone')} />}
// 				/>
// 				<div className='flex justify-end mt-2 mb-5'>
// 					<Link to='/forgot_password' className='paragraph text-primary'>
// 						{t('Forgot Password?')}
// 					</Link>
// 				</div>
// 				<div className='flex justify-end mb-11'>
// 					<Button onClick={handleFormSubmit} variant='primary' text={t('Next')} className='w-36' />
// 				</div>
// 				<p className='paragraph text-subtitle text-center'>
// 					{t("Don't have an account?")}&nbsp;
// 					<Link to='/register' className='font-semibold text-primary'>
// 						{t('Sign up')}
// 					</Link>
// 				</p>
// 			</form>
// 		</Form>
// 	);
// }

// ********** use redux *********//
// import { Link, useNavigate } from 'react-router-dom';
// import { Form } from 'src/app/components/ui/form';
// import { Input } from 'src/app/components/ui/input';
// import { Button } from 'src/app/components/optimized';
// import FormField from 'src/app/components/ui/form/field';
// import { useTranslation } from 'react-i18next';
// import { useAppDispatch, useAppSelector } from 'src/app/store';
// import { useForm } from 'src/app/utils/hooks/form';
// import { z } from 'zod';
// import { useEffect } from 'react';
// import { getSubdomain } from 'src/app/store/slices/subdomains/subdomainAsyncThunks';
// import { toast } from 'react-toastify';

// const schemas = {
// 	emailOrPhone: z.string().min(1, { message: 'Input is required' }),
// };

// export default function IdentifierForm() {
// 	const { t } = useTranslation();
// 	const navigate = useNavigate();
// 	const dispatch = useAppDispatch();
// 	const { subdomains } = useAppSelector((state) => state.subdomains);
// 	console.log('subdomainsvv', subdomains)
// 	const handleSubmitSubdomain = (values) => {
// 		const emailOrPhone = values.emailOrPhone;
// 		try {
// 			const action =  dispatch(getSubdomain(emailOrPhone));
// 			if (getSubdomain.fulfilled.match(action)) {
// 				const subdomainArray = action.payload.data;
// 				const subdomain = subdomainArray.length > 0 ? subdomainArray[0] : null;
// 				if (subdomain) {
// 					toast.success('Account found. Redirecting to subdomain...');
// 					setTimeout(() => {
// 						window.location.href = `https://${subdomain}/admin/home`;
// 					}, 1500);
// 				} else {
// 					toast.error('Email not registered. Redirecting to registration...');
// 					navigate('/register');
// 				}
// 			} else {
// 				toast.error('Failed to fetch subdomain.');
// 			}
// 		} catch (error) {
// 			toast.error('An error occurred while checking the subdomain.');
// 		}
// 	}
// 	const { formStore, onSubmit } = useForm({
// 		schema: schemas,
// 		handleSubmit: handleSubmitSubdomain,
// 		defaultValues: {
// 			emailOrPhone: '',
// 		},
// 	});

// 	return (
// 		<Form {...formStore}>
// 			<form className='w-full' onSubmit={onSubmit}>
// 				<FormField
// 					formStore={formStore}
// 					name='emailOrPhone'
// 					render={(field) => <Input {...field} placeholder={t('Email or phone')} />}
// 				/>
// 				<div className='flex justify-end mt-2 mb-5'>
// 					<Link to='/forgot_password' className='paragraph text-primary'>
// 						{t('Forgot Password?')}
// 					</Link>
// 				</div>
// 				<div className='flex justify-end mb-11'>
// 					<Button onClick={handleSubmitSubdomain} variant='primary' text={t('Next')} className='w-36' />
// 				</div>
// 				<p className='paragraph text-subtitle text-center'>
// 					{t("Don't have an account?")}&nbsp;
// 					<Link to='/register' className='font-semibold text-primary'>
// 						{t('Sign up')}
// 					</Link>
// 				</p>
// 			</form>
// 		</Form>
// 	);
// }
