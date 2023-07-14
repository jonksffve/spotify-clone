import { toast } from 'react-toastify';
import { toastifyOptions } from '../src/helpersConfig/toastifyConfig';
import axios from 'axios';
import { ENDPOINT_SONG } from '../src/helpersConfig/routesConfig';
import { Song, UploadSongInputs } from '../src/helpersConfig/types';

export const createSongAPI = async (
	data: UploadSongInputs,
	token: string,
	setIsLoading: (value: boolean) => void
) => {
	try {
		setIsLoading(true);
		await axios.post(ENDPOINT_SONG, data, {
			headers: {
				Authorization: `Token ${token}`,
				'content-type': 'multipart/form-data',
			},
		});
		toast.success('Music uploaded successfully!', toastifyOptions);
	} catch (error) {
		toast.error('Something happened', toastifyOptions);
	} finally {
		setIsLoading(false);
	}
};

export const getSongsAPI = async (
	token: string,
	setIsLoading: (value: boolean) => void,
	query?: string
) => {
	try {
		setIsLoading(true);

		let url = ENDPOINT_SONG;

		if (query) {
			url += `?${query}`;
		}

		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		return response.data as Song[];
	} catch (error) {
		toast.error('Something happened', toastifyOptions);
	} finally {
		setIsLoading(false);
	}
};
