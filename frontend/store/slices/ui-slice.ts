import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../../src/helpersConfig/types';

interface UiState {
	showLoginModal: boolean;
	showRegisterModal: boolean;
	showUploadModal: boolean;
	showMusicPlayer: boolean;
	song: Song | undefined;
	playlist: Song[] | undefined;
}

const initialState: UiState = {
	showLoginModal: false,
	showRegisterModal: false,
	showUploadModal: false,
	showMusicPlayer: false,
	song: undefined,
	playlist: undefined,
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
		showUploadModal: (state) => {
			state.showUploadModal = true;
		},
		closeUploadModal: (state) => {
			state.showUploadModal = false;
		},
		showMusicPlayer: (state) => {
			state.showMusicPlayer = true;
		},
		closeMusicPlayer: (state) => {
			state.showMusicPlayer = false;
		},
		setPlayerSong: (state, action: PayloadAction<Song>) => {
			state.song = action.payload;
		},
		setPlayerPlaylist: (state, action: PayloadAction<Song[]>) => {
			state.playlist = action.payload;
		},
		resetPlayer: (state) => {
			state.showMusicPlayer = false;
			state.song = undefined;
			state.playlist = undefined;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
