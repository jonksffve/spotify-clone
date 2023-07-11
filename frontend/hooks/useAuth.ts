import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { userActions } from '../store/slices/user-slice';
import { getUserInformationAPI } from '../api/authAPI';
import { uiActions } from '../store/slices/ui-slice';

export const useAuth = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const local_token = localStorage.getItem('token_auth');

		//user is not logged in (local storage based)
		if (!local_token) {
			dispatch(uiActions.showLoginModal());
			return;
		}

		//fetch user information with the backend API and set the user state
		getUserInformationAPI(local_token)
			.then((response) => {
				const { user, token } = response;
				dispatch(userActions.setUser({ ...user, token, logged: true }));
			})
			.catch((err) => {
				console.log(err);
			});
	}, [dispatch]);
};
