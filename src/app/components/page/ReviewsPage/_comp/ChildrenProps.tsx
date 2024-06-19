import { nanoid } from 'nanoid';
import { GoStarFill } from 'react-icons/go';
import { Button } from 'src/app/components/optimized';
import MenuOptions from 'src/app/components/optimized/Menu/MenuOptions';
import Avatar from 'src/app/components/optimized/UiKits/Avatar';
import { getImageUrl } from 'src/app/utils';
import { AddFillIcon, EditIcon, MoreIcon, ReplyIcon, VectorIcon } from 'src/app/utils/icons';
import { LiaTrashAlt } from 'react-icons/lia';

import { RiCloseFill } from 'react-icons/ri';
const options = [
	{
		id: nanoid(),
		text: 'delete permanently',
		icon: <LiaTrashAlt size='28' className='fill-pri-dark' />,
	},
];

const optionsRemove = [
	{
		id: nanoid(),
		text: 'unpublish',
		icon: <RiCloseFill color='#032C58' />,
	},
	{
		id: nanoid(),
		text: 'delete permanently',
		icon: <LiaTrashAlt size='28' className='fill-pri-dark' />,
	},
];

// products reviews
export const HeaderCard = () => {
	return (
		<div className='flex-row-global gap-1'>
			<GoStarFill size={14} color='gold' />
			<h4 className='title text-sm'>4.3</h4>
			<p className='subtitle text-sm'>(500)</p>
		</div>
	);
};

export const BodyCard = ({
	setReply,
	submitReply,
	published,
	query,
}: {
	setReply: () => void;
	submitReply: boolean;
	published?: boolean;
	query?: boolean;
}) => {
	return (
		<div className='flex-row-global gap-4 cursor-pointer'>
			<MenuOptions
				btn={<MoreIcon className='fill-pri-dark' />}
				options={options}
				handle={() => console.log('')}
			/>
			{published || query
				? !submitReply && (
						<Button variant='secondary' LeftIcon={ReplyIcon} onClick={() => setReply(true)}>
							reply
						</Button>
				  )
				: !submitReply && (
						<>
							<Button variant='primary'>Publish</Button>
							<Button variant='secondary' LeftIcon={ReplyIcon} onClick={() => setReply(true)}>
								reply
							</Button>
						</>
				  )}
		</div>
	);
};

export const Children = ({
	setReply,
	setSubmitReply,
	query,
}: {
	setReply: () => void;
	setSubmitReply: () => void;
	query?: boolean;
}) => {
	const handleSubmit = () => {
		setReply(false);
		setSubmitReply(true);
	};

	const handleReply = () => {
		setReply(false);
		setSubmitReply(false);
	};
	return (
		<div className='p-5'>
			<input placeholder='erhyugtew' />
			<div className='flex-btn-end'>
				{query ? (
					<>
						<Button variant='tertiary' onClick={handleReply}>
							discard
						</Button>
						<Button variant='primary' onClick={handleSubmit}>
							submit
						</Button>
					</>
				) : (
					<>
						<Button variant='secondary' LeftIcon={ReplyIcon} onClick={handleReply}>
							submit reply
						</Button>
						<Button variant='primary' onClick={handleSubmit}>
							submit & publish
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

export const Publish = ({ setReply, query }: { setReply: () => void; query?: boolean }) => {
	return (
		<div className='p-5 pt-0 flex-col-top-section-pages gap-4'>
			<div className='p-3 cardDetails-sharedClass flex items-start justify-between'>
				<div className='flex-row-global gap-2'>
					<div>
						<Avatar variant='user' imageUrl={getImageUrl('product/product.png')} />
					</div>
					<div className='flex-col-top-section-pages gap-1'>
						<div className='flex-row-global gap-2'>
							<h3 className='title'>Fan Al Taalouq</h3>
							<p className='subtitle text-sm'>5/6/2021</p>
						</div>

						<div className='flex-row-global'>
							<p className='text-title text-sm'>Thanks for letting us know, </p>
							<Button variant='link'>Learn more</Button>
						</div>
					</div>
				</div>
				<div className='flex-row-global gap-4'>
					<MenuOptions
						btn={<LiaTrashAlt size='28' className='fill-pri-dark cursor-pointer' />}
						options={optionsRemove}
						handle={() => console.log('')}
					/>

					<button onClick={() => setReply(true)}>
						<EditIcon className='fill-pri-dark cursor-pointer' />
					</button>
				</div>
			</div>
			{query && (
				<div className='flex-btn-end'>
					<Button variant='secondary' LeftIcon={AddFillIcon}>
						add to product FAQ
					</Button>
				</div>
			)}
		</div>
	);
};

// asks and queries
export const HeaderAsksAnsQueries = () => {
	return (
		<div className='flex-row-global gap-1'>
			<VectorIcon className='fill-pri-dark cursor-pointer' />
			<h4 className='title text-sm'>50 queries</h4>
		</div>
	);
};
