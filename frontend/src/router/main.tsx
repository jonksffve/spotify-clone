import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import ErrorPage from '../../pages/ErrorPage';
import IndexPage from '../../pages/IndexPage';
import SearchPage from '../../pages/SearchPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <IndexPage />,
			},
			{
				path: 'search/',
				element: <SearchPage />,
			},
			{
				path: 'liked/',
				element: <div>Liked music</div>,
			},
		],
	},
]);
