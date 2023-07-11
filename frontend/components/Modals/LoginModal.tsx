import { useDispatch, useSelector } from 'react-redux';
import BaseModal from './BaseModal';
import { RootState } from '../../store/store';
import { useCallback, useState } from 'react';
import { uiActions } from '../../store/slices/ui-slice';
import { Form, Input } from 'antd';
import { createTokenAuthAPI } from '../../api/authAPI';
import { userActions } from '../../store/slices/user-slice';

const LoginModal = () => {
	const uiState = useSelector((state: RootState) => state.ui);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const onSubmitHandler = useCallback(
		(values: object) => {
			createTokenAuthAPI(values, setIsLoading)
				.then((response) => {
					const { token, user } = response;
					localStorage.setItem('token_auth', token);
					//localStorage.removeItem('token_auth');
					dispatch(
						userActions.setUser({
							...user,
							token,
						})
					);
				})
				.catch((err) => {
					console.error(err);
				});
		},
		[dispatch]
	);

	const onCloseHandler = useCallback(() => {
		dispatch(uiActions.closeLoginModal());
	}, [dispatch]);

	const bodyContent = (
		<Form
			form={form}
			name='loginForm'
			initialValues={{ remember: true }}
			autoComplete='off'
		>
			<Form.Item
				label='Username'
				name='username'
				rules={[{ required: true, message: 'We need your username!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Password'
				name='password'
				rules={[{ required: true, message: 'Please input your password!' }]}
			>
				<Input.Password />
			</Form.Item>
		</Form>
	);

	return (
		<BaseModal
			disabled={isLoading}
			open={uiState.showLoginModal}
			body={bodyContent}
			title='Login'
			subtitle='Please enter your login information'
			form={form}
			action='Login'
			onSubmit={onSubmitHandler}
			onClose={onCloseHandler}
		/>
	);
};

export default LoginModal;
