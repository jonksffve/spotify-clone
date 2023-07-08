import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	className,
	children,
	disabled,
	type = 'button',
	...props
}) => {
	return (
		<button
			type={type}
			className={twMerge(
				`w-full rounded-full bg-green-500 border border-transparent p-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition`,
				className
			)}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
