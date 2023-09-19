import { useDropzone } from 'react-dropzone';
import { fileMaxSize, JSONFormat } from '../../../constants';

const useDropZone = (props) => {
	return useDropzone({
		accept: {
			[JSONFormat.name]: JSONFormat.variants
		},
		maxFiles: 1,
		maxSize: fileMaxSize,
		multiple: false,
		...props
	});
};

export default useDropZone;