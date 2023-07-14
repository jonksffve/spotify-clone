import { useEffect, useState } from 'react';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import PageContent from '../components/PageContent';
import { Song } from '../src/helpersConfig/types';
import { getSongsAPI } from '../api/songAPI';
import { useAppSelector } from '../hooks/hooks';
import { AxiosResponse } from 'axios';

const IndexPage = () => {
	const [songs, setSongs] = useState<Song[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const userState = useAppSelector((state) => state.user);

	useEffect(() => {
		if (!userState.token) return;

		getSongsAPI(userState.token, setIsLoading)
			.then((res) => {
				if (res) {
					setSongs(res);
				}
			})
			.catch((err) => console.log(err));
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
					<h2 className='text-white text-3xl font-semibold'>Welcome back</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
						<ListItem
							image='src/assets/liked.png'
							name='Liked songs'
							hrefTo='/'
						/>
					</div>
				</div>
			</Header>
			<div className='mt-2 mb-7 px-6'>
				<div className='flex flex-col'>
					<h2 className='text-white text-2xl font-semibold'>Newest songs</h2>
					<PageContent songs={songs} />
				</div>
			</div>
		</div>
	);
};

export default IndexPage;
