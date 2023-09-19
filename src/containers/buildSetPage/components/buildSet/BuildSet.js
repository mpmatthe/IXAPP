import React from 'react';
import BuildSetStyled, { BuildSetBodyStyled, BuildSetHeadStyled } from './buildSet.styled';
import Typography from '@mui/material/Typography';
import IdentifyFilters from '../../../revealInformationPage/components/identifyFilters/IdentifyFilters';
import BaseTable from '../../../../components/baseTable/BaseTable';
import TableToolbar from '../../../../components/baseTable/components/toolbar/TableToolbar';
import Button from '../../../../components/button/Button';
import { rowsPerPageOnBuildTable } from '../../../../constants';
import Stack from '@mui/material/Stack';

const BuildSet = (
	{
		title,
		filterValues,
		onChangeFilters,
		selectedItems,
		onClearAll,
		onActionBtnClick,
		tableData,
		...tableProps
	}
) => {
	const numSelected = selectedItems.length;

	const toolbarActionsMarkup = [
		<Button
			key='remove'
			color='error'
			size='small'
			variant='contained'
			label='Remove from the set'
			onClick={onActionBtnClick}
			disabled={!numSelected}
		/>,
		<Button
			key='export'
			size='small'
			variant='contained'
			color='success'
			label='Export search term set'
			disabled={!tableData.length}
		/>
	];

	return (
		<BuildSetStyled spacing={3}>
			<BuildSetHeadStyled>
				<Typography variant='h6' textAlign='center'>
					{title}
				</Typography>
			</BuildSetHeadStyled>

			<BuildSetBodyStyled spacing={2} flexGrow={1}>
				<IdentifyFilters
					filterValues={filterValues}
					onChangeFilters={onChangeFilters}
				/>
				<Stack flexGrow={1}>
					<TableToolbar
						hasSelected={numSelected}
						label={`${numSelected} selected search term`}
						actions={toolbarActionsMarkup}
						onClearAll={onClearAll}
					/>
					<BaseTable
						{...{
							...tableProps,
							tableData,
							selectedItems,
							rowsPerPage: rowsPerPageOnBuildTable
						}}
					/>
				</Stack>
			</BuildSetBodyStyled>
		</BuildSetStyled>
	);
};

export default BuildSet;