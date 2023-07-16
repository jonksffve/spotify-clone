import { Slider } from 'antd';

interface SliderComponentProps {
	onChange: (value: number) => void;
	value: number;
}

const SliderComponent: React.FC<SliderComponentProps> = ({
	value,
	onChange,
}) => {
	return (
		<div className='w-full'>
			<Slider
				onChange={(value) => {
					onChange(value);
				}}
				value={value}
				min={0}
				max={1}
				step={0.1}
			/>
		</div>
	);
};

export default SliderComponent;
