import type { Category } from "@/types";
import { createFileRoute } from "@tanstack/react-router";

const cols = [
	{
		key: 'name',
		label: 'Name',
	}, 
	{
		key: 'image',
		label: 'Thumbnail',
	},
	{
		key: 'description',
		label: 'Description',
	},
	{
		key: 'parentCategoryId',
		label: 'Parent Category',
	}
]

const Categories = () => {

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="flex gap-8">
				<div className="flex-1 min-w-0">
					<h1 className="mb-4">Categories</h1>
					<table className="min-w-full bg-white border border-gray-200 table-auto">
						<thead>
							{cols.map(col => (
								<th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									{col.label}
								</th>
							))}
							<th></th>
						</thead>
						<tbody>
						</tbody>
						<tfoot>
						</tfoot>
					</table>
				</div>
			</div>
		</div>
	);
}

export const Route = createFileRoute('/categories/')({
  component: Categories,
})

export default Categories;