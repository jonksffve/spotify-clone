import { forwardRef } from 'react';
import { IconType } from 'react-icons';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: IconType;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ type = 'text', icon: Icon, ...props }, ref) => {
		return (
			<div className='flex items-center w-full relative'>
				<input
					type={type}
					className='w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-[1px] file:text-sm file:font-medium placeholder:text-neutral-400'
					ref={ref}
					{...props}
				/>
				{Icon && (
					<Icon
						className='absolute right-1'
						size={20}
					/>
				)}
			</div>
		);
	}
);

export default Input;
