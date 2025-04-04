import React, { useState, useMemo, useTransition, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Product, addProduct, updateProduct, deleteProduct } from "../../store/featcher/productSlice";
import { Button, Modal } from "../ui";
import ProductForm, { ProductFormValues } from "../forms/ProductForm";
import ProductTable from "../tables/ProductTable";
import Pagination from "../ui/Pagination";

const ITEMS_PER_PAGE = 5;

const ProductManager: React.FC = () => {
  const dispatch = useDispatch();
  const products: Product[] = useSelector((state: RootState) => state.products.products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const filteredProducts = useMemo(() => {
    const search = searchQuery.toLowerCase();
    return products.filter((product) =>
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search)
    );
  }, [products, searchQuery]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = useCallback((newPage: number) => {
    startTransition(() => {
      setCurrentPage(newPage);
    });
  }, []);

  const handleOpenModal = useCallback((product?: Product) => {
    setSelectedProduct(product || null);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  }, []);

  const handleAddProduct = useCallback((data: ProductFormValues) => {
    dispatch(addProduct(data));
    handleCloseModal();
  }, [dispatch, handleCloseModal]);

  const handleUpdateProduct = useCallback((data: ProductFormValues) => {
    if (selectedProduct) {
      dispatch(updateProduct({ id: selectedProduct.id, ...data }));
      handleCloseModal();
    }
  }, [dispatch, selectedProduct, handleCloseModal]);

  const handleDeleteProduct = useCallback((id: string) => {
    dispatch(deleteProduct(id));
  }, [dispatch]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Product Manager</h2>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          Add Product
        </Button>
      </div>

      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => startTransition(() => setSearchQuery(e.target.value))}
        className="border px-2 py-1 rounded-md w-full mb-4"
      />

      {isPending && <p className="text-gray-500">Loading...</p>}

      <ProductTable 
        products={paginatedProducts} 
        onEdit={handleOpenModal} 
        onDelete={handleDeleteProduct} 
      />

      <Pagination 
        currentPage={currentPage} 
        totalPages={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)} 
        onPageChange={handlePageChange} 
      />

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
