import { alpha, styled } from '@mui/material';
import Stack from '@mui/material/Stack';

export const DownloadFileStyled = styled(Stack, {
	name: 'DownloadFile',
	slot: 'Root'
})(({ theme }) => ({
	backgroundColor: alpha(theme.palette.warning.light, .1),
	padding: '1rem',
	width: '100%'
}));