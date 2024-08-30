import { useTranslation } from "react-i18next"
import PopoverComponent from "../UiKits/Popover"
import Button from "./Button";
import { AddFillIcon } from "src/app/utils/icons";
import CustomAttributes from "src/pages/ProductsPage/tabs/AttributeFamilies/_comp/CustomAttributes";

const AttributeBtn = () => {
    const { t } = useTranslation();
    return (
        <PopoverComponent
            button={
                <Button variant='secondary' LeftIcon={AddFillIcon}>{t('Add Attribute')}</Button>

            }
        >
            <CustomAttributes />
        </PopoverComponent>
    )
}

export default AttributeBtn;
