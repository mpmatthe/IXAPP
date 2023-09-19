import React from 'react';
import { Bubble } from 'react-chartjs-2';
import options from '../../config/chart/bubbles';
import Box from '@mui/material/Box';
import pluginsOptions from '../../config/chart/bubbles/pluginsOptions';
import zoomOptions from '../../config/chart/bubbles/zoomOptions';
import externalPlugins from '../../config/chart/bubbles/externalPlugins';
import { discoverInteractiveMapLegendContainerId } from '../../constants';

const DiscoverBubblesChart = ({ chartData, chartAxiosValues }) => (
	<Box>
		<Bubble
			data={chartData}
			plugins={externalPlugins}
			options={{
				...options,
				plugins: {
					...pluginsOptions,
					zoom: {
						...zoomOptions,
						limits: chartAxiosValues
					}
				},
				scales: chartAxiosValues
			}}
		/>
		<Box id={discoverInteractiveMapLegendContainerId}/>
	</Box>
);

export default DiscoverBubblesChart;