import productModel from '../models/productModel';

class ProductsControllers {
	getProduct = async (req: any, res: any) => {
		const { id } = req.params;
		try {
			const findProduct = await productModel.findById(id);
			if (!findProduct) {
				return res.status(404).send({ error: 'Product not found' });
			}
			return res.status(200).send(findProduct);
		} catch (error) {
			console.error('Error during product search:', error);
			res.status(500).send({ error: 'Internal server error' });
		}
	};
	getProducts = async (req: any, res: any) => {
		try {
			const products = await productModel.find();
			return res.status(200).send(products);
		} catch (error) {
			console.error('Error during products retrieval:', error);
			res.status(500).send({ error: 'Internal server error' });
		}
	};
	registerProduct = async (req: any, res: any) => {
		const { name, description, price, stock, categories, images, thumbnail, discount, cupom_code, seller, freight } = req.body;
		try {
			const newProduct = new productModel({ name, description, price, stock, categories, images, thumbnail, discount, cupom_code, seller, freight });
			await newProduct.save();
			return res.status(201).send(newProduct);
		} catch (error) {
			console.error('Error during product registration:', error);
			res.status(500).send({ error: 'Internal server error' });
		}
	};
	updateProduct = async (req: any, res: any) => {
		const { id } = req.params;
		const { name, description, price, stock, categories, images, thumbnail, discount, cupom_code, seller, freight } = req.body;
		try {
			const updatedProduct = await productModel.findByIdAndUpdate(id, { name, description, price, stock, categories, images, thumbnail, discount, cupom_code, seller, freight }, { new: true });
			if (!updatedProduct) {
				return res.status(404).send({ error: 'Product not found' });
			}
			return res.status(200).send(updatedProduct);
		} catch (error) {
			console.error('Error during product update:', error);
			res.status(500).send({ error: 'Internal server error' });
		}
	};
	deleteProduct = async (req: any, res: any) => {
		const { id } = req.params;
		try {
			const deletedProduct = await productModel.findByIdAndDelete(id);
			if (!deletedProduct) {
				return res.status(404).send({ error: 'Product not found' });
			}
			return res.status(200).send({ message: 'Product deleted successfully' });
		} catch (error) {
			console.error('Error during product deletion:', error);
			res.status(500).send({ error: 'Internal server error' });
		}
	};
	getUserProducts = async (req: any, res: any) => {
		try {
			const { userId } = req.params;
			const products = await productModel.find({ seller: userId });
			return res.status(200).send(products);
		} catch (error) {
			console.error('Error during products retrieval:', error);
			res.status(500).send({ error: 'Internal server error' });
		}
	};
}

export default new ProductsControllers();