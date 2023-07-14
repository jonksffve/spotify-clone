import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { uiActions } from '../../store/slices/ui-slice';
import Spinner from '../UI/Spinner/Spinner';
import { Song } from '../../src/helpersConfig/types';
import MediaItem from './MediaItem';
import { getSongsAPI } from '../../api/songAPI';

const Library = () => {
	const dispatch = useAppDispatch();
	const userState = useAppSelector((state) => state.user);
	const [librarySongs, setLibrarySongs] = useState<Song[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!userState.token) return;

		void getSongsAPI(
			userState.token,
			setIsLoading,
			setLibrarySongs,
			new URLSearchParams({ user_only: '' })
		);
	}, [userState.token]);

	const addSongHandler = useCallback(() => {
		dispatch(uiActions.showUploadModal());
	}, [dispatch]);

	return (
		<div className='flex flex-col'>
			<div className='flex items-center justify-between px-5 pt-4'>
				<div className='inline-flex items-center gap-x-2'>
					<TbPlaylist
						className='text-neutral-400'
						size={26}
					/>
					<p className='text-neutral-400 font-medium text-md'> Your library</p>
				</div>
				<AiOutlinePlus
					className='text-neutral-400 cursor-pointer hover:text-white transition'
					size={20}
					onClick={addSongHandler}
				/>
			</div>
			<div className='flex flex-col gap-y-2 mt-4 px-3'>
				{isLoading ? (
					<Spinner />
				) : (
					<div>
						{librarySongs.map((song) => (
							<MediaItem
								key={song.id}
								data={song}
								onClick={() => {}}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Library;
