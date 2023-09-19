const getFieldType = (value) => {
	const valueType = typeof value;

	if (valueType === 'object' || Array.isArray(value) || valueType === 'function') {
		return '';
	}

	// TODO: add condition if value may be "0" || "1"
	if (value === 0 || value === 1) {
		return 'boolean';
	}

	return valueType;
};

export default getFieldType;