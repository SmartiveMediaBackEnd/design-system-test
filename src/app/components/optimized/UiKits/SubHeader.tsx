import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { UseLanguage } from '../../../utils/hooks/LanguageHook';
import { useNavigate } from 'react-router-dom';

const SubHeader = ({ title, children }: { title: string; children?: React.ReactNode }) => {
	//  hooks
	const language = UseLanguage();
	const navigate = useNavigate();

	return (
		<div className='flex justify-between items-center shadow-sm py-4 px-2 bg-white '>
			<div className='flex items-center'>
				<button className='text-blue-600 mr-2' onClick={() => navigate(-1)}>
					{language === 'ar' ? <IoIosArrowForward /> : <IoIosArrowBack />}
				</button>
				<span className='title'>{title}</span>
			</div>
			{children && <div className='flex space-x-3 capitalize'>{children}</div>}
		</div>
	);
};
export default SubHeader;

{
	/* <SubHeader title={t('Email form')}>
  <Button onClick={() => {}} variant='primary'>Submit emails</Button>
</SubHeader> */
}

// =========================================
// General settings
// =========================================
// <SubHeader title={t('General settings')}>
//   <Button onClick={() => {}} variant='secondary'>Discard</Button>
//    <Button onClick={() => {}} variant='primary'>Save Changes</Button>
// </SubHeader>

// =========================================
// General settings
// =========================================
// import { RxDotsHorizontal } from "react-icons/rx";
// import { LuEye } from "react-icons/lu";
// import { MdCopyAll } from "react-icons/md";

//  <SubHeader title={t('General settings')}>
// 	<div className='flex space-x-3'>
// 		<Button onClick={() => {}}>
// 			<LuEye size='20' />
// 		</button>
// 		<Button onClick={() => {}}>
// 			<MdCopyAll size='20' />
// 		</button>
// 		<Button onClick={() => {}}>
// 			<RxDotsHorizontal size='20' />
// 		</button>
// 	</div>
// 	<Button onClick={() => {}} variant='secondary'>Discard</Button>
// 	<Button onClick={() => {}} variant='primary'>Save Changes</Button>
// </SubHeader>;

// =========================================
// Add New Customer
// =========================================

//  <SubHeader title={t('Add New Customer')}>
//     <Button onClick={() => {}} variant='tertiary'>Discard</Button>
//     <Button onClick={() => {}} variant='secondary'>Save & add new</Button>
//     <Button onClick={() => {}} variant='primary'>Save Changes</Button>
// </SubHeader>

// =========================================
// Customer Info
// =========================================

// import { FiEdit } from 'react-icons/fi';
// import { RxDotsHorizontal } from 'react-icons/rx';

// <SubHeader title={t('Customer Info')}>
// 	<Button onClick={() => {}}>
// 		<FiEdit size='20' />
// 	</button>
// 	<Button onClick={() => {}}>
// 		<RxDotsHorizontal size='20' />
// 	</button>
// </SubHeader>

// =========================================
// Order Details
// =========================================
// import { RxDotsHorizontal } from 'react-icons/rx';
// import { IoIosArrowForward } from 'react-icons/io';
// import { IoIosArrowBack } from 'react-icons/io';
// import { IoPrintOutline } from 'react-icons/io5';
// import { GrUpdate } from 'react-icons/gr';

// <SubHeader title={t('Order Details')}>
// 	<Button onClick={() => {}} variant='tertiary' LeftIcon={<GrUpdate />}>
// 		Update Status
// 	</Button>
// 	<Button onClick={() => {}} variant='tertiary' LeftIcon={<IoPrintOutline />}>
// 		Print Invoice
// 	</Button>
// 	<button onClick={() => {}}>
// 		<RxDotsHorizontal size='20' />
// 	</button>

// 	<div className='flex items-center '>
// 		<button onClick={() => {}} className='border p-2 flex items-center justify-center'>
// 			<IoIosArrowBack />
// 		</button>
// 		<button onClick={() => {}} className='border p-2 flex items-center justify-center'>
// 			<IoIosArrowForward />
// 		</button>
// 	</div>
// </SubHeader>;
