import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useCallback, useState, useEffect } from 'react';
import { IconType } from 'react-icons';
import { likeSongAPI } from '../../../api/songAPI';
import { useAppSelector } from '../../../hooks/hooks';

interface HeartButtonProps {
	songId: string;
	isLiked: boolean;
}

const HeartButton: React.FC<HeartButtonProps> = ({ songId, isLiked }) => {
	const [likeState, setLikeState] = useState(false);
	const userState = useAppSelector((state) => state.user);

	useEffect(() => {
		setLikeState(isLiked);
	}, [isLiked]);

	const handleLikeBtn = useCallback(() => {
		if (!userState.token) return;
		void likeSongAPI(songId, userState.token, likeState, setLikeState);
	}, [likeState, songId, userState.token]);

	const Icon = (likeState ? AiFillHeart : AiOutlineHeart) as IconType;

	return (
		<button
			className='hover:opacity-75 transition'
			onClick={handleLikeBtn}
		>
			<Icon
				color={likeState ? '#22c55e' : 'white'}
				size={28}
			/>
		</button>
	);
};

export default HeartButton;
