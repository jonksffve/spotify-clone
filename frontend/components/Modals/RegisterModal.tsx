import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import BaseModal from './BaseModal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { uiActions } from '../../store/slices/ui-slice';
import { IconType } from 'react-icons';
import { AiOutlineUser, AiOutlineMail, AiOutlineFileAdd } from 'react-icons/ai';

import { createUserAPI } from '../../api/authAPI';
import Input from '../UI/Inputs/Input';
import { BsKey, BsKeyboard } from 'react-icons/bs';
import { AxiosError } from 'axios';
import {
	ErrorResponse,
	RegisterFormInput,
} from '../../src/helpersConfig/types';

const RegisterModal = () => {
	const uiState = useAppSelector((state) => state.ui);
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		setError,
		formState: { errors },
	} = useForm<RegisterFormInput>({
		defaultValues: {
			username: '',
			email: '',
			first_name: '',
			last_name: '',
			password: '',
			avatar: null,
		},
	});

	const onCloseHandler = useCallback(() => {
		reset();
		dispatch(uiActions.closeRegisterModal());
		dispatch(uiActions.showLoginModal());
	}, [dispatch, reset]);

	const onSubmit: SubmitHandler<RegisterFormInput> = useCallback(
		(data) => {
			createUserAPI(data, setIsLoading)
				.then(() => {
					onCloseHandler();
				})
				.catch((err: AxiosError) => {
					const data = err.response?.data as ErrorResponse;

					for (const err in data) {
						setError(err, {
							type: 'custom',
							message: data[err as keyof ErrorResponse],
						});
					}
				});
		},
		[onCloseHandler, setError]
	);

	const bodyContent = (
		<form
			autoComplete='off'
			onSubmit={void handleSubmit(onSubmit)}
		>
			<div className='flex flex-col gap-3'>
				<Input
					id='username'
					placeholder='Username'
					icon={AiOutlineUser as IconType}
					{...register('username', { required: true })}
				/>
				{errors.username?.type === 'required' && (
					<p className='text-rose-500 text-sm mt-0'>This field is required</p>
				)}
				{errors.username?.type === 'custom' && (
					<p className='text-rose-500 text-sm mt-0'>
						{errors.username?.message}
					</p>
				)}

				<Input
					id='email'
					type='email'
					placeholder='Email'
					icon={AiOutlineMail as IconType}
					{...register('email', { required: true })}
				/>
				{errors.email?.type === 'required' && (
					<p className='text-rose-500 text-sm mt-0'>This field is required</p>
				)}
				{errors.email?.type === 'custom' && (
					<p className='text-rose-500 text-sm mt-0'>{errors.email?.message}</p>
				)}

				<Input
					id='first_name'
					placeholder='First name'
					icon={BsKeyboard as IconType}
					{...register('first_name', { required: true })}
				/>
				{errors.first_name && (
					<p className='text-rose-500 text-sm mt-0'>This field is required</p>
				)}

				<Input
					id='last_name'
					placeholder='Last name'
					icon={BsKeyboard as IconType}
					{...register('last_name', { required: true })}
				/>
				{errors.last_name && (
					<p className='text-rose-500 text-sm mt-0'>This field is required</p>
				)}

				<Input
					id='password'
					type='password'
					placeholder='Password'
					icon={BsKey as IconType}
					{...register('password', { required: true })}
				/>
				{errors.password && (
					<p className='text-rose-500 text-sm mt-0'>This field is required</p>
				)}

				<Input
					id='avatar'
					type='file'
					icon={AiOutlineFileAdd as IconType}
					accept='image/*'
					{...(register('avatar'),
					{ required: false },
					{
						onChange: (event) => {
							setValue('avatar', event.target.files?.item(0));
						},
					})}
				/>
			</div>
		</form>
	);

	const descriptionContent = <div>Already registered? LOG IN</div>;

	return (
		<BaseModal
			isOpen={uiState.showRegisterModal}
			body={bodyContent}
			title='Register modal'
			subtitle='Welcome, we need this information'
			action='Register'
			description={descriptionContent}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onCloseHandler}
			disabled={isLoading}
		/>
	);
};

export default RegisterModal;
