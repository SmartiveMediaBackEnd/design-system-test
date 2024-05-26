import { useTranslation } from 'react-i18next';

import { CampaignInputsTypes, CampaignFormProps } from '../useCampaign';
import FormChoiceChips from 'src/pages/SettingsPage/CustomizationsSettings/comp/FormChoiceChips';
import SpecificAutoCompleteInput from 'src/app/components/page/discount/Selectors/SpecificAutoCompleteInput';

const targetingOptions = [
	'Purchased from you',
	'Visited your store',
	'liked your page',
	'having specific interests',
];

export default function TargetingDetails({ formStore }: CampaignFormProps) {
	const { t } = useTranslation();

	//!---------------------------------------------------
	// todo:  didn't finish yet.
	// todo:  Linking the interest array to the formStore.
	//!---------------------------------------------------

	return (
		<div className='global-cards grid grid-cols-2'>
			<h2 className='title text-lg'>{t('Targeting')}</h2>
			<FormChoiceChips<CampaignInputsTypes>
				formStore={formStore}
				name='targetSimilarPeople'
				label='Target who is similar to people'
				options={targetingOptions}
			/>
			{formStore.watch('targetSimilarPeople') === 'having specific interests' && (
				<SpecificAutoCompleteInput<CampaignFormProps>
					name='specificInterests'
					label={t('Specific interests')}
					formStore={formStore}
				/>
			)}
		</div>
	);
}
