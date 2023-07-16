import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/Navigation/Sidebar';
import LoginModal from '../../../components/Modals/LoginModal';
import RegisterModal from '../../../components/Modals/RegisterModal';
import UploadSongModal from '../../../components/Modals/UploadSongModal';
import { useAuth } from '../../../hooks/useAuth';
import MusicPlayer from '../../../components/Player/MusicPlayer';

const MainLayout = () => {
	useAuth();

	return (
		<div className='h-full flex'>
			<Sidebar />
			<main className='h-full flex-1 overflow-y-auto py-2'>
				<Outlet />
			</main>
			<LoginModal />
			<RegisterModal />
			<UploadSongModal />
			<MusicPlayer />
		</div>
	);
};

export default MainLayout;
