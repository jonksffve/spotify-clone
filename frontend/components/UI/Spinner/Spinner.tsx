import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = (
	<LoadingOutlined
		style={{ fontSize: 35 }}
		spin
	/>
);

const Spinner = () => {
	return (
		<Spin
			indicator={antIcon}
			className='mt-4'
		/>
	);
};

export default Spinner;
