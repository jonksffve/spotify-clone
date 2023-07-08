import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

interface ListItemProps {
	image: string;
	name: string;
	hrefTo: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, hrefTo }) => {
	return (
		<Link
			to={hrefTo}
			className='relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4'
		>
			<div className='relative max-h-[64px] max-w-[64px]'>
				<img
					className='object-cover'
					src={image}
					alt='image'
				/>
			</div>
			<p className='font-medium truncate py-5'>{name}</p>
			<div className='absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110'>
				<FaPlay className='text-black' />
			</div>
		</Link>
	);
};

export default ListItem;
