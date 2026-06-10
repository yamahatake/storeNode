import { createFileRoute } from "@tanstack/react-router";

const Products = () => {
    return (
        <div>
            <h1>My Products</h1>
            {/* My products content goes here */}
        </div>
    );
}


export const Route = createFileRoute('/products/')({
  component: Products,
})

export default Products;