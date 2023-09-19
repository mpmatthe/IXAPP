import { useCallback, useEffect, useState } from 'react';

// const getDefaultSorting = (tableData, columns) => {
// 	return [...tableData].sort((a, b) => {
// 		const filterColumn = columns.filter(col => col.sortByOrder)
//
// 		let { accessor = 'id', sortByOrder = 'asc' } = Object.assign(
// 			{},
// 			...filterColumn
// 		)
//
// 		const ascending = a[accessor]
// 			.toString()
// 			.localeCompare(b[accessor].toString(), 'en', { numeric: true })
//
// 		return sortByOrder === 'asc' ? ascending : -ascending
// 	})
// }

const useSortableTable = (data = [], columns) => {
	const [tableData, setSortData] = useState(data)

	useEffect(() => {
		setSortData(data)
	}, [data, columns])

	const handleSorting = useCallback((sortField, sortOrder) => {
		if (sortField) {
			const sorted = [...tableData].sort((a, b) => {
				const valueA = a[sortField]
				const valueB = b[sortField]

				if (typeof valueA === 'number' && typeof valueB === 'number') {
					return (valueA - valueB) * (sortOrder === 'asc' ? 1 : -1)
				}

				return (
					a[sortField].toString().localeCompare(
						b[sortField].toString(),
						'en',
						{
							numeric: true
						}) *
					(sortOrder === 'asc' ? 1 : -1)
				)
			})
			setSortData(sorted)
		}
	}, [tableData])

	return [tableData, handleSorting]
}

export default useSortableTable