import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SubHeader, Button } from 'src/app/components/optimized';
import BranchCard from 'src/app/components/page/SettingPage/BranchesSettings/BranchesPage/BranchCard';
export interface Branch {
	id: number;
	name: string;
	address: string;
	city: string;
	country: string;
	phone: string;
}
const demoData: Branch[] = [
	{
		id: 1,
		name: 'Branch 1',
		address: '123 Main St',
		city: 'City 1',
		country: 'Country 1',
		phone: '123-456-7890',
	},
	{
		id: 2,
		name: 'Branch 2',
		address: '456 Elm St',
		city: 'City 2',
		country: 'Country 2',
		phone: '987-654-3210',
	},
];

export default function BranchesSettings() {
	//  hooks
	const { t } = useTranslation();
	const navigate = useNavigate();
	return (
		<div className='flex-col-global'>
			<SubHeader title={t('Branches')}>
				<Button variant='primary' onClick={() => navigate('add-branch')}>
					{t('Add Branch')}
				</Button>
			</SubHeader>
			<div className='custom-grid-parent custom_container'>
				<div className='grid-left  flex-col-global gap-5'>
					{demoData.map((branch) => (
						<BranchCard key={branch.id} {...branch} />
					))}
				</div>
			</div>
		</div>
	);
}
