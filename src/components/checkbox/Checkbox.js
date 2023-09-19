import React from 'react';
import MuiCheckbox from '@mui/material/Checkbox';
import CheckboxStyled from './Checkbox.styled';

const Checkbox = ({ size = 'medium', ...props }) => {
	return (
		<CheckboxStyled control={<MuiCheckbox size={size}/>} {...props} />
	);
};

export default Checkbox;