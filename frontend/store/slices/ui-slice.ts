import { createSlice } from '@reduxjs/toolkit';

interface UiState {
	showLoginModal: boolean;
	showRegisterModal: boolean;
}

const initialState: UiState = {
	showLoginModal: false,
	showRegisterModal: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		showLoginModal: (state) => {
			state.showLoginModal = true;
		},
		closeLoginModal: (state) => {
			state.showLoginModal = false;
		},
		showRegisterModal: (state) => {
			state.showRegisterModal = true;
		},
		closeRegisterModal: (state) => {
			state.showRegisterModal = false;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
