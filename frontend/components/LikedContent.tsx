import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { Song, SongLikeResponse } from '../src/helpersConfig/types';
import HeartButton from './UI/Buttons/HeartButton';
import MediaItem from './Library/MediaItem';
import { uiActions } from '../store/slices/ui-slice';

interface LikedContentProps {
	songs: SongLikeResponse[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
	const dispatch = useAppDispatch();
	const [songObjs, setSongObjs] = useState<Song[]>([]);

	useEffect(() => {
		const formattedArray = songs.map((item) => item.song);
		setSongObjs(formattedArray);
	}, [songs]);

	const handlePlayBtn = useCallback(
		(song: Song) => {
			dispatch(uiActions.showMusicPlayer());
			dispatch(uiActions.setPlayerSong(song));
			dispatch(uiActions.setPlayerPlaylist(songObjs));
		},
		[dispatch, songObjs]
	);

	if (songs.length === 0)
		return (
			<div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
				User has not liked any songs.
			</div>
		);
	return (
		<div className='flex flex-col gap-y-2 w-full px-6'>
			{songObjs.map((song) => (
				<div
					key={song.id}
					className='flex items-center gap-x-4 w-full'
				>
					<div className='flex-1'>
						<MediaItem
							onClick={() => {
								handlePlayBtn(song);
							}}
							data={song}
						/>
					</div>
					<HeartButton
						songId={song.id}
						isLiked={song.is_liked}
					/>
				</div>
			))}
		</div>
	);
};

export default LikedContent;
