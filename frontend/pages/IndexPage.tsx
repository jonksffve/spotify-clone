import { useEffect, useState } from 'react';
import Header from '../components/Navigation/Header';
import ListItem from '../components/ListItem';
import PageContent from '../components/PageContent';
import { Song } from '../src/helpersConfig/types';
import { getSongsAPI } from '../api/songAPI';
import { useAppSelector } from '../hooks/hooks';
import { ROUTE_LIKED } from '../src/helpersConfig/routesConfig';
import Spinner from '../components/UI/Spinner/Spinner';

const IndexPage = () => {
	const [songs, setSongs] = useState<Song[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const userState = useAppSelector((state) => state.user);

	useEffect(() => {
		if (!userState.token) return;
		void getSongsAPI(userState.token, setIsLoading, setSongs);
	}, [userState.token]);

	return (
		<div
			className='bg-neutral-900
                            rounded-lg
                            h-full
                            w-full
                            overflow-hidden
                            overflow-y-auto'
		>
			<Header>
				<div className='mb-2'>
					{userState.token && (
						<>
							<h2 className='text-white text-3xl font-semibold'>
								Welcome back
							</h2>
							<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
								<ListItem
									image='src/assets/liked.png'
									name='Liked songs'
									hrefTo={ROUTE_LIKED}
								/>
							</div>
						</>
					)}
					{!userState.token && (
						<h2 className='text-white text-3xl font-semibold'>
							Please log in!
						</h2>
					)}
				</div>
			</Header>
			<div className='mt-2 mb-7 px-6'>
				<div className='flex flex-col'>
					{userState.token && isLoading && <Spinner />}
					{userState.token && !isLoading && (
						<>
							<h2 className='text-white text-2xl font-semibold'>
								Newest songs
							</h2>
							<PageContent songs={songs} />
						</>
					)}
					{!userState.token && (
						<h2 className='text-white text-2xl font-semibold'>
							Log in to enjoy all the music!
						</h2>
					)}
				</div>
			</div>
		</div>
	);
};

export default IndexPage;
