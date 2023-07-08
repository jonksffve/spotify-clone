import Header from '../components/Header';
import ListItem from '../components/ListItem';

const IndexPage = () => {
	return (
		<div
			className='bg-neutral-900
                            rounded-lg
                            h-full
                            w-full
                            overflow-hidden
                            overflow-y-auto'
		>
			<Header>
				<div className='mb-2'>
					<h2 className='text-white text-3xl font-semibold'>Welcome back</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
						<ListItem
							image='src/assets/liked.png'
							name='Liked songs'
							hrefTo='/'
						/>
					</div>
				</div>
			</Header>
			<div className='mt-2 mb-7 px-6'>
				<div className='flex justify-between items-center'>
					<h2 className='text-white text-2xl font-semibold'>Newest songs</h2>
				</div>
			</div>
			<h2>Good morning starshine, the earth says HELLO!</h2>
		</div>
	);
};

export default IndexPage;
