import { useEffect } from 'react';
import { useForm } from 'src/app/utils/hooks/form';
import { z } from 'zod';

export interface IdentifierFormProps {
	setStep: (step: number) => void;
	onIdentifierChange: (Identifier: string) => void;
	setEmail: (e: string) => void;
}
const schemas = {
	emailOrPhone: z.string().min(1, { message: 'Input is required' }),
};

export default function useIdentifierForm({
	setStep,
	onIdentifierChange,
	setEmail,
}: IdentifierFormProps) {
	const { formStore, onSubmit } = useForm({
		schema: schemas,
		handleSubmit: (values: { emailOrPhone: string }) => {
			setStep(2);
			setEmail(values.emailOrPhone);
		},
		defaultValues: { emailOrPhone: '' },
	});

	useEffect(() => {
		const subscription = formStore.watch((value) => {
			const emailOrPhoneValue = value.emailOrPhone ?? '';
			onIdentifierChange(emailOrPhoneValue);
		});
		return () => subscription.unsubscribe();
	}, [formStore.watch('emailOrPhone'), onIdentifierChange]);

	return { formStore, onSubmit };
}
