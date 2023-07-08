import { Link } from 'react-router-dom';
import { ROUTE_HOME } from '../src/helpersConfig/routesConfig';

const ErrorPage = () => {
	return (
		<div className='flex justify-center items-center h-full flex-col gap-4'>
			<div className='font-bold text-2xl'>404 - Page not found</div>
			<div className='text-md'>
				<span className='text-rose-500 font-bold text-xl'>OOPS!</span> Something
				went wrong with your request. Either this page doesn't exist or it was
				removed
			</div>
			<div className='mt-4'>
				<Link
					className='p-2 rounded bg-neutral-200 text-black'
					to={ROUTE_HOME}
				>
					Go HOME
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;
