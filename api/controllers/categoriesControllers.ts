import categoryModel from '../models/categoryModel';

class CategoriesControllers {
	getCategory = async (req: any, res: any) => {
		const { id } = req.params;
		try {
			const findCategory = await categoryModel.findById(id);
			if (!findCategory) {
				return res.status(404).send({ error: 'Category not found' });
			}
			return res.status(200).send(findCategory);
		} catch (error) {
			console.error('Error during category search:', error);
			res.status(500).send({ error: 'Internal server error' });
		}
	};
	getCategories = async (req: any, res: any) => {
		try {
			const categories = await categoryModel.find();
			return res.status(200).send(categories);
		} catch (error) {
			console.error('Error during categories retrieval:', error);
			res.status(500).send({ error: 'Internal server error' });
		}
	};
	registerCategory = async (req: any, res: any) => {
		const { name, description, thumbnail, sellerId, parentCategoryId } = req.body;
		try {
			const newCategory = new categoryModel({ name, description, thumbnail, sellerId, parentCategoryId });
			await newCategory.save();
			return res.status(201).send(newCategory);
		} catch (error) {
			console.error('Error during category registration:', error);
			res.status(500).send({ error: 'Internal server error' });
		}
	};
	updateCategory = async (req: any, res: any) => {
		const { id } = req.params;
		const { name, description, thumbnail, parentCategoryId } = req.body;
		try {
			const updatedCategory = await categoryModel.findByIdAndUpdate(id, { name, description, thumbnail, parentCategoryId }, { new: true });
			if (!updatedCategory) {
				return res.status(404).send({ error: 'Category not found' });
			}
			return res.status(200).send(updatedCategory);
		} catch (error) {
			console.error('Error during category update:', error);
			res.status(500).send({ error: 'Internal server error' });
		}
	};
	deleteCategory = async (req: any, res: any) => {
		const { id } = req.params;
		try {
			const deletedCategory = await categoryModel.findByIdAndDelete(id);
			if (!deletedCategory) {
				return res.status(404).send({ error: 'Category not found' });
			}
			return res.status(200).send({ message: 'Category deleted successfully' });
		} catch (error) {
			console.error('Error during category deletion:', error);
			res.status(500).send({ error: 'Internal server error' });
		}
	};
	getUserCategories = async (req: any, res: any) => {
		try {
			const { userId } = req.params;
			const categories = await categoryModel.find({ seller: userId });
			return res.status(200).send(categories);
		} catch (error) {
			console.error('Error during categories retrieval:', error);
			res.status(500).send({ error: 'Internal server error' });
		}
	};
}

export default new CategoriesControllers();