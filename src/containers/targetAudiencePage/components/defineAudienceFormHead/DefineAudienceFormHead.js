import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { memo } from 'react';

const DefineAudienceFormHead = ({ title, subtitle }) => (
	<Box>
		<Typography variant='h6'>
			{title}
		</Typography>
		<Typography variant='body1'>
			{subtitle}
		</Typography>
	</Box>
);

export default memo(DefineAudienceFormHead);