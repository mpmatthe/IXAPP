import { metaValuesObjectStoreFields, metaValuesObjectStoreName } from '../constants';

const metaValuesModel = {
	[metaValuesObjectStoreName]: `
			++id,
			${metaValuesObjectStoreFields.userId},
			${metaValuesObjectStoreFields.metaKeyId},
			${metaValuesObjectStoreFields.value}
		`
};

export default metaValuesModel;