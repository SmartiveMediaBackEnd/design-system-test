import { NotifiIcon } from 'src/app/utils/icons';
import NotificationsCard from '../Cards/NotificationsCard';
import Button from '@mui/material/Button';
import { useState } from 'react';

/**
 * NotificationBtn component represents a button that, when clicked, displays a notification icon
 * and opens the notifications card when clicked.
 */
const NotificationBtn = () => {
	const [show, setShow] = useState(false);

	return (
		<>
			{/* Notification icon button */}
			<Button onClick={() => setShow(true)}>
				<button className='rounded-lg border border-light-2 size-[42px] grid place-content-center relative'>
					{/* Notification dot */}
					<span className='absolute p-1 rounded-full bg-error top-1 right-1'></span>
					<NotifiIcon />
				</button>
			</Button>

			{/* Display NotificationsCard when show state is true */}
			{show && <NotificationsCard onClose={() => setShow(false)} />}
		</>
	);
};

export default NotificationBtn;
