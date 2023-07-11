import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
	token: string;
	name: string;
	avatar: string;
	email: string;
}

const initialState: UserState = {
	token: '',
	name: '',
	avatar: '',
	email: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState>) => {
			const { token, name, avatar, email } = action.payload;
			state.token = token;
			state.name = name;
			state.avatar = avatar;
			state.email = email;
		},
		removeUser: (state) => {
			state.token = '';
			state.name = '';
			state.avatar = '';
			state.email = '';
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
