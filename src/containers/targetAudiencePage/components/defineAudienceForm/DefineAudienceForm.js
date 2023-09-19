import React from 'react';
import DefineAudienceFormStyled, {
	DefineAudienceFormBodyStyled,
	DefineAudienceFormFooterStyled,
	DefineAudienceFormHeadStyled,
	FormTextStyled
} from './defineAudienceForm.styled';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import RangeAttributeItem from '../rangeAttibuteItem/RangeAttibuteItem.js';
import CategoricalAttributeItem from '../categoricalAttributeItem/CategoricalAttributeItem';
import { BodyItemStyled } from '../targetAudienceCard/TargetAudienceCard.styled';
import BooleanAttributeItem from '../booleanAttributeItem/BooleanAttributeItem';
import DefineAudienceFormHead from '../defineAudienceFormHead/DefineAudienceFormHead';
import DefineAudienceFormFooter from '../defineAudienceFormFooter/DefineAudienceFormFooter';

const DefineAudienceForm = (
	{
		formTitle,
		formSubtitle,
		categoricalAttr,
		rangeAttr,
		booleanAttr,
		booleanAttrTitle,
		onSubmit,
		onClear,
		onRangeAttrChange,
		onCategoricalAttrChange,
		onBooleanAttrChange
	}
) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		if (onSubmit) {
			onSubmit();
		}
	};

	const rangeAttrMarkup = !!rangeAttr?.length && (
		<BodyItemStyled spacing={2}>
			<Stack direction='row' gap={2} flexWrap='wrap'>
				{rangeAttr.map(attr => (
					<RangeAttributeItem
						key={attr.name}
						onChange={onRangeAttrChange}
						{...attr}
					/>
				))}
			</Stack>
		</BodyItemStyled>
	);

	const categoricalAttrMarkup = !!categoricalAttr?.length && (
		<BodyItemStyled>
			<Stack gap={2}>
				{categoricalAttr.map(attr => (
					<CategoricalAttributeItem
						key={attr.name}
						onChange={onCategoricalAttrChange}
						{...attr}
					/>
				))}
			</Stack>
		</BodyItemStyled>
	);

	const booleanAttrMarkup = !!booleanAttr?.length && (
		<BodyItemStyled>
			<Box>
				<FormTextStyled variant='h6' className='label'>
					{booleanAttrTitle}
				</FormTextStyled>
				{booleanAttr.map(attr => (
					<BooleanAttributeItem
						key={attr.name}
						onBooleanAttrChange={onBooleanAttrChange}
						{...attr}
					/>
				))}
			</Box>
		</BodyItemStyled>
	);

	return (
		<DefineAudienceFormStyled
			component='form'
			autoComplete='off'
			onSubmit={handleSubmit}
		>
			<DefineAudienceFormHeadStyled>
				<DefineAudienceFormHead title={formTitle} subtitle={formSubtitle}/>
			</DefineAudienceFormHeadStyled>

			<DefineAudienceFormBodyStyled>
				{rangeAttrMarkup}
				{categoricalAttrMarkup}
				{booleanAttrMarkup}
			</DefineAudienceFormBodyStyled>

			<DefineAudienceFormFooterStyled direction='row' justifyContent='end' spacing={2}>
				<DefineAudienceFormFooter
					onClear={onClear}
					apllyBtnLabel='Apply'
					clearBtnLabel='Clear'
				/>
			</DefineAudienceFormFooterStyled>

		</DefineAudienceFormStyled>
	);
};

export default DefineAudienceForm;
