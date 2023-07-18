import { toast } from 'react-toastify';
import { toastifyOptions } from '../src/helpersConfig/toastifyConfig';
import {
	ENDPOINT_ACCOUNT,
	ENDPOINT_TOKEN_AUTH,
} from '../src/helpersConfig/routesConfig';
import axios from 'axios';
import {
	LoginFormInput,
	RegisterFormInput,
	UserResponse,
} from '../src/helpersConfig/types';

/**
 * Function that creates an User modal instance
 *
 * @async
 * @param data FormData payload to be sent to server
 * @param setIsLoading Callback that sets the component's loading state
 * @throws {AxiosError} Object with messages if it went wrong
 */
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

/**
 * Function that authenticates an user with the given data
 *
 * @async
 * @param data FormData payload with username, password
 * @param setIsLoading Callback that sets the component's loading state
 * @returns User object containing authorization token and user information
 * @throws Error object with messages if it went wrong
 */
export const createTokenAuthAPI = async (
	data: LoginFormInput,
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

/**
 * Function that gets the information about the locally loggedin user
 *
 * @async
 * @param token User permission value to handle requests
 * @returns User object data as a response
 * @throws Error object with messages if it went wrong
 */
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
