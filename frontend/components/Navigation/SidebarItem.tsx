import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

interface SidebarItemProps {
	icon: IconType;
	label: string;
	toHref: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
	icon: Icon,
	label,
	toHref,
}) => {
	return (
		<NavLink
			to={toHref}
			className='flex
						flex-row
						h-auto
						items-center
						w-full
						gap-x-4
						text-md
						font-medium
						cursor-pointer
						hover:text-white
						transition
						text-neutral-400
						py-1'
			style={({ isActive }) => {
				return {
					color: isActive ? 'white' : '',
				};
			}}
		>
			<Icon size={26} />
			<p className='truncate w-full'>{label}</p>
		</NavLink>
	);
};

export default SidebarItem;
