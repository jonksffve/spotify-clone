import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import ErrorPage from '../../pages/ErrorPage';
import IndexPage from '../../pages/IndexPage';

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
		],
	},
]);
