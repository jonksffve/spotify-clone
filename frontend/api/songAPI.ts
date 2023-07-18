import { toast } from 'react-toastify';
import { toastifyOptions } from '../src/helpersConfig/toastifyConfig';
import axios from 'axios';
import {
	ENDPOINT_SONG,
	ENDPOINT_SONG_LIKE,
} from '../src/helpersConfig/routesConfig';
import {
	Song,
	SongLikeResponse,
	UploadSongInputs,
} from '../src/helpersConfig/types';

/**
 * Function that creates a Song model instance
 *
 * @async
 * @param data FormData containing the song information
 * @param token Permission value to handle the request
 * @param setIsLoading Callback to set component's loading state
 */
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

/**
 * Function that retrieves a queryset containing Songs and updates components state
 *
 * @async
 * @param token Permission value to handle requests
 * @param setIsLoading Callback that sets the component's loading state
 * @param setData Callback that sets the component's Song[] state
 * @param [query] Optional: Value used to filter the queryset data returned from server
 */
export const getSongsAPI = async (
	token: string,
	setIsLoading: (value: boolean) => void,
	setData: (data: Song[]) => void,
	query?: URLSearchParams
) => {
	try {
		setIsLoading(true);

		let url = ENDPOINT_SONG;

		if (query) {
			url += `?${query.toString()}`;
		}

		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		setData(response.data as Song[]);
	} catch (error) {
		toast.error('Something happened', toastifyOptions);
	} finally {
		setIsLoading(false);
	}
};

/**
 * Function that retrieves a queryset containing Liked Songs and updates components state
 *
 * @async
 * @param token Permission value to handle requests
 * @param setIsLoading Callback that sets component's loading state
 * @param setData Callback that sets the component's SongLikeReponse[] state
 */
export const getLikedSongsAPI = async (
	token: string,
	setIsLoading: (value: boolean) => void,
	setData: (values: SongLikeResponse[]) => void
) => {
	try {
		setIsLoading(true);
		const response = await axios.get(ENDPOINT_SONG_LIKE, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		setData(response.data as SongLikeResponse[]);
	} catch (error) {
		toast.error('Could not fetch data', toastifyOptions);
	} finally {
		setIsLoading(false);
	}
};

/**
 * Function that handles both creation/deletion of LikeSong model instances
 *
 * @async
 * @param songId Identifier of the Song model instance
 * @param token Permission to handle the request
 * @param isLiked Boolean that determines if we create or destroy an instance
 * @param setIsLiked Callback that sets the component's like state
 */
export const likeSongAPI = async (
	songId: string,
	token: string,
	isLiked: boolean,
	setIsLiked: (value: boolean) => void
) => {
	try {
		if (isLiked) {
			await axios.delete(`${ENDPOINT_SONG_LIKE}${songId}/`, {
				headers: {
					Authorization: `Token ${token}`,
				},
			});
		} else {
			await axios.post(
				ENDPOINT_SONG_LIKE,
				{
					song: songId,
				},
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			);
		}
		setIsLiked(!isLiked);
	} catch (error) {
		toast.error('Could not like song', toastifyOptions);
	}
};
