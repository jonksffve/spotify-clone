import { toast } from 'react-toastify';
import { toastifyOptions } from '../src/helpersConfig/toastifyConfig';
import {
	ENDPOINT_ACCOUNT,
	ENDPOINT_TOKEN_AUTH,
} from '../src/helpersConfig/routesConfig';
import axios from 'axios';
import { RegisterFormInput } from '../components/Modals/RegisterModal';

export interface UserResponse {
	token: string;
	user: {
		name: string;
		avatar: string;
		email: string;
	};
}

export interface ErrorResponse {
	key: string;
	value: string;
}

export const createUserAPI = async (
	data: RegisterFormInput,
	setIsLoading: (value: boolean) => void
) => {
	try {
		setIsLoading(true);
		await axios.post(ENDPOINT_ACCOUNT, data, {
			headers: {
				'content-type': 'multipart/form-data',
			},
		});
		toast.success('Account created successfully', toastifyOptions);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw error;
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
	try {
		setIsLoading(true);
		const response = await axios.post(ENDPOINT_TOKEN_AUTH, data);
		toast.success('Welcome back user, enjoy.', toastifyOptions);
		return response.data as UserResponse;
	} catch (error) {
		toast.error('Could not log in, verify credentials.', toastifyOptions);
		throw error;
	} finally {
		setIsLoading(false);
	}
};

export const getUserInformationAPI = async (token: string) => {
	try {
		const response = await axios.get(`${ENDPOINT_ACCOUNT}${token}/`, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		return response.data as UserResponse;
	} catch (error) {
		toast.error('Could not fetch information', toastifyOptions);
		throw error;
	}
};
