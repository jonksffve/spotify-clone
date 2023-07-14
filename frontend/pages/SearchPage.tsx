import { useEffect, useState } from 'react';
import Header from '../components/Header';
import SearchContent from '../components/SearchContent';
import SearchInput from '../components/UI/Inputs/SearchInput';
import { Song } from '../src/helpersConfig/types';
import { useSearchParams } from 'react-router-dom';
import { getSongsAPI } from '../api/songAPI';
import { useAppSelector } from '../hooks/hooks';

const SearchPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [songs, setSongs] = useState<Song[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const userState = useAppSelector((state) => state.user);

	useEffect(() => {
		if (!userState.token || !searchParams.has('title')) {
			setSongs([]);
			return;
		}

		getSongsAPI(userState.token, setIsLoading, searchParams)
			.then((res) => {
				if (!res) return;
				setSongs(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [searchParams, userState.token]);

	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
			<Header className='from-bg-neutral-900'>
				<div className='mb-2 flex flex-col gap-y-6'>
					<h2>Search</h2>
					<SearchInput />
				</div>
			</Header>
			<SearchContent songs={songs} />
		</div>
	);
};

export default SearchPage;
