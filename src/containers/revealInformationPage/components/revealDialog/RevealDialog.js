import React, { useCallback, useState } from 'react';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
import useIndexedDBService from '../../../../services/db/indexedDBService';
import { useLiveQuery } from 'dexie-react-hooks';
import { REVEAL_DIALOG_DEFAULT_FILTERS } from '../../../../constants';
import IdentifyRelevantSearchTerm from '../identifyRelevantSearchTerm/IdentifyRelevantSearchTerm';
import useMultipleSelectionTable from '../../../../hooks/useMultipleSelectionTable';
import useRevealSearchTermsFilter from '../../hooks/useRevealSearchTermsFilter';
import useAddTermToSearchTermSet from '../../hooks/addTermToSearchTermSet';
import useNotification from '../../../../hooks/useNotification';
import Button from '../../../../components/button/Button';
import RevealDialogStyled, { RevealDialogBodyStyled, RevealDialogFooterStyled } from './revealDialog.styled';

const PaperComponent = (props) => {
	return (
		<Draggable
			handle='#draggable-dialog-title'
		>
			<Paper {...props} sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '90rem'
			}}
			/>
		</Draggable>
	);
};

const columns = [
	{ label: 'Search Term', accessor: 'searchTerm', sortable: true },
	{ label: 'Need Probability', accessor: 'needProbability', sortable: true, numeric: true }
];

const RevealDialog = ({ open, onClose, selectedInfoNeedId, ...props }) => {
	const { getRelevantSearchTermByInfoNeed } = useIndexedDBService();
	const { addSearchTermSet } = useAddTermToSearchTermSet();
	const { open: openNotification } = useNotification();
	const searchTermByInfoNeed = useLiveQuery(
		() => getRelevantSearchTermByInfoNeed(selectedInfoNeedId),
		[selectedInfoNeedId]
	);

	const {
		selectedItems,
		onClearSelectedItems,
		onToggleSelect,
		setSelectedItems
	} = useMultipleSelectionTable();

	const onHandleCloseDialog = () => {
		if (!onClose) {
			return;
		}

		if (!selectedItems.length) {
			return onClose();
		}

		const isCloseConfirm = window.confirm('Selected searches will be reset if you close the popup window. Do you want to continue?');
		isCloseConfirm && onClose();
	};

	const [page, setPage] = useState(0);

	const onReset = () => {
		onClearSelectedItems();
		setPage(0);
	};

	const {
		filteredTerms,
		onChangeFilters,
		filterValues
	} = useRevealSearchTermsFilter(REVEAL_DIALOG_DEFAULT_FILTERS, searchTermByInfoNeed, onReset);

	const handleSelectAll = useCallback((e) => {
		if (e.target.checked) {
			const newSelected = filteredTerms.map(row => row.searchTerm);
			return setSelectedItems(newSelected);
		}
		onClearSelectedItems();
	}, [filteredTerms, setSelectedItems, onClearSelectedItems]);

	const onSubmitSearchTermSet = useCallback(() => {
		addSearchTermSet(selectedItems);
		onClearSelectedItems();
		openNotification({
			message: 'Search terms were successfully added to set',
			variant: 'success'
		});
	}, [addSearchTermSet, onClearSelectedItems, openNotification, selectedItems]);

	const handleChangePage = useCallback(
		(event, newPage) => setPage(newPage),
		[]
	);

	return (
		<RevealDialogStyled
			PaperComponent={PaperComponent}
			fullWidth
			open={open}
			onClose={onHandleCloseDialog}
			maxWidth='md'
		>
			<RevealDialogBodyStyled>
				<IdentifyRelevantSearchTerm
					tableData={filteredTerms}
					onRowClick={onToggleSelect}
					onSelectAllClick={handleSelectAll}
					onClearAll={onClearSelectedItems}
					onActionBtnClick={onSubmitSearchTermSet}

					onChangePage={handleChangePage}
					{...{onChangeFilters, filterValues, page, selectedItems, columns}}
					{...props}
				/>
			</RevealDialogBodyStyled>
			<RevealDialogFooterStyled alignItems='end'>
				<Button onClick={onHandleCloseDialog} label='Cancel' color='error'/>
			</RevealDialogFooterStyled>
		</RevealDialogStyled>
	);
};

export default RevealDialog;