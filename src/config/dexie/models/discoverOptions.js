import { defaultUploadDataFields, discoverOptionsObjectStoreName, needIdAndInfoNeedIndex } from '../constants';

const discoverOptionsModel = {
	[discoverOptionsObjectStoreName]: `
		++id,
		${defaultUploadDataFields.needId},
		${defaultUploadDataFields.infoNeed},
		${needIdAndInfoNeedIndex}
		`
};

export default discoverOptionsModel;