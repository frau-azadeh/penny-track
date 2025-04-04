import React from "react";
import { Product } from "../../store/featcher/productSlice";
import { Button } from "../ui";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="space-y-2">
      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md"
          >
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">Price: ${product.price}</p>
              <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
              <p className="text-sm text-gray-600">Category: {product.category}</p>
            </div>
            <div className="space-x-2">
              <Button variant="secondary" onClick={() => onEdit(product)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => onDelete(product.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
