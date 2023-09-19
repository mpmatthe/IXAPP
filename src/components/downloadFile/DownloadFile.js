import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { DownloadFileStyled } from './downloadFile.styled';

const DownloadFile = ({ title, json, csv }) => {
	return (
		<DownloadFileStyled spacing='.5rem' alignItems='center'>
			<Typography>{title}</Typography>
			<Stack direction='row' spacing={2}>
				<Link download href={json.href} target='_blank' underline='hover'>{json.label}</Link>
				<Link download href={csv.href} target='_blank' underline='hover'>{csv.label}</Link>
			</Stack>
		</DownloadFileStyled>
	);
};

export default DownloadFile;