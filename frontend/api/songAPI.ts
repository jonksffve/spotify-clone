import { toast } from 'react-toastify';
import { toastifyOptions } from '../src/helpersConfig/toastifyConfig';
import axios from 'axios';
import { ENDPOINT_SONG } from '../src/helpersConfig/routesConfig';
import { UploadSongInputs } from '../components/Modals/UploadSongModal';

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
		toast.success('Music uploaded successfully!');
	} catch (error) {
		console.log(error);
		toast.error('Something happened', toastifyOptions);
	} finally {
		setIsLoading(false);
	}
};
