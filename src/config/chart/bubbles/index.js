import {
	BubbleController,
	Chart as ChartJS,
	Legend,
	LinearScale,
	PointElement,
	SubTitle,
	Title,
	Tooltip
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import elementsOptions from './elementsOptions';
import animationOptions from './animationOptions';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, zoomPlugin, Title, SubTitle, BubbleController);

const options = {
	responsive: true,
	aspectRatio: 1,
	events: ['dblclick', 'mousemove'],
	elements: elementsOptions,
	clip: 0,
	layout: {
		padding: 10
	},
	...animationOptions
};

export default options;