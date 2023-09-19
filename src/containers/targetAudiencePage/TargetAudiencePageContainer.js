import React, { useCallback, useEffect, useState } from 'react';
import TargetAudiencePageStyled, {
	TargetAudiencePageBodyStyled,
	TargetAudiencePageHeadStyled
} from './targetAudience.styled';
import Typography from '@mui/material/Typography';
import TargetAudienceCard from './components/targetAudienceCard/TargetAudienceCard';
import { useLiveQuery } from 'dexie-react-hooks';
import useIndexedDBService from '../../services/db/indexedDBService';
import AppBackdrop from '../../components/appBackdrop/AppBackdrop';
import transformAttributes from './utils/transformAttributes';
import {
	boolAttributesName,
	categoricalAttributesName,
	localStorageDefineTargetAudienceAttrKey,
	localStorageDefineTargetAudienceFilter,
	minRangeDistanceOfDTAPage,
	rangeAttributesName,
	routes
} from '../../constants';
import setAttributesToLocalStorage from './utils/setAttributesToLocalStorage';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import transformAttributesToFilter from './utils/transformAttributesToFilter';

const TargetAudiencePageContainer = () => {
	const { getRespondentAttributes } = useIndexedDBService();
	const respondentAttr = useLiveQuery(getRespondentAttributes);
	const [_, setFilter] = useLocalStorage(localStorageDefineTargetAudienceFilter);
	const [attributes, setAttributes] = useLocalStorage(localStorageDefineTargetAudienceAttrKey);
	const navigate = useNavigate();

	const [booleanAttr, setBooleanAttr] = useState(null);
	const [categoricalAttr, setCategoricalAttr] = useState(null);
	const [rangeAttr, setRangeAttr] = useState(null);

	useEffect(() => {
		if (!(respondentAttr && respondentAttr.length)) {
			return;
		}

		// const savedAttributes = getValueFromLocalStorage(localStorageDefineTargetAudienceAttrKey);

		if (attributes) {
			setRangeAttr(() => attributes[rangeAttributesName]);
			setBooleanAttr(() => attributes[boolAttributesName]);
			setCategoricalAttr(() => attributes[categoricalAttributesName]);
			return;
		}

		const transformedAttr = transformAttributes(respondentAttr);

		setRangeAttr(() => transformedAttr[rangeAttributesName]);
		setBooleanAttr(() => transformedAttr[boolAttributesName]);
		setCategoricalAttr(() => transformedAttr[categoricalAttributesName]);

		setAttributes(transformedAttr)
	}, [respondentAttr, attributes, setAttributes]);

	const handleChangeRangeAttr = useCallback((event, newValue, activeThumb) => {
		if (!Array.isArray(newValue)) {
			return;
		}

		const changedAttributes = rangeAttr.map(attr => {
			if (attr.name !== event.target.name) {
				return attr;
			}

			const minValue = attr.value[0];
			const maxValue = attr.value[1];

			const newAttrValue = activeThumb === 0
				? [Math.min(newValue[0], maxValue - minRangeDistanceOfDTAPage), maxValue]
				: [minValue, Math.max(newValue[1], minValue + minRangeDistanceOfDTAPage)];

			return {
				...attr,
				value: newAttrValue
			};
		});

		setRangeAttr(() => changedAttributes);
		setAttributesToLocalStorage(rangeAttributesName, changedAttributes);
	}, [rangeAttr]);

	const handleChangeCategoricalAttr = useCallback((e, attrType, attrValue) => {
		const attrName = e.target.name;
		const checked = e.target.checked;

		const changedAttributes = categoricalAttr.map(attr => {
			if (attr.name !== attrName) {
				return attr;
			}

			const newAttributeValue = checked
				? [...attr.value, attrValue]
				: attr.value.filter(value => value !== attrValue);

			return { ...attr, value: newAttributeValue };
		});
		setCategoricalAttr(() => changedAttributes);
		setAttributesToLocalStorage(attrType, changedAttributes);
	}, [categoricalAttr]);

	const handleChangeBooleanAttr = useCallback((e, attrType) => {
		const attrName = e.target.name;
		const value = e.target.checked;

		const changedAttributes = booleanAttr.map(attr =>
			attr.name === attrName
				? { ...attr, value }
				: attr
		);

		setBooleanAttr(() => changedAttributes);
		setAttributesToLocalStorage(attrType, changedAttributes);
	}, [booleanAttr]);

	const onSubmit = () => {
		const attributesToTransform = {
			[boolAttributesName]: booleanAttr,
			[categoricalAttributesName]: categoricalAttr,
			[rangeAttributesName]: rangeAttr,
		};
		setFilter(transformAttributesToFilter(attributesToTransform));
		navigate(routes.revealInformation);
	};

	const onClear = useCallback(() => {
		const transformedAttributes = transformAttributes(respondentAttr);

		setRangeAttr(() => transformedAttributes[rangeAttributesName]);
		setBooleanAttr(() => transformedAttributes[boolAttributesName]);
		setCategoricalAttr(() => transformedAttributes[categoricalAttributesName]);

		setAttributes(transformedAttributes)
	}, [respondentAttr, setAttributes]);

	const isLoading = booleanAttr && categoricalAttr && rangeAttr;

	if (!isLoading) {
		return <AppBackdrop open={!isLoading}/>;
	}

	return (
		<TargetAudiencePageStyled>
			<TargetAudiencePageHeadStyled>
				<Typography textAlign='center' variant='h4' component='h1'>
					Define Target Audience
				</Typography>
			</TargetAudiencePageHeadStyled>

			<TargetAudiencePageBodyStyled>
				<TargetAudienceCard
					formTitle='Respondent Attributes'
					formSubtitle='Select available respondent attributes to identify your target audience'
					infoTitle='Selected respondent attributes'
					rangeInfoTitle='Selected range attributes'
					categoricalInfoTitle='Selected categorical attributes'
					boolInfoTitle='Selected boolean attributes'
					categoricalAttr={categoricalAttr}
					booleanAttr={booleanAttr}
					rangeAttr={rangeAttr}
					booleanAttrTitle='Boolean fields'
					onSubmit={onSubmit}
					onClear={onClear}
					onRangeAttrChange={handleChangeRangeAttr}
					onCategoricalAttrChange={handleChangeCategoricalAttr}
					onBooleanAttrChange={handleChangeBooleanAttr}
				/>
			</TargetAudiencePageBodyStyled>
		</TargetAudiencePageStyled>
	);
};

export default TargetAudiencePageContainer;