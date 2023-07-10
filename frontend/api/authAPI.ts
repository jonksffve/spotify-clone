import { toast } from 'react-toastify';
import { toastifyOptions } from '../src/helpersConfig/toastifyConfig';
import { ENDPOINT_ACCOUNT } from '../src/helpersConfig/routesConfig';
import axios from 'axios';

export const createUserAPI = async (
	data: object,
	setIsLoading: (value: boolean) => void
) => {
	type ErrorResponse = {
		key: string;
		value: string;
	};

	try {
		setIsLoading(true);
		await axios.post(ENDPOINT_ACCOUNT, data);
		toast.success('Account created successfully', toastifyOptions);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const data = error.response?.data as ErrorResponse;
			for (const err in data) {
				toast.error(
					`${err}: ${data[err as keyof ErrorResponse]}`,
					toastifyOptions
				);
			}
		} else {
			toast.error('An unexpected error occurred', toastifyOptions);
		}
	} finally {
		setIsLoading(false);
	}
};
