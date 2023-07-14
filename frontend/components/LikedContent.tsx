import { SongLikeResponse } from '../src/helpersConfig/types';
import HeartButton from './HeartButton';
import MediaItem from './Library/MediaItem';

interface LikedContentProps {
	songs: SongLikeResponse[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
	if (songs.length === 0)
		return (
			<div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
				User has not liked any songs.
			</div>
		);
	return (
		<div className='flex flex-col gap-y-2 w-full px-6'>
			{songs.map((like) => (
				<div
					key={like.id}
					className='flex items-center gap-x-4 w-full'
				>
					<div className='flex-1'>
						<MediaItem
							onClick={() => {}}
							data={like.song}
						/>
					</div>
					<HeartButton
						songId={like.song.id}
						isLiked={like.song.is_liked}
					/>
				</div>
			))}
		</div>
	);
};

export default LikedContent;
