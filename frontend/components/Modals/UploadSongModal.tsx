import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { uiActions } from '../../store/slices/ui-slice';
import Input from '../UI/Inputs/Input';
import BaseModal from './BaseModal';
import { useCallback, useState } from 'react';
import { BsKeyboard, BsFileEarmarkMusic } from 'react-icons/bs';
import { BiUserVoice, BiImageAdd } from 'react-icons/bi';
import { IconType } from 'react-icons';
import { createSongAPI } from '../../api/songAPI';
import { UploadSongInputs } from '../../src/helpersConfig/types';

const UploadSongModal = () => {
	const dispatch = useAppDispatch();
	const uiState = useAppSelector((state) => state.ui);
	const userState = useAppSelector((state) => state.user);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		setError,
		setValue,
		formState: { errors },
	} = useForm<UploadSongInputs>({
		defaultValues: {
			title: '',
			song_author: '',
			cover_image: undefined,
			song_file: undefined,
		},
	});

	const closeHandler = useCallback(() => {
		reset();
		dispatch(uiActions.closeUploadModal());
	}, [dispatch, reset]);

	const onSubmit: SubmitHandler<UploadSongInputs> = useCallback(
		(data) => {
			if (!data.song_file || !userState.token) {
				if (!data.song_file) {
					setError('song_file', {
						type: 'required',
						message: 'This field is required.',
					});
				}
				return;
			}

			createSongAPI(data, userState.token, setIsLoading)
				.then(() => {
					closeHandler();
				})
				.catch((err) => {
					console.log(err);
				});
		},
		[setError, userState.token, closeHandler]
	);

	const bodyContent = (
		<form autoComplete='off'>
			<div className='flex flex-col gap-y-4'>
				<Input
					id='title'
					placeholder='Song title'
					icon={BsKeyboard as IconType}
					{...register('title', { required: true })}
				/>
				{errors.title && (
					<p className='text-rose-500'>This field is required.</p>
				)}

				<Input
					id='song_author'
					placeholder='Song author'
					icon={BiUserVoice as IconType}
					{...register('song_author', { required: true })}
				/>
				{errors.song_author && (
					<p className='text-rose-500'>This field is required.</p>
				)}

				<div>
					<div className='pb-1'>Select an album cover</div>
					<Input
						id='cover_image'
						type='file'
						accept='image/*'
						icon={BiImageAdd as IconType}
						{...(register('cover_image'),
						{ required: false },
						{
							onChange: (event) => {
								setValue('cover_image', event.target.files[0]);
							},
						})}
					/>
				</div>

				<div>
					<div className='pb-1'>Select a song</div>
					<Input
						id='song_file'
						type='file'
						icon={BsFileEarmarkMusic as IconType}
						accept='.mp3'
						{...(register('song_file'),
						{ required: true },
						{
							onChange: (event) => {
								setValue('song_file', event.target.files[0]);
							},
						})}
					/>
					{errors.song_file && (
						<p className='text-rose-500'>{errors.song_file?.message}</p>
					)}
				</div>
			</div>
		</form>
	);

	return (
		<BaseModal
			isOpen={uiState.showUploadModal}
			body={bodyContent}
			disabled={isLoading}
			title='What is your music taste?'
			subtitle='Show us by uploading your music!'
			action='Upload'
			onClose={closeHandler}
			onSubmit={handleSubmit(onSubmit)}
		/>
	);
};

export default UploadSongModal;
