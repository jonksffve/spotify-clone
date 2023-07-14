import { AiOutlineClose } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import Button from '../UI/Button';
import { Spin } from 'antd';

interface BaseModalProps {
	body: React.ReactNode;
	isOpen: boolean;
	disabled: boolean;
	title: string;
	subtitle: string;
	action: string;
	description?: React.ReactNode;
	onSubmit: () => void;
	onClose: () => void;
}

const BaseModal: React.FC<BaseModalProps> = ({
	body,
	isOpen,
	disabled,
	title,
	subtitle,
	action,
	description = undefined,
	onSubmit,
	onClose,
}) => {
	const [showModal, setShowModal] = useState(isOpen);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	if (!showModal) return;

	return (
		<>
			{/* Overlay */}
			<div
				className='fixed inset-0 bg-neutral-900/60 backdrop-blur-sm'
				onClick={onClose}
			/>
			{/* Container */}
			<div className='fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:max-w-[40vw] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-700 p-6 focus:outline-none'>
				<div className='flex justify-between'>
					<div className='text-xl font-bold mb-4'>{title}</div>
					<AiOutlineClose
						size={26}
						className='text-neutral-400 hover:text-white focus:outline-none hover:cursor-pointer'
						onClick={onClose}
					/>
				</div>
				<div className='mb-5 text-sm'>{subtitle}</div>
				<Spin
					spinning={disabled}
					size='large'
				>
					<div className='p-5 mb-4'>{body}</div>
				</Spin>
				<div className='flex w-full justify-end mb-4'>
					<div className='flex flex-col md:flex-row w-full md:w-1/2 gap-1'>
						<Button
							onClick={onClose}
							className='bg-transparent text-white hover:border-black'
							disabled={disabled}
						>
							Cancel
						</Button>
						<Button
							onClick={onSubmit}
							disabled={disabled}
						>
							{action}
						</Button>
					</div>
				</div>
				{description && <div className='text-center'>{description}</div>}
			</div>
		</>
	);
};

export default BaseModal;
