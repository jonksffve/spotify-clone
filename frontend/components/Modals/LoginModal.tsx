import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import BaseModal from './BaseModal';
import { useCallback, useState } from 'react';
import { uiActions } from '../../store/slices/ui-slice';
import { createTokenAuthAPI } from '../../api/authAPI';
import { userActions } from '../../store/slices/user-slice';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../UI/Inputs/Input';
import { AiOutlineUser } from 'react-icons/ai';
import { BsKey } from 'react-icons/bs';
import { IconType } from 'react-icons';
import { LoginFormInput } from '../../src/helpersConfig/types';

const LoginModal = () => {
	const uiState = useAppSelector((state) => state.ui);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginFormInput>({
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onCloseHandler = useCallback(() => {
		reset();
		dispatch(uiActions.closeLoginModal());
	}, [dispatch, reset]);

	const onSubmit: SubmitHandler<LoginFormInput> = useCallback(
		(formData) => {
			createTokenAuthAPI(formData, setIsLoading)
				.then((response) => {
					const { token, user } = response;
					localStorage.setItem('token_auth', token);
					dispatch(
						userActions.setUser({
							...user,
							token,
							logged: true,
						})
					);
				})
				.catch((err) => {
					console.error(err);
				})
				.finally(() => {
					onCloseHandler();
				});
		},
		[dispatch, onCloseHandler]
	);

	const bodyContent = (
		<form
			onSubmit={void handleSubmit(onSubmit)}
			autoComplete='off'
		>
			<div className='flex flex-col gap-4'>
				<Input
					placeholder='Enter your username'
					icon={AiOutlineUser as IconType}
					{...register('username', { required: true })}
					aria-invalid={errors.username ? 'true' : 'false'}
				/>
				{errors.username?.type === 'required' && (
					<p
						role='alert'
						className='text-rose-400 font-bold text-lg'
					>
						First name is required
					</p>
				)}
				<Input
					type='password'
					placeholder='Enter your password'
					icon={BsKey as IconType}
					{...register('password', { required: true })}
				/>
				{errors.password?.type === 'required' && (
					<p
						role='alert'
						className='text-rose-400 font-bold text-lg'
					>
						Password is required
					</p>
				)}
			</div>
		</form>
	);

	const descriptionContent = <div>Don't have accont? REGISTER</div>;

	return (
		<BaseModal
			disabled={isLoading}
			isOpen={uiState.showLoginModal}
			body={bodyContent}
			title='Login'
			subtitle='Please enter your login information'
			action='Login'
			description={descriptionContent}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onCloseHandler}
		/>
	);
};

export default LoginModal;
