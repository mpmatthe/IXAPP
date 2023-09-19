export const routes = {
	home: '/',
	statistic: '/statistic',
	discover: '/discover',
	targetAudience: '/target-audience',
	revealInformation: '/reveal-information',
	mostRelevantSearchTerm: '/most-relevant-search-term',
	buildSearchTermSet: '/build-search-term-set',
};

export const navigations = [
	{ path: routes.home, label: 'Home' },
	{ path: routes.statistic, label: 'Statistic' },
	{ path: routes.discover, label: 'Discover' },
	{ path: routes.targetAudience, label: 'Target Audience' },
	{ path: routes.revealInformation, label: 'Reveal Information' },
	{ path: routes.buildSearchTermSet, label: 'Build Search Term Set' },
];

export const mobileDeviceResolution = 768;

// MAIN PAGE
export const localStorageModeKey = 'isDemoMode';
export const localStorageAxiosKey = 'axiosValue';
export const possibleDataTypes = ['string', 'number', 'boolean'];
export const discoverExportFileName = 'Target2Need_result';
export const fileMaxSize = 41943040;
export const CSVFormat = {
	name: 'csv',
	format: 'text/csv',
	variants: ['.csv']
};
export const JSONFormat = {
	name: 'json',
	format: 'application/json',
	variants: ['.json']
};

// DISCOVER PAGE
export const MAX_RAD = 60;
export const discoverInteractiveMapTitle = 'Interactive map of search terms';
export const discoverInteractiveMapSubtitle = 'The proximity of the bubbles expresses the semantic similarity of the search terms';
export const discoverInteractiveMapLegendContainerId = 'legend-container';
export const defineTypeDialogTitle = 'Please check carefully the correctness of certain data types';
export const defineTypeDialogSubtitle = 'If the field is of a categorical type, such as age, gender, education level, etc., then check the "Categorical" box';
export const tooltipSearchTermBeforeTitle = 'Search term:';
export const tooltipSearchTermBeforeLabel = 'Info Need:';
export const tooltipSearchTermBeforeFooter = 'Probability:';

// DEFINE TARGET AUDIENCE PAGE
export const localStorageDefineTargetAudienceAttrKey = 'attributes';
export const localStorageDefineTargetAudienceFilter = 'attributesFilter';
export const boolAttributesName = 'booleanAttributes';
export const categoricalAttributesName = 'categoricalAttributes';
export const rangeAttributesName = 'rangeAttributes';
export const minRangeDistanceOfDTAPage = 5;

// REVEAL AUDIENCE INFORMATION NEEDS PAGE
export const audienceChartTitle = 'Information needs based on the selected target audience';
export const tooltipStandardErrorTitle = 'Standard error of the mean';
export const barChartItemsLimit = 20;
export const minRangeDistanceOfRAINPage = 5;
export const rangeProbabilityFilterName = 'rangeProbability';
export const topSearchTermFilterName = 'topSearchTerm';
export const searchTermNameFilterName = 'searchTermName';
export const rowsPerPageOnRevealTable = 10;
export const localStorageSearchTermSetKey = 'searchTermSet';
export const REVEAL_DIALOG_DEFAULT_FILTERS = {
	[rangeProbabilityFilterName]: [0, 100],
	[topSearchTermFilterName]: 100,
	[searchTermNameFilterName]: ''
};

// BUILD SEARCH TERM SET PAGE
export const rowsPerPageOnBuildTable = 10;
export const BUILD_SET_PAGE_DEFAULT_FILTERS = {
	[rangeProbabilityFilterName]: [0, 100],
	[topSearchTermFilterName]: 100,
	[searchTermNameFilterName]: ''
};