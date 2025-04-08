import React, { useState, useMemo, useTransition, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  Product,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../store/featcher/productSlice";
import { Button, Modal, Input, Pagination } from "../ui";
import ProductForm, { ProductFormValues } from "../forms/ProductForm";
import ProductTable from "../tables/ProductTable";
import CategoryFilter from "../filters/CategoryFilter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ITEMS_PER_PAGE = 5;

const ProductManager: React.FC = () => {
  const dispatch = useDispatch();
  const products: Product[] = useSelector(
    (state: RootState) => state.products.products,
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const filteredProducts = useMemo(() => {
    const search = searchQuery.toLowerCase();
    return products.filter((product) => {
      const productName = product.name?.toLowerCase() || "";
      const productDescription = product.description?.toLowerCase() || "";
      return (
        (productName.includes(search) || productDescription.includes(search)) &&
        (selectedCategory === "All" || product.category === selectedCategory)
      );
    });
  }, [products, searchQuery, selectedCategory]);

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

  const handleAddProduct = useCallback(
    (data: ProductFormValues) => {
      dispatch(addProduct(data));
      handleCloseModal();
      toast.success("محصول با موفقیت اضافه شد!");
    },
    [dispatch, handleCloseModal],
  );

  const handleUpdateProduct = useCallback(
    (data: ProductFormValues) => {
      if (selectedProduct) {
        dispatch(updateProduct({ id: selectedProduct.id, ...data }));
        handleCloseModal();
        toast.success("محصول با موفقیت به‌روزرسانی شد!");
      }
    },
    [dispatch, selectedProduct, handleCloseModal],
  );

  const handleDeleteProduct = useCallback(
    (id: string) => {
      toast.warn(
        <div>
          <p>آیا از حذف محصول مطمئن هستید؟</p>
          <div className="flex space-x-2 mt-2">
            <Button
              variant="danger"
              onClick={() => {
                dispatch(deleteProduct(id));
                toast.dismiss();
                toast.success("محصول با موفقیت حذف شد!");
              }}
            >
              بله
            </Button>
            <Button variant="secondary" onClick={() => toast.dismiss()}>
              خیر
            </Button>
          </div>
        </div>,
      );
    },
    [dispatch],
  );

  return (
    <div className="p-4 space-y-4">
      <ToastContainer />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Product Manager</h2>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          Add Product
        </Button>
      </div>
      <CategoryFilter />
      <Input
        label="Search"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => startTransition(() => setSearchQuery(e.target.value))}
        className="border px-2 py-1 rounded-md w-full mb-4"
      />
      {isPending && <p className="text-gray-500">Loading...</p>}
      <div className="flex flex-col space-y-4">
        <h3>Table View</h3>
        <ProductTable
          products={paginatedProducts}
          onEdit={handleOpenModal}
          onDelete={handleDeleteProduct}
        />
      </div>
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