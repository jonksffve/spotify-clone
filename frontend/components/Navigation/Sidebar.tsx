import Box from '../UI/Box';
import SidebarItem from './SidebarItem';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import { IconType } from 'react-icons';
import { ROUTE_HOME, ROUTE_SEARCH } from '../../src/helpersConfig/routesConfig';
import Library from '../Library/Library';

const Sidebar = () => {
	return (
		<div className='flex h-full'>
			<div
				className='hidden 
							md:flex
							flex-col
							gap-y-2
							bg-black
							h-full
							w-[300px]
							p-2'
			>
				<Box>
					<div className='flex flex-col gap-y-4 px-5 py-4'>
						<SidebarItem
							icon={AiFillHome as IconType}
							label='Home'
							toHref={ROUTE_HOME}
						/>
						<SidebarItem
							icon={AiOutlineSearch as IconType}
							label='Search'
							toHref={ROUTE_SEARCH}
						/>
					</div>
				</Box>
				<Box className='overflow-y-auto h-full'>
					<Library />
				</Box>
			</div>
		</div>
	);
};

export default Sidebar;
