import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Input from './Input';

const SearchInput = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [query, setQuery] = useState('');

	useEffect(() => {
		const timer = setTimeout(() => {
			//After 500 second of typing, we then hit the backend
			if (query.trim() === '') {
				setSearchParams(new URLSearchParams());
				return;
			}

			setSearchParams(new URLSearchParams({ title: query }));
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, [query, searchParams, setSearchParams]);

	return (
		<div>
			<Input
				placeholder='Tell me what we are listening to...?'
				onChange={(e) => setQuery(e.target.value)}
			/>
		</div>
	);
};

export default SearchInput;
