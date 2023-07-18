import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { Song } from '../../src/helpersConfig/types';
import HeartButton from '../UI/Buttons/HeartButton';
import MediaItem from '../Library/MediaItem';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import Slider from './Slider';
import { useCallback, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import useSound from 'use-sound';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { uiActions } from '../../store/slices/ui-slice';

interface PlayerContentProps {
	song: Song;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song }) => {
	const [volume, setVolume] = useState<number>(0.3);
	const [isPlaying, setIsPlaying] = useState(false);
	const uiState = useAppSelector((state) => state.ui);
	const dispatch = useAppDispatch();

	const [play, { pause, sound }] = useSound(song.song_file, {
		volume,
		onplay: () => setIsPlaying(true),
		onend: () => {
			setIsPlaying(false);
			onPlayNext();
		},
		onpause: () => setIsPlaying(false),
		format: ['mp3'],
	});

	const handlePlay = () => {
		isPlaying ? pause() : play();
	};

	const toggleMute = () => {
		volume === 0 ? setVolume(0.3) : setVolume(0);
	};

	useEffect(() => {
		sound?.play();

		return () => {
			sound?.unload();
		};
	}, [sound]);

	const Icon = (isPlaying ? BsPauseFill : BsPlayFill) as IconType;
	const VolumeIcon = (
		volume === 0 ? HiSpeakerXMark : HiSpeakerWave
	) as IconType;

	const onPlayNext = useCallback(() => {
		if (uiState.playlist?.length === 0) return;

		const currentSongIndex = uiState.playlist!.findIndex(
			(item) => item.id === song.id
		);

		const nextSong = uiState.playlist![currentSongIndex + 1];

		if (!nextSong) {
			return dispatch(uiActions.setPlayerSong(uiState.playlist![0]));
		}

		dispatch(uiActions.setPlayerSong(nextSong));
	}, [dispatch, song.id, uiState.playlist]);

	const onPlayPrevious = useCallback(() => {
		if (uiState.playlist?.length === 0) return;

		const currentSongIndex = uiState.playlist!.findIndex(
			(item) => item.id === song.id
		);

		const prevSong = uiState.playlist![currentSongIndex - 1];

		if (!prevSong) {
			return dispatch(
				uiActions.setPlayerSong(uiState.playlist![uiState.playlist!.length - 1])
			);
		}

		dispatch(uiActions.setPlayerSong(prevSong));
	}, [dispatch, song.id, uiState.playlist]);

	return (
		<div className='grid grid-cols-2 md:grid-cols-3 h-full'>
			<div className='flex w-full justify-start'>
				<div className='flex items-center gap-x-4'>
					<MediaItem data={song} />
					<HeartButton
						songId={song.id}
						isLiked={song.is_liked}
					/>
				</div>
			</div>
			<div className='flex md:hidden col-auto w-full justify-end items-center'>
				<div
					onClick={handlePlay}
					className='h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer'
				>
					<Icon
						size={30}
						className='text-black'
					/>
				</div>
			</div>
			<div className='hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6'>
				<AiFillStepBackward
					className='text-neutral-400 cursor-pointer hover:text-white transition'
					onClick={onPlayPrevious}
					size={30}
				/>
				<div
					onClick={handlePlay}
					className='flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer'
				>
					<Icon
						size={30}
						className='text-black'
					/>
				</div>
				<AiFillStepForward
					className='text-neutral-400 cursor-pointer hover:text-white transition'
					onClick={onPlayNext}
					size={30}
				/>
			</div>

			<div className='hidden md:flex w-full justify-end pr-2'>
				<div className='flex items-center gap-x-2 w-[120px]'>
					<VolumeIcon
						onClick={toggleMute}
						className='cursor-pointer'
						size={34}
					/>
					<Slider
						onChange={setVolume}
						value={volume}
					/>
				</div>
			</div>
		</div>
	);
};

export default PlayerContent;
