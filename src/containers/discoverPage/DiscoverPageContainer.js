import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
	DiscoverPageBodyStyled,
	DiscoverPageFooterStyled,
	DiscoverPageHeadStyled,
	DiscoverPageStyled
} from './discoverPage.styled';
import DiscoverCard from './components/discoverCard/DiscoverCard';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useLiveQuery } from 'dexie-react-hooks';
import AppBackdrop from '../../components/appBackdrop/AppBackdrop';
import useNotification from '../../hooks/useNotification';
import useIndexedDBService from '../../services/db/indexedDBService';
import { exportJsonOrCSVFile } from '../../services/db/utils';
import { transformChartData } from './utils';
import { getValueFromLocalStorage } from '../../services/localStorage/localStorageService';
import { localStorageAxiosKey, localStorageModeKey, routes } from '../../constants';
import { defaultUploadDataFields } from '../../config/dexie';
import { useNavigate } from 'react-router-dom';
import NextStepButton from '../../components/nextStepButton/NextStepButton';

const DiscoverPageContainer = () => {
	const {
		getOptions,
		changeInfoNeed,
		getExportData,
		getDiscoverData
	} = useIndexedDBService();

	const { open } = useNotification();
	const navigate = useNavigate();

	const [chartAxiosValues, setChartAxiosValues] = useState(null);
	const [isDemoMode, setIsDemoMode] = useState(true);
	const [selectedOptions, setSelectedOptions] = useState({
		info_need: '',
		need_id: ''
	});

	const discoverOptions = useLiveQuery(getOptions);

	const filteredInfoNeedQueryResult = useLiveQuery(
		() => getDiscoverData(selectedOptions.need_id, selectedOptions.info_need),
		[selectedOptions]
	);

	useEffect(() => {
		const axiosValues = getValueFromLocalStorage(localStorageAxiosKey);
		const isDemoMode = getValueFromLocalStorage(localStorageModeKey);
		setIsDemoMode(() => isDemoMode);
		setChartAxiosValues(() => axiosValues);
	}, []);

	const onNextBtnClick = useCallback(() => {
		navigate(routes.targetAudience);
	}, [navigate]);

	const onChangeFilter = useCallback(({ target }) => {
		const name = target.name;
		const value = target.value;

		if (!value.toString()) {
			return setSelectedOptions(() => ({
				info_need: '',
				need_id: ''
			}));
		}

		const selectedOption = discoverOptions.find(option => option[name] === value);
		setSelectedOptions(() => ({
			...selectedOption,
			need_id: selectedOption.need_id.toString()
		}));
	}, [discoverOptions]);

	const onDownloadFile = useCallback((format) => {
		getExportData()
			.then(dataToExport => exportJsonOrCSVFile(dataToExport, format))
			.catch(err => open({ message: err.message, variant: 'error' }));
	}, [getExportData, open]);

	const onInfoNeedEdit = useCallback((value) => {
		changeInfoNeed(selectedOptions.info_need, +selectedOptions.need_id, value)
			.then(() => {
				setSelectedOptions(prevSelectedOptions => ({ ...prevSelectedOptions, info_need: value }));
				open({ message: 'Information Need Labels is changed', variant: 'success' });
			});
	}, [selectedOptions, changeInfoNeed, open]);

	const tableHeadings = useMemo(() => ([
		{
			id: 'searchTerm',
			numeric: false,
			disablePadding: true,
			label: 'Search Terms'
		},
		{
			id: 'needProbability',
			numeric: true,
			disablePadding: true,
			label: 'Probability'
		}
	]), []);

	const chartData = useMemo(
		() => transformChartData(filteredInfoNeedQueryResult?.chartData),
		[filteredInfoNeedQueryResult]
	);

	const infoOptions = useMemo(
		() => {
			if (discoverOptions) {
				return {
					infoNeedOptions: discoverOptions.map(item => item[defaultUploadDataFields.infoNeed]),
					infoNeedIdOptions: discoverOptions.map(item => item[defaultUploadDataFields.needId])
				};
			}
		},
		[discoverOptions]
	);

	if (!(discoverOptions && chartData)) {
		return <AppBackdrop open={!(discoverOptions && chartData)}/>;
	}

	return (
		<DiscoverPageStyled>
			<DiscoverPageHeadStyled>
				<Typography textAlign='center' variant='h4' component='h1'>Discover + Label</Typography>
			</DiscoverPageHeadStyled>

			<DiscoverPageBodyStyled>
				<DiscoverCard
					onChangeFilter={onChangeFilter}
					selectedInfoNeedId={selectedOptions.need_id}
					selectedInfoNeed={selectedOptions.info_need}
					infoNeedOptions={infoOptions.infoNeedOptions}
					infoNeedIdOptions={infoOptions.infoNeedIdOptions}
					tableRows={filteredInfoNeedQueryResult?.tableRowsData}
					tableHeadings={tableHeadings}
					chartData={chartData}
					chartAxiosValues={chartAxiosValues}
					onInfoNeedEdit={onInfoNeedEdit}
					onDownloadFile={onDownloadFile}
					isDemoMode={isDemoMode}
				/>
			</DiscoverPageBodyStyled>

			<DiscoverPageFooterStyled>
				<Stack direction='row' justifyContent='center'>
					<NextStepButton onClick={onNextBtnClick} label='Next step'/>
				</Stack>
			</DiscoverPageFooterStyled>

		</DiscoverPageStyled>
	);
};

export default DiscoverPageContainer;