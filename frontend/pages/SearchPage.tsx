import { useEffect, useState, useCallback } from 'react';
import Header from '../components/Navigation/Header';
import SearchContent from '../components/SearchContent';
import SearchInput from '../components/UI/Inputs/SearchInput';
import { Song } from '../src/helpersConfig/types';
import { useSearchParams } from 'react-router-dom';
import { getSongsAPI } from '../api/songAPI';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { uiActions } from '../store/slices/ui-slice';

const SearchPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [songs, setSongs] = useState<Song[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const userState = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!userState.token || !searchParams.has('title')) {
			setSongs([]);
			return;
		}

		void getSongsAPI(userState.token, setIsLoading, setSongs, searchParams);
	}, [searchParams, userState.token]);

	const handleClick = useCallback(
		(song: Song) => {
			dispatch(uiActions.showMusicPlayer());
			dispatch(uiActions.setPlayerSong(song));
			dispatch(uiActions.setPlayerPlaylist(songs));
		},
		[dispatch, songs]
	);

	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
			<Header className='from-bg-neutral-900'>
				<div className='mb-2 flex flex-col gap-y-6'>
					<h2>Search</h2>
					<SearchInput />
				</div>
			</Header>
			<SearchContent
				songs={songs}
				isLoading={isLoading}
				onClick={handleClick}
			/>
		</div>
	);
};

export default SearchPage;
