import { useTranslation } from 'react-i18next';
import { IoIosAddCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { ArrangeButton, Button } from 'src/app/components/optimized';
import ActionsButton from 'src/app/components/optimized/Buttons/ActionsButton';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import { LiaTrashAlt } from 'react-icons/lia';
import { nanoid } from 'nanoid';

export const attributeActionsMenu = [
  {
    id: nanoid(),
    text: 'Delete all attributes',
    icon: <LiaTrashAlt size='28' className='fill-error' />,
  },
];

export const sortMenuArrange = [
  { id: nanoid(), text: 'Name A to Z' },
	{ id: nanoid(), text: 'Name Z to A' },
]

const AttributesHeader = () => {
  const { selectedOption, handleSelect } = useSelectBox();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className='md:flex-row-global flex-col-global justify-between w-full'>
      <div>
        <Button variant='primary' LeftIcon={IoIosAddCircle} onClick={() => navigate('add-attribute')}>
          {t('Add Attribute')}
        </Button>
      </div>
      <div className='flex-row-global gap-4'>
        <ArrangeButton
          sortMenus={sortMenuArrange}
          selectedOption={selectedOption}
          handelSelect={handleSelect}
        />

        <ActionsButton
          sortMenus={attributeActionsMenu}
          selectedOption={selectedOption}
          handelSelect={handleSelect}
        />
      </div>
    </div>
  )
}

export default AttributesHeader
