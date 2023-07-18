import { useCallback } from 'react';
import { Song } from '../src/helpersConfig/types';
import SongItem from './Player/SongItem';
import { useAppDispatch } from '../hooks/hooks';
import { uiActions } from '../store/slices/ui-slice';

interface PageContentProps {
	songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
	const dispatch = useAppDispatch();

	const handlePlayBtn = useCallback(
		(song: Song) => {
			dispatch(uiActions.showMusicPlayer());
			dispatch(uiActions.setPlayerSong(song));
			dispatch(uiActions.setPlayerPlaylist(songs));
		},
		[dispatch, songs]
	);

	if (songs.length === 0) {
		return (
			<div className='mt-4 text-neutral-400'>No songs have been added.</div>
		);
	}

	return (
		<div
			className='grid 
						grid-cols-2 
						sm:grid-cols-3 
						md:grid-cols-3
						lg:grid-cols-4
						xl:grid-cols-5
						2xl:grid-cols-8
						gap-4
						mt-4'
		>
			{songs.map((song) => (
				<SongItem
					key={song.id}
					onClick={handlePlayBtn}
					data={song}
				/>
			))}
		</div>
	);
};

export default PageContent;
