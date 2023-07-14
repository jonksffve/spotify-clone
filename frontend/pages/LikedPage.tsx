import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { SongLikeResponse } from '../src/helpersConfig/types';
import { useAppSelector } from '../hooks/hooks';
import LikedContent from '../components/LikedContent';
import { getLikedSongsAPI } from '../api/songAPI';

const LikedPage = () => {
	const [likedSongs, setLikedSongs] = useState<SongLikeResponse[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const userState = useAppSelector((state) => state.user);

	useEffect(() => {
		if (!userState.token) return;
		void getLikedSongsAPI(userState.token, setIsLoading, setLikedSongs);
	}, [userState.token]);

	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
			<Header>
				<div className='mt-20'>
					<div className='flex flex-col md:flex-row items-center gap-x-5'>
						<div className='relative h-32 w-32 lg:h-44 lg:w-44'>
							<img
								className='object-cover'
								src='/src/assets/liked.png'
								alt=''
							/>
						</div>
						<div className='flex flex-col gap-y-2 mt-4 md:mt-0'>
							<p className='hidden md:block font-semibold text-sm'> Playlist</p>
							<h2 className='text-white text-4xl sm:text-5xl lg:text-7xl font-bold'>
								Liked songs
							</h2>
						</div>
					</div>
				</div>
			</Header>
			<LikedContent songs={likedSongs} />
		</div>
	);
};

export default LikedPage;
