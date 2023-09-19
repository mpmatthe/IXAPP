import Stack from '@mui/material/Stack';
import Button from '../../../../components/button/Button';
import { memo } from 'react';

const DefineAudienceFormFooter = ({ onClear, apllyBtnLabel, clearBtnLabel }) => (
	<Stack direction='row' spacing={2} justifyContent='end'>
		<Button size='large' type='button' onClick={onClear} color='error' label={clearBtnLabel}/>
		<Button size='large' label={apllyBtnLabel}/>
	</Stack>
);

export default memo(DefineAudienceFormFooter);