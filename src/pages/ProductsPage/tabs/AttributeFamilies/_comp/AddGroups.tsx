import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/app/components/optimized';
import DropDownMenu from 'src/app/components/optimized/DropDownMenu';
import { LiaTrashAlt } from 'react-icons/lia';
import { BiEdit } from "react-icons/bi";
import { IAddAttributeFamilies } from '../_hook/HookAddAttributeFamilies';
import { useEffect, useState } from 'react';
import { AddFillIconWhite } from 'src/app/utils/icons';
import GroupAttributeTable from './GroupAttributeTable';
import CustomAttributes from './CustomAttributes';
import FormField from "src/app/components/ui/form/field";
import { Input } from "src/app/components/ui/input";
import { GlobalDialog } from "src/app/components/shared";
import { getAttributes } from 'src/app/store/slices/Attributes/Attribute/attributeAsyncThunks';
import { useAppDispatch, useAppSelector } from 'src/app/store';


const AddGroups = ({ formStore, onSubmit }: { formStore: UseFormReturn<IAddAttributeFamilies>; }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const { attributesList } = useAppSelector((state) => state.attributesProducts);

    useEffect(() => {
        dispatch(getAttributes());
    }, [dispatch]);

    const { fields, append, remove } = useFieldArray({
        control: formStore.control,
        name: 'attribute_groups',
    });

    const handleClose = () => {
        setOpenDialog(false);
    };

    const dialogStyle = {
        width: { lg: '50%', md: '70%', xs: '90%' },
        maxHeight: { md: '600px', xs: '500px' },
    };

    const handleOpenDialog = (index: number | null) => {
        setSelectedIndex(index);
        setOpenDialog(true);
    };
    // const handleAddGroup = () => {
    //     // Get the values for the new group
    //     const name = formStore.getValues(`attribute_groups.${fields.length}.name`);
    //     const position = formStore.getValues(`attribute_groups.${fields.length}.position`);
    
    //     // Validate the position
    //     if (position === undefined || position === null || position === 0) {
    //         console.log('Position is required.');
    //         return;
    //     }
    
    //     const existingPositions = fields.map(field => field.position);
    //     if (existingPositions.includes(position)) {
    //         console.log(`Position ${position} already exists.`);
    //         return;
    //     }
    
    //     // Create the new group object
    //     const newGroup = {
    //         name: name || '',
    //         position: position || fields.length + 1,
    //     };
    
    //     append(newGroup);
    
    //     // Ensure unique groups in local storage
    //     const updatedGroups = formStore.getValues('attribute_groups');
    //     const uniqueGroups = Array.from(new Map(updatedGroups.map(group => [group.position, group])).values());
    //     localStorage.setItem('attribute_groups', JSON.stringify(uniqueGroups));
    
    //     handleClose();
    // };
    
const handleAddGroup = () => {
    onSubmit()
    handleClose();
}
    return (
        <div className="flex-col-global gap-4">
            <div>
                <Button variant='primary' LeftIcon={AddFillIconWhite} onClick={() => handleOpenDialog(null)}>
                    {t("add group")}
                </Button>
            </div>

            {openDialog && (
                <GlobalDialog openDialog={openDialog} handleClose={handleClose} style={dialogStyle}>
                    <div className='flex-col-global'>
                        <h3 className='title'>{t('Add Group')}</h3>

                        <FormField
                            formStore={formStore}
                            name={`attribute_groups.${fields.length}.name`}
                            label={t('Group Name')}
                            render={(field) => <Input {...field} placeholder={t('e.g., Group1')} />}
                        />

                        <FormField
                            formStore={formStore}
                            name={`attribute_groups.${fields.length}.position`}
                            label={t('Position')}
                            render={(field) => <Input {...field} placeholder={t('e.g., 1')} />}
                        />
                    </div>
                    <div className='flex items-center justify-end gap-5 py-5'>
                        <Button variant='tertiary' onClick={handleClose}>
                            {t('cancel')}
                        </Button>

                        <Button
                            variant='primary'
                            onClick={handleAddGroup}
                        >
                            {t('add')}
                        </Button>
                    </div>
                </GlobalDialog>
            )}

            {fields.length > 0 && fields.map((item, i) => (
                <div key={item.id} className="global-cards my-2">
                    <DropDownMenu
                        addCompo={
                            <div className='flex gap-4 items-center'>
                                <LiaTrashAlt
                                    onClick={() => remove(i)}
                                    className="iconClass text-[red]"
                                />
                                <BiEdit
                                    color="#032C58"
                                    onClick={() => handleOpenDialog(i)}
                                />
                            </div>
                        }
                        variant
                        title={item.name || t('Group Name')} 
                    >
                        <div>
                            {attributesList.length > 0 && <GroupAttributeTable data={attributesList} />}
                            <CustomAttributes />
                        </div>
                    </DropDownMenu>
                </div>
            ))}
        </div>
    );
};

export default AddGroups;
