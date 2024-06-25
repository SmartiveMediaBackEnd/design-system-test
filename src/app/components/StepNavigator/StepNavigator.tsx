import { createContext, useContext } from 'react';
import useStepNavigation, { StepType } from './useStepNavigation';
import Step from './Step';

interface StepNavigatorProps {
	steps: StepType[];
	onFinish?: () => void;
}

const StepContext = createContext<any>(null);
export const useStepContext = () => useContext(StepContext);
// , onNext, onBack
export default function StepNavigator({ steps, onFinish }: StepNavigatorProps) {
	const stepNavigation = useStepNavigation(steps);

	return (
		<StepContext.Provider value={{ ...stepNavigation, onFinish }}>
			<div className='flex-col-global gap-4 h-full'>
				{steps.map((_, index) => (
					<Step key={index} index={index} />
				))}
			</div>
		</StepContext.Provider>
	);
}
