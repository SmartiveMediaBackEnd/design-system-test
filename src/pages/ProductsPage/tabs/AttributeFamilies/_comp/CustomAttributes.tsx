import * as React from 'react';
import { useAppDispatch, useAppSelector } from "src/app/store";
import { getAttributes } from "src/app/store/slices/Attributes/Attribute/attributeAsyncThunks";
import { useEffect, useState } from "react";
import { CheckBox } from "src/app/components/optimized";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button } from 'src/app/components/optimized';
import { AddFillIcon } from "src/app/utils/icons";
import { useTranslation } from "react-i18next";
import SearchInput from 'src/app/components/ui/form/SearchInput';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomAttributes() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const { attributesList } = useAppSelector((state) => state.attributesProducts);


  const filteredAttributes = React.useMemo(() => {
		return attributesList.filter(user =>
			user.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [searchQuery, attributesList]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckBoxChange = (attributeCode: string, isChecked: boolean) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [attributeCode]: isChecked,
    }));

    setSelectedAttributes(prevState => {
      if (isChecked) {
        // Add the attribute to the array if checked
        return [...prevState, attributeCode];
      } else {
        // Remove the attribute from the array if unchecked
        return prevState.filter(code => code !== attributeCode);
      }
    });
  };


  useEffect(() => {
    dispatch(getAttributes());
  }, [dispatch]);

  useEffect(() => {
    console.log("Selected Attributes:", selectedAttributes);
  }, [selectedAttributes]);

  return (
    <React.Fragment>
      <div>
        <Button variant='secondary' LeftIcon={AddFillIcon} onClick={handleClickOpen}>{t('Add Attribute')}</Button>
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <div className="flex-col-global">
            {/* Search input can be added here */}
            <SearchInput setSearchQuery={setSearchQuery} />
            {/* Attributes List */}
              {filteredAttributes.map((item) => (
                <div key={item.code} className="flex items-center gap-4 mb-4">
                  <CheckBox
                    checked={checkedItems[item.code] || false}
                    handleOnChange={(isChecked) => handleCheckBoxChange(item.code, isChecked)}
                  />
                  <p className='text-title text-sm'>{item.code}</p>
                </div>
              ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {t('Add Attribute')}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
