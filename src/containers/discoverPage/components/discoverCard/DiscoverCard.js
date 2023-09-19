import React from 'react';
import { Stack, Typography } from '@mui/material';
import DiscoverActions from '../discoverActions/DiscoverActions';
import DiscoverBubblesChart from '../../../../components/discoverBubblesChart/DiscoverBubblesChart';
import Alert from '@mui/material/Alert';
import Card from '../../../../components/card/Card';

const DiscoverCard = ({ chartData, chartAxiosValues, ...props }) => {
	const bubblesChartMarkup = chartAxiosValues
		? <DiscoverBubblesChart chartData={chartData} chartAxiosValues={chartAxiosValues}/>
		: (
			<Stack justifyContent='center' alignItems='center' height='100%'>
				<Alert severity='warning'>
					<Typography>
						To display the interactive map, please specify X and Y coordinates in the downloaded file
					</Typography>
				</Alert>
			</Stack>
		);

	return (
		<Card>
			<Card.Info width='36rem'>
				<DiscoverActions {...props}/>
			</Card.Info>
			<Card.Actions>
				{bubblesChartMarkup}
			</Card.Actions>
		</Card>
	);
};

export default DiscoverCard;