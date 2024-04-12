import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @param {Object} props - Component props.
 * @param {string} props.defaultTab - Default active tab.
 * @param {Object.<string, JSX.Element>} props.tabContent - Content for each tab, keyed by tab ID.
 * @param {Function} props.t - Translation function.
 * @returns {JSX.Element} HorizontalTabs component.
 */
function HorizontalTabs({ defaultTab, tabContent }) {
	/**
	 * State to manage the active tab.
	 * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
	 */
	const [activeTab, setActiveTab] = useState(defaultTab);
	const { t } = useTranslation();

	/**
	 * Handle click event on tab.
	 * @param {string} tab - Tab ID.
	 */
	const handleClick = (tab) => {
		setActiveTab(tab);
	};

	return (
		<div className=''>
			<ul className='flex flex-wrap -mb-px font-medium text-center border-b bg-white px-5'>
				{Object.keys(tabContent).map((tab) => (
					<li key={tab} className='mr-2'>
						<button
							className={`inline-block p-4 rounded-t-lg  ${
								activeTab === tab ? 'text-blue-600  border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
							}`}
							onClick={() => handleClick(tab)}
						>
							{t(tab.charAt(0).toUpperCase() + tab.slice(1))}
						</button>
					</li>
				))}
			</ul>
			<div className='p-4'>{tabContent[activeTab]}</div>
		</div>
	);
}

export default HorizontalTabs;
