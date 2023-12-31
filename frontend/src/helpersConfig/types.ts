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

export interface RegisterFormInput {
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	password: string;
	avatar: File | null | undefined;
}

export interface UploadSongInputs {
	title: string;
	song_author: string;
	cover_image: File | null | undefined;
	song_file: File | null | undefined;
}

export interface LoginFormInput {
	username: string;
	password: string;
}

export interface Song {
	id: string;
	title: string;
	song_author: string;
	cover_image: string;
	song_file: string;
	user: string;
	is_liked: boolean;
}

export interface SongLikeResponse {
	id: string;
	user: string;
	song: Song;
}
