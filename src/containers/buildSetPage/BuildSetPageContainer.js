import React, { useCallback, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import useIndexedDBService from '../../services/db/indexedDBService';
import AppBackdrop from '../../components/appBackdrop/AppBackdrop';
import BuildSetPageStyled, {
	BuildSetPageBodyStyled,
	BuildSetPageHeadStyled
} from './buildSetPage.styled';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import NextStepButton from '../../components/nextStepButton/NextStepButton';
import BuildSetCard from './components/buildSetCard/BuildSetCard';
import {
	boolAttributesName,
	BUILD_SET_PAGE_DEFAULT_FILTERS,
	categoricalAttributesName,
	localStorageDefineTargetAudienceAttrKey,
	localStorageSearchTermSetKey,
	rangeAttributesName
} from '../../constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import useRevealSearchTermsFilter from '../revealInformationPage/hooks/useRevealSearchTermsFilter';
import useMultipleSelectionTable from '../../hooks/useMultipleSelectionTable';

const columns = [
	{ label: 'Search Term', accessor: 'searchTerm', sortable: true, sortByOrder: 'asc' },
	{ label: 'Information Need', accessor: 'infoNeed', sortable: true },
	{ label: 'Need Probability', accessor: 'needProbability', sortable: true, numeric: true }
];

const BuildSetPageContainer = () => {
	const { getSearchTermSet } = useIndexedDBService();
	const [searchTermSet, setSearchTermSet] = useLocalStorage(localStorageSearchTermSetKey, []);
	const foundedSearchTerms = useLiveQuery(
		() => getSearchTermSet(searchTermSet),
		[searchTermSet]
	);

	const [targetAudienceAttributes] = useLocalStorage(localStorageDefineTargetAudienceAttrKey, {});
	const { selectedItems, onClearSelectedItems, onToggleSelect, setSelectedItems } = useMultipleSelectionTable();
	const [page, setPage] = useState(0);

	const onReset = () => {
		onClearSelectedItems();
		setPage(0);
	};

	const {
		filteredTerms,
		onChangeFilters,
		filterValues,
		setFilterValues
	} = useRevealSearchTermsFilter(BUILD_SET_PAGE_DEFAULT_FILTERS, foundedSearchTerms, onReset);

	const handleSelectAll = useCallback((e) => {
		if (e.target.checked) {
			const newSelected = filteredTerms.map(row => row.searchTerm);
			return setSelectedItems(newSelected);
		}
		onClearSelectedItems();
	}, [filteredTerms, setSelectedItems, onClearSelectedItems]);

	const handleChangePage = useCallback(
		(event, newPage) => setPage(newPage),
		[]
	);

	const onDeleteSearchTermsSetItems = useCallback(
		() => {
			const newTermSet = searchTermSet.filter(term => !selectedItems.includes(term));
			setSearchTermSet(newTermSet);
			setFilterValues(BUILD_SET_PAGE_DEFAULT_FILTERS);
		},
		[searchTermSet, selectedItems, setSearchTermSet, setFilterValues]
	);

	if (!filteredTerms) {
		return <AppBackdrop open={!filteredTerms}/>;
	}

	return (
		<BuildSetPageStyled>
			<BuildSetPageHeadStyled>
				<Typography textAlign='center' variant='h4' component='h1'>
					Build search term set
				</Typography>
			</BuildSetPageHeadStyled>

			<BuildSetPageBodyStyled>
				<BuildSetCard
					title='Build your own set of search terms'
					infoTitle='Selected respondent attributes'
					rangeInfoTitle='Selected range attributes'
					categoricalInfoTitle='Selected categorical attributes'
					boolInfoTitle='Selected boolean attributes'

					categoricalAttr={targetAudienceAttributes[categoricalAttributesName]}
					booleanAttr={targetAudienceAttributes[boolAttributesName]}
					rangeAttr={targetAudienceAttributes[rangeAttributesName]}

					tableData={filteredTerms}
					onSelectAllClick={handleSelectAll}
					onRowClick={onToggleSelect}

					onClearAll={onClearSelectedItems}
					onActionBtnClick={onDeleteSearchTermsSetItems}

					onChangePage={handleChangePage}

					{...{ filterValues, columns, selectedItems, page, onChangeFilters}}
				/>
			</BuildSetPageBodyStyled>
		</BuildSetPageStyled>
	);
};

export default BuildSetPageContainer;