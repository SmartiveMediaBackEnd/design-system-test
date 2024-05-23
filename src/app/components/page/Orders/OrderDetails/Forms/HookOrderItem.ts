import { z } from 'zod';

export interface IOrderItemForm {
	quantity: number;
	discount?: number;
	shipping?: number;
}

export default function useOrderItemForm() {
	const handelDefaultValue = () => {
		return {
			quantity: 0,
			discount: 0,
			shipping: 0,
		};
	};

	const orderItemSchema = {
		quantity: z.coerce.number().min(1),
		discount: z.coerce.number().min(1).optional(),
		shipping: z.coerce.number().min(1).optional(),
	};

	return {
		handelDefaultValue,
		orderItemSchema,
	};
}
