import { useState, useEffect, useCallback } from 'react';
import { Modal, Spin } from 'antd';
import { FormInstance } from 'antd/es/form';
import Button from '../UI/Button';

interface BaseModalProps {
	body: React.ReactNode;
	title: string;
	subtitle: string;
	open: boolean;
	form: FormInstance;
	action: string;
	disabled: boolean;
	onSubmit(values: object): void;
	onClose(): void;
}

const BaseModal: React.FC<BaseModalProps> = ({
	title,
	subtitle,
	body,
	open,
	form,
	action,
	disabled,
	onSubmit,
	onClose,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(open);

	useEffect(() => {
		setIsModalOpen(open);
	}, [open]);

	const onSubmitHandler = useCallback(() => {
		form
			.validateFields()
			.then((values: object) => {
				form.resetFields();
				onSubmit(values);
			})
			.catch((info) => {
				console.log('Validate Failed:', info);
			});
	}, [form, onSubmit]);

	return (
		<Modal
			title={title}
			open={isModalOpen}
			onOk={onSubmitHandler}
			onCancel={onClose}
			footer={null}
		>
			<div className='flex flex-col gap-2'>
				<div>{subtitle}</div>
				<Spin
					spinning={disabled}
					size='large'
				>
					<div className='flex flex-col items-center justify-center mt-2 min-h-[200px]'>
						{body}
					</div>
				</Spin>
			</div>
			<div className='flex w-full justify-end'>
				<div className='flex flex-col md:flex-row w-full md:w-1/2 gap-1'>
					<Button
						onClick={onClose}
						className='bg-transparent text-neutral-800 hover:border-black'
						disabled={disabled}
					>
						Cancel
					</Button>
					<Button
						onClick={onSubmitHandler}
						disabled={disabled}
					>
						{action}
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default BaseModal;
