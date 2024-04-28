import { cva } from 'class-variance-authority';
import { cn } from 'src/app/utils';

const handleButtonVariant = cva(undefined, {
	variants: {
		variant: {
			link: 'text-primary flex flex-row justify-center items-center capitalize gap-1',
			secondary: 'btn-sec flex items-center gap-1 p-2',
			primary: 'text-white bg-primary flex items-center p-2 gap-2 rounded',
			tertiary: 'text-title text-sm capitalize font-semibold flex items-center gap-1.5',
			default: 'relative btn-pri flex px-1 items-center ',
		},
	},
	defaultVariants: { variant: 'default' },
});
const handleIconVariant = cva(undefined, {
	variants: {
		//  mt-1
		variant: {
			link: 'fill-primary p-0.5 ',
			secondary: 'fill-pri-dark h-3 w-3 ml-1',
			tertiary: 'fill-pri-dark ml-1 h-3 w-3',
			primary: 'fill-white',
			default: 'fill-white',
		},
	},
	defaultVariants: { variant: 'default' },
});
const handleTextVariant = cva(undefined, {
	variants: {
		variant: {
			link: undefined,
			secondary: 'fill-pri-dark',
			tertiary: 'fill-pri-dark',
			primary: 'fill-white',
			default: 'mx-1 text-sm',
		},
	},
	defaultVariants: { variant: 'default' },
});

/**
 * @typedef {import('class-variance-authority').VariantProps<typeof handleButtonVariant>} ButtonVariants
 */

/**
 * Button component for various button styles with optional icons and loading spinner.
 * @param {{
 *  textClassName?: string,
 *  LeftIcon?: (import("react").ComponentType<{ className?: string; }>),
 *  RightIcon?: (import("react").ComponentType<{ className?: string; }>),
 *  loading?: boolean,
 *  text?: never
 * } & import("react").ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants} props - Props for the Button component.
 *
 * @example
 *
 * ```jsx
 * export default function ExampleComponent() {
 *
 *   const handleClick = () => {
 *     console.log("Button clicked!");
 *   };
 *
 *   return (
 *     <div>
 *       <Button variant="primary" onClick={handleClick}>
 *         Primary Button
 *       </Button>
 *
 *       <Button variant="secondary" LeftIcon={LeftIcon} onClick={handleClick}>
 *         Secondary Button
 *       </Button>
 *
 *       <Button variant="tertiary" RightIcon={RightIcon} onClick={handleClick}>
 *         Tertiary Button
 *       </Button>
 *
 *       <Button variant="link" onClick={handleClick}>
 *         Link Button
 *       </Button>
 *
 *       <Button variant="primary" loading onClick={handleClick}>
 *         Loading Button
 *       </Button>
 *     </div>
 *   );
 * };
 * ```
 */
export default function Button({
	variant,
	children,
	LeftIcon,
	RightIcon,
	loading,
	className,
	text,
	textClassName,
	...props
}) {
	// Define variables for class names
	let buttonClass = handleButtonVariant({ variant });
	let iconClass = handleIconVariant({ variant });
	let textClass = handleTextVariant({ variant, className: textClassName });

	return (
		<button type='button' {...props} className={cn(buttonClass, className)}>
			{/* Render loading spinner if loading is true */}
			{loading ? (
				<div className='flex items-center justify-center px-6 py-1'>
					<div className='border-2 border-white rounded-full border-t-transparent animate-spin' />
				</div>
			) : (
				// Render button content with LeftIcon, text, and RightIcon
				<>
					{LeftIcon &&
						(typeof LeftIcon === 'function' ? <LeftIcon className={iconClass} /> : LeftIcon)}

					<span className={textClass}>{children ?? text}</span>
					{RightIcon &&
						(typeof RightIcon === 'function' ? <RightIcon className={iconClass} /> : RightIcon)}
				</>
			)}
		</button>
	);
}
