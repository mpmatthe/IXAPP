import React, { memo } from 'react';
import RangeSlider from '../../../../components/rangeSlider/RangeSlider';
import IdentifyFilterStyled, { IdentifyFilterItemStyled, IdentifyFilterTextStyled } from './identifyFilters.styled';
import TextInput from '../../../../components/textInput/TextInput';
import { rangeProbabilityFilterName, searchTermNameFilterName, topSearchTermFilterName } from '../../../../constants';

const IdentifyFilters = ({ filterValues, onChangeFilters }) => {
	const { rangeProbability, topSearchTerm, searchTermName } = filterValues;
	return (
		<IdentifyFilterStyled direction='row' spacing={3} alignItems='center'>
			<IdentifyFilterItemStyled spacing={3}>
				<IdentifyFilterTextStyled variant='h6' className='filterLabel'>
					Select min - max probability
				</IdentifyFilterTextStyled>
				<RangeSlider
					step={1}
					name={rangeProbabilityFilterName}
					min={0}
					max={100}
					value={rangeProbability}
					handleChange={onChangeFilters}
				/>
			</IdentifyFilterItemStyled>
			<IdentifyFilterItemStyled spacing={2}>
				<IdentifyFilterTextStyled variant='h6' className='filterLabel'>
					Top N search terms by probability
				</IdentifyFilterTextStyled>
				<TextInput
					name={topSearchTermFilterName}
					type='number'
					value={topSearchTerm}
					onChange={onChangeFilters}
				/>
			</IdentifyFilterItemStyled>
			<IdentifyFilterItemStyled spacing={2}>
				<IdentifyFilterTextStyled variant='h6' className='filterLabel'>
					Enter the search term
				</IdentifyFilterTextStyled>
				<TextInput
					name={searchTermNameFilterName}
					placeholder='Enter the search term'
					value={searchTermName}
					onChange={onChangeFilters}
				/>
			</IdentifyFilterItemStyled>
		</IdentifyFilterStyled>
	);
};

export default memo(IdentifyFilters);