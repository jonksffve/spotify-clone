import { forwardRef } from 'react';
import { IconType } from 'react-icons';

interface InputImageProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon: IconType;
}

const InputImage = forwardRef<HTMLInputElement, InputImageProps>(
	({ icon: Icon, onChange, value, ...props }, ref) => {
		return (
			<div className='w-full border-dashed border-[1px] rounded-md flex items-center relative'>
				<label
					htmlFor='avatar'
					className='p-2 flex items-center hover:cursor-pointer w-full text-neutral-400'
				>
					<p className='max-w-[50vw] md:max-w-[15vw] truncate ...'>
						{value ? value : 'Add an image'}
					</p>
					<Icon
						size={20}
						className='absolute right-1 text-white'
					/>
				</label>
				<input
					id='avatar'
					name='avatar'
					type='file'
					hidden={true}
					accept='image/*'
					ref={ref}
					onChange={onChange}
					{...props}
				/>
			</div>
		);
	}
);

export default InputImage;
