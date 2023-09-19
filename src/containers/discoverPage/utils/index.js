import { MAX_RAD } from '../../../constants';
import { getColorGenerator } from '../../../config/chart/bubbles/helpers';

const colorGenerator = getColorGenerator();

export const transformChartData = (dataToTransform) => {
	if (!dataToTransform) {
		return;
	}

	const datasets = dataToTransform.map(item => {
		const increasedCount = item.count * 5;
		const radius = increasedCount > MAX_RAD ? MAX_RAD : increasedCount;

		const { backgroundColor, borderColor } = colorGenerator(item.infoNeedId);

		return {
			label: {
				searchTerm: item.searchTerm,
				infoNeedLabel: item.infoNeedLabel,
				probability: item.needProbability,
				infoNeedId: item.infoNeedId
			},
			data: [{
				x: item.axiosX,
				y: item.axiosY,
				r: radius

			}],
			backgroundColor,
			borderColor
		};
	});

	return {
		datasets
	};
};

