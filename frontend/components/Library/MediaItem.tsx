import { Song } from '../../src/helpersConfig/types';

interface MediaItemProps {
	data: Song;
	onClick?: (song: Song) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
	return (
		<div
			className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md'
			onClick={() => {
				if (onClick) onClick(data);
			}}
		>
			<div className='relative rounded-md min-h-[48px] max-h-[48px] min-w-[48px] max-w-[48px] overflow-hidden'>
				<img
					className='object-cover'
					src={data.cover_image}
					alt=''
				/>
			</div>
			<div className='flex flex-col gap-y-1 overflow-hidden'>
				<p className='text-white truncate'>{data.title}</p>
				<p className='text-neutral-400 text-sm truncate'>{data.song_author}</p>
			</div>
		</div>
	);
};

export default MediaItem;
