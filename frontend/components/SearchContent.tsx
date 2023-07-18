import { Song } from '../src/helpersConfig/types';
import HeartButton from './UI/Buttons/HeartButton';
import MediaItem from './Library/MediaItem';
import Spinner from './UI/Spinner/Spinner';

interface SearchContentProps {
	songs: Song[];
	isLoading: boolean;
	onClick: (song: Song) => void;
}

const SearchContent: React.FC<SearchContentProps> = ({
	songs,
	isLoading,
	onClick,
}) => {
	if (songs.length === 0)
		return (
			<div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
				No data has been found
			</div>
		);
	return (
		<>
			{isLoading && (
				<div className='text-center'>
					<Spinner />
				</div>
			)}
			{!isLoading && (
				<div className='flex flex-col gap-y-2 w-full px-6'>
					{songs.map((song) => (
						<div
							key={song.id}
							className='flex items-center gap-x-4 w-full'
						>
							<div className='flex-1'>
								<MediaItem
									onClick={() => {
										onClick(song);
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
			)}
		</>
	);
};

export default SearchContent;
