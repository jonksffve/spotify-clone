import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
	token: string | undefined;
	name: string | undefined;
	avatar: string | undefined;
	email: string | undefined;
	logged: boolean | undefined;
}

const initialState: UserState = {
	token: undefined,
	name: undefined,
	avatar: undefined,
	email: undefined,
	logged: undefined,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState>) => {
			const { token, name, avatar, email, logged } = action.payload;
			state.token = token;
			state.name = name;
			state.avatar = avatar;
			state.email = email;
			state.logged = logged;
		},
		removeUser: (state) => {
			state.token = undefined;
			state.name = undefined;
			state.avatar = undefined;
			state.email = undefined;
			state.logged = undefined;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
