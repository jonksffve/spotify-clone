import { toast } from 'react-toastify';
import { toastifyOptions } from '../src/helpersConfig/toastifyConfig';
import {
	ENDPOINT_ACCOUNT,
	ENDPOINT_TOKEN_AUTH,
} from '../src/helpersConfig/routesConfig';
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

export const createTokenAuthAPI = async (
	data: object,
	setIsLoading: (value: boolean) => void
) => {
	type UserResponse = {
		token: string;
		user: {
			name: string;
			avatar: string;
			email: string;
		};
	};

	try {
		setIsLoading(true);
		const response = await axios.post(ENDPOINT_TOKEN_AUTH, data);
		return response.data as UserResponse;
	} catch (error) {
		toast.error('Could not log in, verify credentials.', toastifyOptions);
		throw error;
	} finally {
		setIsLoading(false);
	}
};
