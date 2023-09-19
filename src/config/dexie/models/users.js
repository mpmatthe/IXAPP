import { usersObjectStoreFields, usersObjectStoreName } from '../constants';

const usersModel = {
	[usersObjectStoreName]: `
		++id,
		${usersObjectStoreFields.userId},
		${usersObjectStoreFields.searchTerm},
		${usersObjectStoreFields.infoNeed},
		${usersObjectStoreFields.needId},
		${usersObjectStoreFields.needProbability},
		${usersObjectStoreFields.X},
		${usersObjectStoreFields.Y},
		${usersObjectStoreFields.needIdAndInfoNeedIndex}
		`
};

export default usersModel;