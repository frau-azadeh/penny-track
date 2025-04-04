import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Product, addProduct, updateProduct, deleteProduct } from "../../store/featcher/productSlice";
import { Button, Modal } from "../ui";
import ProductForm, { ProductFormValues } from "../forms/ProductForm";

const ProductManager: React.FC = () => {
  const dispatch = useDispatch();
  const products: Product[] = useSelector((state: RootState) => state.products.products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // باز کردن مودال برای افزودن یا ویرایش
  const handleOpenModal = (product?: Product) => {
    if (product) setSelectedProduct(product);
    else setSelectedProduct(null);
    setIsModalOpen(true);
  };

  // بستن مودال
  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // مدیریت افزودن محصول
  const handleAddProduct = (data: ProductFormValues) => {
    dispatch(addProduct(data));
    handleCloseModal();
  };

  // مدیریت ویرایش محصول
  const handleUpdateProduct = (data: ProductFormValues) => {
    if (selectedProduct) {
      dispatch(updateProduct({ id: selectedProduct.id, ...data }));
      handleCloseModal();
    }
  };

  // مدیریت حذف محصول
  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Product Manager</h2>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border">
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">{product.quantity}</td>
                <td className="border p-2">{product.date}</td>
                <td className="border p-2">{product.description}</td>
                <td className="border p-2 space-x-2">
                  <Button variant="secondary" onClick={() => handleOpenModal(product)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* مودال افزودن یا ویرایش محصول */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ProductForm
          onSubmit={selectedProduct ? handleUpdateProduct : handleAddProduct}
          defaultValues={selectedProduct || undefined}
        />
      </Modal>
    </div>
  );
};

export default ProductManager;
