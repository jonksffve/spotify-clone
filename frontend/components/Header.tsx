import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Button from './UI/Button';
import { uiActions } from '../store/slices/ui-slice';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { userActions } from '../store/slices/user-slice';
import { FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
	children: React.ReactNode;
	className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const navigate = useNavigate();

	const loginBtnHandler = useCallback(() => {
		dispatch(uiActions.showLoginModal());
	}, [dispatch]);

	const signUpBtnHandler = useCallback(() => {
		dispatch(uiActions.showRegisterModal());
	}, [dispatch]);

	const logoutBtnHandler = useCallback(() => {
		dispatch(userActions.removeUser());
		dispatch(uiActions.resetPlayer());
		localStorage.removeItem('token_auth');
		navigate('/');
		navigate(0);
	}, [dispatch, navigate]);

	return (
		<div
			className={twMerge(
				`h-fit bg-gradient-to-b from-emerald-800 p-6`,
				className
			)}
		>
			<div className='w-full mb-4 flex items-center justify-between'>
				<div className='hidden md:flex gap-x-2 items-center'>
					<button
						onClick={() => {}}
						className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'
					>
						<RxCaretLeft
							className='text-white'
							size={35}
						/>
					</button>
					<button
						onClick={() => {}}
						className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'
					>
						<RxCaretRight
							className='text-white'
							size={35}
						/>
					</button>
				</div>
				<div className='flex md:hidden gap-x-2 items-center'>
					<button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
						<HiHome
							className='text-black'
							size={20}
						/>
					</button>
					<button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
						<BiSearch
							className='text-black'
							size={20}
						/>
					</button>
				</div>
				<div className='flex justify-between items-center gap-x-4'>
					{user.logged ? (
						<div className='flex gap-x-4 items-center'>
							<Button
								className='bg-white px-6 py-2'
								onClick={logoutBtnHandler}
							>
								Logout
							</Button>
							<Button
								className='bg-white'
								onClick={() => {}}
							>
								<FaUserAlt />
							</Button>
						</div>
					) : (
						<>
							<div>
								<Button
									className='bg-transparent text-neutral-300 font-medium'
									onClick={signUpBtnHandler}
								>
									Sign up
								</Button>
							</div>
							<div>
								<Button
									className='bg-white px-6 py-2'
									onClick={loginBtnHandler}
								>
									Log in
								</Button>
							</div>
						</>
					)}
				</div>
			</div>
			{children}
		</div>
	);
};

export default Header;
