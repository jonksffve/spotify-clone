import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import PlayerContent from './PlayerContent';

const MusicPlayer = () => {
	const uiState = useAppSelector((state) => state.ui);
	const [showPlayer, setShowPlayer] = useState(uiState.showMusicPlayer);

	useEffect(() => {
		setShowPlayer(uiState.showMusicPlayer);
	}, [uiState.showMusicPlayer]);

	if (!showPlayer || !uiState.song) return undefined;

	return (
		<div className='fixed bottom-0 bg-black w-full py-2 h-[80px] px-4'>
			<PlayerContent
				key={uiState.song.song_file}
				song={uiState.song}
			/>
		</div>
	);
};

export default MusicPlayer;
