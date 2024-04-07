import { useState } from 'react';
import { DownIcon, UpIcon } from 'src/app/utils/icons';

export default function Accordion() {
	const [open, setOpen] = useState(false);

	return (
		<div
			className={` w-[365px] rounded p-4 border border-constrained hover:border-secondary transition-all ease-linear ${
				open ? ' bg-sec-light' : 'bg-white'
			}`}
		>
			<div className='flex justify-between'>
				<h3 className='font-semibold text-title'>Do we ship goods?</h3>
				<button className='transition-all duration-300 ease-linear' onClick={() => setOpen(!open)}>
					{open ? <UpIcon className='fill-hint' /> : <DownIcon className='fill-hint' />}
				</button>
			</div>

			{open ? (
				<p className='pt-4 transition-all duration-500 ease-linear text-subtitle '>Yes we do that exactly</p>
			) : (
				''
			)}
		</div>
	);
}
