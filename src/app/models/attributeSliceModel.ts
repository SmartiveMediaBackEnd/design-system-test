import { addAttributeInterface } from 'src/pages/ProductsPage/tabs/Attributes/_hook/HookAddAttributes';
import { statusGlobal } from '.';

export interface attributesSliceModel extends statusGlobal {
	attributesList: addAttributeInterface[];
    attributeShow: addAttributeInterface | null;
}