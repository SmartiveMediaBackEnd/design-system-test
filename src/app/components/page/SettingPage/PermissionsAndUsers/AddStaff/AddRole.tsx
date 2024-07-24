import { useTranslation } from "react-i18next";
import { Button } from "src/app/components/optimized";
import { GlobalDialog } from "src/app/components/shared";
import PermissionType from "./PermissionType";
import { Form } from "src/app/components/ui/form";
import { Input } from "src/app/components/ui/input";
import Textarea from "src/app/components/optimized/InputsFields/Textarea";
import SelectFormField from "src/app/components/ui/form/SelectFormField";
import { useForm } from "src/app/utils/hooks/form";
import useCustomHookAddRoles, { AddRolesInterface } from "./HookForAddRoles";
import { UseFormReturn, useWatch } from "react-hook-form";
import FormField from "src/app/components/ui/form/field";

const AddRole = ({ openDialog, setOpenDialog }: { openDialog: boolean; setOpenDialog: () => void }) => {
    const { t } = useTranslation();

    const handleClose = () => {
        setOpenDialog(false);
    };



    const dialogStyle = {
        width: { lg: '50%', md: '70%', xs: '90%' },
        height: { md: '600px', xs: '600px' },
    };

    // custom hook
    const { handelDefaultValue, rolesSchema } = useCustomHookAddRoles();
    const handleSubmit = (values: AddRolesInterface) => {
        console.log(values);
        // handelclose();
    };


    const { formStore, onSubmit } = useForm({
        schema: rolesSchema,
        handleSubmit: handleSubmit,
        defaultValues: handelDefaultValue(),
    });

    return (
        <Form {...formStore}>
            <form onSubmit={onSubmit}>
                <GlobalDialog openDialog={openDialog} handleClose={handleClose} style={dialogStyle}>
                    <div className='flex-col-global gap-4 h-full'>
                        <h2 className="title">{t('Add Role')}</h2>
                        {/* inputs */}
                        <div className='flex-col-global justify-between h-full'>
                            <TextFields formStore={formStore} />

                            {/* <DynamicAccordion /> */}
                            <div className='flex items-center justify-end gap-5 py-5'>
                                <Button variant='tertiary' onClick={handleClose}>
                                    {t('cancel')}
                                </Button>
                                <Button variant='primary' onClick={onSubmit}>
                                    {t('add')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </GlobalDialog>
            </form>
        </Form >
    )
}

export default AddRole;


const TextFields = ({ formStore }: { formStore: UseFormReturn<AddRolesInterface> }) => {
    const { t } = useTranslation();
    const options = [
        { value: 'all', label: 'All' },
        { value: 'custom', label: 'Custom' },
    ];

    // Use useWatch to monitor the value of permission_type
    const permissionType = useWatch({
        control: formStore.control,
        name: 'permission_type',
    });

    return (
        <div className='flex-col-global gap-4'>
            <FormField
                formStore={formStore}
                name='name'
                label={t('Role Name')}
                render={(field) => <Input {...field} placeholder={t('e.g., Web developer')} />}
            />

            <FormField
                formStore={formStore}
                name='description'
                label={t('Description')}
                render={(field) => <Textarea {...field} placeholder={'Type a description'} />}
            />

            <SelectFormField
                name='permission_type'
                label={t('Permission type')}
                formStore={formStore}
                options={options}
                placeholder={t('Permission type')}
            />

            {permissionType === 'custom' && <PermissionType formStore={formStore}/>}
        </div>
    );
};
