import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/Navigation/Sidebar';
import LoginModal from '../../../components/Modals/LoginModal';

const MainLayout = () => {
	return (
		<div className='h-full flex'>
			<Sidebar />
			<main className='h-full flex-1 overflow-y-auto py-2'>
				<Outlet />
			</main>
			<LoginModal />
		</div>
	);
};

export default MainLayout;
