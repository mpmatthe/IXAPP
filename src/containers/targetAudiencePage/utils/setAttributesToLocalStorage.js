import { localStorageDefineTargetAudienceAttrKey } from '../../../constants';
import { getValueFromLocalStorage, setValueToLocalStorage } from '../../../services/localStorage/localStorageService';

const setAttributesToLocalStorage = (attrKey, changedAttributes) => {
	const storageAttr = getValueFromLocalStorage(localStorageDefineTargetAudienceAttrKey) || {};
	setValueToLocalStorage(
		localStorageDefineTargetAudienceAttrKey,
		{ ...storageAttr, [attrKey]: changedAttributes }
	);
};

export default setAttributesToLocalStorage;