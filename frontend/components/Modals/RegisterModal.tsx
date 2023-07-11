import { useDispatch, useSelector } from 'react-redux';
import BaseModal from './BaseModal';
import { RootState } from '../../store/store';
import { useForm } from 'antd/es/form/Form';
import { useCallback, useState } from 'react';
import { uiActions } from '../../store/slices/ui-slice';
import { Form, Input } from 'antd';
import { createUserAPI } from '../../api/authAPI';

const RegisterModal = () => {
	const uiState = useSelector((state: RootState) => state.ui);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const [form] = useForm();

	const onCloseHandler = useCallback(() => {
		dispatch(uiActions.closeRegisterModal());
	}, [dispatch]);

	const onSubmitHandler = useCallback(
		(values: object) => {
			createUserAPI(values, setIsLoading)
				.then(() => {
					onCloseHandler();
				})
				.catch((err) => {
					console.log(err);
				});
		},
		[onCloseHandler]
	);

	const bodyContent = (
		<Form
			form={form}
			name='registerForm'
			initialValues={{ remember: true }}
			autoComplete='off'
			className='flex flex-col w-full'
		>
			<div className='flex flex-col md:flex-row gap-2'>
				<Form.Item
					name='username'
					label='Username'
					rules={[{ required: true, message: 'We need an unique username.' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='email'
					label='Email'
					rules={[{ required: true, message: 'We need your email.' }]}
				>
					<Input type='email' />
				</Form.Item>
			</div>
			<div className='flex flex-col md:flex-row gap-2'>
				<Form.Item
					name='first_name'
					label='First name'
					rules={[{ required: true, message: 'We need your first name.' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='last_name'
					label='Last name'
					rules={[{ required: true, message: 'We need a last name.' }]}
				>
					<Input />
				</Form.Item>
			</div>
			<Form.Item
				name='password'
				label='Password'
				rules={[{ required: true, message: 'Introduce a password.' }]}
			>
				<Input.Password />
			</Form.Item>
		</Form>
	);

	return (
		<BaseModal
			open={uiState.showRegisterModal}
			body={bodyContent}
			title='Register modal'
			subtitle='Welcome, we need this information'
			form={form}
			action='Register'
			onSubmit={onSubmitHandler}
			onClose={onCloseHandler}
			disabled={isLoading}
		/>
	);
};

export default RegisterModal;
