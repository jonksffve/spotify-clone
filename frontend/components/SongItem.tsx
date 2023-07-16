import { Song } from '../src/helpersConfig/types';
import PlayButton from './UI/Buttons/PlayButton';

interface SongItemProps {
	data: Song;
	onClick: (value: Song) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
	return (
		<div className='relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3'>
			<div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
				<img
					src={data.cover_image}
					className='object-cover'
					alt=''
				/>
			</div>
			<div className='flex flex-col items-start w-full pt-4 gap-y-1'>
				<p className='font-semibold truncate w-full'>{data.title}</p>
				<p className='text-neutral-400 text-sm pb-4 w-full truncate'>
					By: {data.song_author}
				</p>
			</div>
			<div
				className='absolute bottom-24 right-5'
				onClick={() => {
					onClick(data);
				}}
			>
				<PlayButton />
			</div>
		</div>
	);
};

export default SongItem;
