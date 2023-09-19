import React from 'react';
import Typography from '@mui/material/Typography';
import Select from '../../../../components/select/Select';
import { possibleDataTypes } from '../../../../constants';
import TextInput from '../../../../components/textInput/TextInput';
import Checkbox from '../../../../components/checkbox/Checkbox';
import FormFieldsItemStyled, { FormFieldsItemActionStyled, FormFieldsItemLabelStyled } from './formFieldsItem.styled';

const FormFieldsItem = ({ fieldName, fieldInputs, onFieldValueChange, onTextFieldValueChange }) => {
	const { typeInput, labelInput, categoricalInput } = fieldInputs;

	return (
		<FormFieldsItemStyled>
			<FormFieldsItemLabelStyled>
				<Typography
					sx={{
						whiteSpace: 'nowrap'
					}}
					variant='body2'
				>
					{fieldName}
				</Typography>
			</FormFieldsItemLabelStyled>

			<FormFieldsItemActionStyled>
				<Select
					size='small'
					value={typeInput.value}
					emptyItem={false}
					onChange={(e) => onFieldValueChange(fieldName, e)}
					name={typeInput.name}
					disabled={typeInput.disabled}
					id={`${fieldName}-type-id`}
					label='Select type'
					options={possibleDataTypes}
				/>
				<TextInput
					fullWidth
					defaultValue={labelInput.value}
					disabled={labelInput.disabled}
					name={labelInput.name}
					id={`${fieldName}-label-id`}
					onBlur={(e) => onTextFieldValueChange(fieldName, e)}
					label='Select label'
				/>
				<Checkbox
					label='Categorical'
					onChange={(e) => onFieldValueChange(fieldName, e)}
					id={`${fieldName}-categorical-id`}
					name={categoricalInput.name}
					checked={categoricalInput.value}
					disabled={categoricalInput.disabled}
				/>
			</FormFieldsItemActionStyled>
		</FormFieldsItemStyled>
	);
};

export default FormFieldsItem;