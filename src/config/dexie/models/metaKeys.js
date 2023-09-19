import { metaKeysObjectStoreFields, metaKeysObjectStoreName } from '../constants';

const metaKeysModel = {
	[metaKeysObjectStoreName]: `
			++id,
			${metaKeysObjectStoreFields.name},
			${metaKeysObjectStoreFields.label},
			${metaKeysObjectStoreFields.type},
			${metaKeysObjectStoreFields.isCategorical}
		`
};

export default metaKeysModel;