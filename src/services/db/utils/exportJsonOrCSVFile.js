import { CSVFormat, discoverExportFileName } from '../../../constants';
import { JsonToCsv, stringifyJson } from '../../parse/parseService';
import createFileFromString from './createFileFromString';
import exportFile from './exportFile';

const exportJsonOrCSVFile = (dataToExport, format) => {
	const dataStr = format === CSVFormat.format
		? JsonToCsv(dataToExport)
		: stringifyJson(dataToExport);

	const blob = createFileFromString(dataStr, format);
	exportFile(blob, discoverExportFileName);
};

export default exportJsonOrCSVFile;