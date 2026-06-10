import { createFileRoute } from "@tanstack/react-router";

const Categories = () => {
    return (
        <div>
            <h1>My Categories</h1>
            {/* My categories content goes here */}
        </div>
    );
}

export const Route = createFileRoute('/categories/')({
  component: Categories,
})

export default Categories;