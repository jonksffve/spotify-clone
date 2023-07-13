import { IconType } from 'react-icons';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	type?: string;
	placeholder: string;
	icon: IconType;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ type = 'text', placeholder, icon: Icon, ...props }, ref) => {
		return (
			<div className='flex items-center w-full relative'>
				<input
					type={type}
					placeholder={placeholder}
					className='w-full rounded-md bg-neutral-700 p-3 text-sm placeholder:text-neutral-400'
					ref={ref}
					{...props}
				/>
				<Icon
					className='absolute right-1'
					size={20}
				/>
			</div>
		);
	}
);

export default Input;
