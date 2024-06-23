import useCheckOtp from './useCheckOtp';
import { Form } from 'src/app/components/ui/form';
import { Input } from 'src/app/components/ui/input';
import { Button } from 'src/app/components/optimized';
import FormField from 'src/app/components/ui/form/field';
import OtpTimer from 'src/pages/AuthPage/RegisterLayout/OtpTimer';

interface CheckCodeProps {
	usePhone: boolean;
	setIsVerified: (isVerified: boolean) => void;
}

export default function CheckOtpCode({ usePhone, setIsVerified }: CheckCodeProps) {
	const { formStore, onSubmit, timer, isResendVisible, resetTimer } = useCheckOtp({
		setIsVerified,
	});

	const handleResend = () => {
		resetTimer();
		// onResend();
	};

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='grid w-full'>
				<h2 className='title text-2xl mb-6'>Check your {usePhone ? 'phone' : 'email'}</h2>
				<OtpTimer timer={timer} isResendVisible={isResendVisible} handleResend={handleResend} />
				<FormField
					container={{ className: 'mt-11 mb-4' }}
					formStore={formStore}
					name='otp'
					render={(field) => <Input {...field} placeholder='OTP code' />}
				/>
				<div className='flex justify-end'>
					<Button variant='primary' type='submit' text='Verify' className='w-36' />
				</div>
			</form>
		</Form>
	);
}
