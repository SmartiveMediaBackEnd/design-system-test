// import ThreeDotsButton from "src/app/components/optimized/Buttons/ThreedotsButton";
// import AttributesHeader from "./_comp/AttributesHeader"
// import AttributesTable from "./_comp/AttributesTable"
// import { UseDeleteItem } from "src/app/utils/hooks/CustomDelete";
// import { EditIcon } from 'src/app/utils/icons';
// import { LiaTrashAlt } from 'react-icons/lia';
// import useSelectBox from "src/app/components/optimized/Menu/useSelectBox";
// import { useAppDispatch, useAppSelector } from "src/app/store";
// import { useEffect, useMemo, useState } from "react";
// import { deleteAllAttributesAction, deleteAttribute, getAttributes } from "src/app/store/slices/Attributes/Attribute/attributeAsyncThunks";
// import { useNavigate } from "react-router-dom";
// import PopupDelete from "src/app/components/optimized/Popups/PopupDelete";
// import { useTranslation } from "react-i18next";
// import toast from 'react-hot-toast';
// import { addAttributeInterface } from "./_hook/HookAddAttributes";

// const Attributes = () => {
// 	const dispatch = useAppDispatch();
// 	const navigate = useNavigate();
// 	const { t } = useTranslation();
// 	const { attributesList, isLoading } = useAppSelector((state) => state.attributesProducts);


// 	const { selectedOption, handleSelect, setSelectedOption } = useSelectBox();

// 	// arrange data
// 	const [sortedAttributes, setSortedAttributes] = useState<addAttributeInterface[]>([]);

// 	useEffect(() => {
// 		dispatch(getAttributes());
// 	}, [dispatch]);

// 	useEffect(() => {
// 		if (selectedOption === 'Name A to Z') {
// 			setSortedAttributes([...attributesList].sort((a, b) => a.admin_name.localeCompare(b.admin_name)));
// 		} else if (selectedOption === 'Name Z to A') {
// 			setSortedAttributes([...attributesList].sort((a, b) => b.admin_name.localeCompare(a.admin_name)));
// 		} else {
// 			setSortedAttributes(attributesList);
// 		}
// 	}, [selectedOption]);



// 	const options = [
// 		{
// 			id: '1',
// 			text: 'edit',
// 			icon: <EditIcon className='fill-title' />,
// 		},
// 		{
// 			id: '2',
// 			text: 'delete',
// 			icon: <LiaTrashAlt size='28' className='fill-error' />,
// 		},
// 	];

// 	const {
// 		openDeleteDialog,
// 		custom_Id,
// 		handelCloseDeleteDialog,
// 		handelId,
// 		handelOpenDialog,
// 	} = UseDeleteItem();

// 	const handelDeleteAttribute = () => {
// 		dispatch(deleteAttribute(custom_Id)).then((promiseResponse: any) => {
// 			if ((promiseResponse.payload.code = 200)) {
// 				handelCloseDeleteDialog();
// 				dispatch(getAttributes());
// 			}
// 		});
// 	};

// 	const handelDeleteAllAttribute = () => {
// 		dispatch(deleteAllAttributesAction(code)).then((promiseResponse: any) => {
// 			if ((promiseResponse.payload.code = 200)) {
// 				handelCloseDeleteDialog();
// 				dispatch(getAttributes());
// 			}
// 		});
// 	};

// 	useMemo(() => {
// 		switch (selectedOption) {
// 			case 'delete':
// 				handelOpenDialog();
// 				setSelectedOption('');
// 				break;
// 			case 'edit':
// 				setSelectedOption('');
// 				custom_Id && navigate(`add-attribute?id=${custom_Id}`);
// 				break;
// 			case 'Delete all attributes':
// 				attributesList?.length > 0
// 					? dispatch(deleteAllAttributesAction({ indexes: code })).then(
// 						(promiseResponse: any) => {
// 							if ((promiseResponse.payload.code = 200)) {
// 								dispatch(getAttributes());
// 							}
// 						},
// 					)
// 					: toast.error('There are no data to delete it');
// 				setSelectedOption('');
// 				break;
// 		}
// 	}, [selectedOption, custom_Id]);

// 	return (
// 		<div className='flex-col-global gap-2 px-5'>
// 			<AttributesHeader />
// 			<hr />
// 			<AttributesTable handelId={handelId} data={sortedAttributes} isLoading={isLoading}>
// 				<ThreeDotsButton
// 					sortMenus={options}
// 					selectedOption={selectedOption}
// 					handelSelect={handleSelect}
// 				/>
// 			</AttributesTable>

// 			{/* openDeleteDialog */}
// 			{openDeleteDialog && (
// 				<PopupDelete
// 					open={openDeleteDialog}
// 					onClose={handelCloseDeleteDialog}
// 					title={t('Delete Item')}
// 					subTitle={t('Do You Want To Delete This Item')}
// 					onDelete={handelDeleteAttribute}
// 				/>
// 			)}
// 		</div>
// 	)
// }
// export default Attributes;
import React, { useEffect, useMemo, useState } from "react";
import ThreeDotsButton from "src/app/components/optimized/Buttons/ThreedotsButton";
import AttributesHeader from "./_comp/AttributesHeader";
import AttributesTable from "./_comp/AttributesTable";
import { UseDeleteItem } from "src/app/utils/hooks/CustomDelete";
import { EditIcon } from "src/app/utils/icons";
import { LiaTrashAlt } from "react-icons/lia";
import useSelectBox from "src/app/components/optimized/Menu/useSelectBox";
import { useAppDispatch, useAppSelector } from "src/app/store";
import { deleteAllAttributesAction, deleteAttribute, getAttributes } from "src/app/store/slices/Attributes/Attribute/attributeAsyncThunks";
import { useNavigate } from "react-router-dom";
import PopupDelete from "src/app/components/optimized/Popups/PopupDelete";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { addAttributeInterface } from "./_hook/HookAddAttributes";

const Attributes = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { attributesList, isLoading } = useAppSelector((state) => state.attributesProducts);
	const { selectedOption, handleSelect, setSelectedOption } = useSelectBox();

	const [sortedAttributes, setSortedAttributes] = useState<addAttributeInterface[]>([]);

	useEffect(() => {
		dispatch(getAttributes());
	}, [dispatch]);

	useEffect(() => {
		if (selectedOption === 'Name A to Z') {
			setSortedAttributes([...attributesList].sort((a, b) => a.admin_name.localeCompare(b.admin_name)));
		} else if (selectedOption === 'Name Z to A') {
			setSortedAttributes([...attributesList].sort((a, b) => b.admin_name.localeCompare(a.admin_name)));
		} else {
			setSortedAttributes(attributesList); // إعادة تعيين البيانات إذا لم يكن هناك ترتيب محدد
		}
	}, [selectedOption, attributesList]);

	const options = [
		{
			id: '1',
			text: 'edit',
			icon: <EditIcon className='fill-title' />,
		},
		{
			id: '2',
			text: 'delete',
			icon: <LiaTrashAlt size='28' className='fill-error' />,
		},
	];

	const {
		openDeleteDialog,
		custom_Id,
		handelCloseDeleteDialog,
		handelId,
		handelOpenDialog,
	} = UseDeleteItem();

	const handelDeleteAttribute = () => {
		dispatch(deleteAttribute(custom_Id)).then((promiseResponse: any) => {
			if ((promiseResponse.payload.code === 200)) {
				handelCloseDeleteDialog();
				dispatch(getAttributes());
			}
		});
	};

	const handelDeleteAllAttribute = () => {
		dispatch(deleteAllAttributesAction()).then((promiseResponse: any) => {
			if ((promiseResponse.payload.code === 200)) {
				handelCloseDeleteDialog();
				dispatch(getAttributes());
			}
		});
	};

	useMemo(() => {
		switch (selectedOption) {
			case 'delete':
				handelOpenDialog();
				setSelectedOption('');
				break;
			case 'edit':
				setSelectedOption('');
				custom_Id && navigate(`add-attribute?id=${custom_Id}`);
				break;
			case 'Delete all attributes':
				attributesList?.length > 0
					? dispatch(deleteAllAttributesAction()).then((promiseResponse: any) => {
						if ((promiseResponse.payload.code === 200)) {
							dispatch(getAttributes());
						}
					})
					: toast.error('There are no data to delete it');
				setSelectedOption('');
				break;
		}
	}, [selectedOption, custom_Id]);

	return (
		<div className='flex-col-global gap-2 px-5'>
			<AttributesHeader />
			<hr />
			<AttributesTable handelId={handelId} data={sortedAttributes} isLoading={isLoading}>
				<ThreeDotsButton
					sortMenus={options}
					selectedOption={selectedOption}
					handelSelect={handleSelect}
				/>
			</AttributesTable>

			{openDeleteDialog && (
				<PopupDelete
					open={openDeleteDialog}
					onClose={handelCloseDeleteDialog}
					title={t('Delete Item')}
					subTitle={t('Do You Want To Delete This Item')}
					onDelete={handelDeleteAttribute}
				/>
			)}
		</div>
	);
};

export default Attributes;
