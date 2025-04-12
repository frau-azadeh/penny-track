import React, { useState, useMemo, useTransition, useCallback, useEffect } from "react";
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

// تعداد آیتم‌ها در هر صفحه
const ITEMS_PER_PAGE = 5;

const ProductManager: React.FC = () => {
  const dispatch = useDispatch();

  // گرفتن محصولات و دسته‌بندی انتخاب‌شده از redux
  const products = useSelector((state: RootState) => state.products.products);
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );

  // مدیریت وضعیت‌ها
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  // زمانی که جستجو یا دسته تغییر کنه، برگرد به صفحه اول
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // فیلتر کردن محصولات براساس جستجو و دسته‌بندی
  const filteredProducts = useMemo(() => {
    const search = searchQuery.toLowerCase();
    return products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";
      return (
        (name.includes(search) || description.includes(search)) &&
        (selectedCategory === "All" || product.category === selectedCategory)
      );
    });
  }, [products, searchQuery, selectedCategory]);

  // گرفتن آیتم‌های صفحه جاری
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // تغییر صفحه با transition
  const handlePageChange = useCallback((newPage: number) => {
    startTransition(() => {
      setCurrentPage(newPage);
    });
  }, []);

  // باز کردن مدال با یا بدون محصول برای ویرایش
  const handleOpenModal = useCallback((product?: Product) => {
    setSelectedProduct(product || null);
    setIsModalOpen(true);
  }, []);

  // بستن مدال
  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  }, []);

  // افزودن محصول جدید
  const handleAddProduct = useCallback(
    (data: ProductFormValues) => {
      dispatch(addProduct(data));
      handleCloseModal();
      toast.success("محصول با موفقیت اضافه شد!");
    },
    [dispatch, handleCloseModal]
  );

  // بروزرسانی محصول
  const handleUpdateProduct = useCallback(
    (data: ProductFormValues) => {
      if (selectedProduct) {
        dispatch(updateProduct({ id: selectedProduct.id, ...data }));
        handleCloseModal();
        toast.success("محصول با موفقیت بروزرسانی شد!");
      }
    },
    [dispatch, selectedProduct, handleCloseModal]
  );

  // حذف محصول با تأیید کاربر
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
        </div>
      );
    },
    [dispatch]
  );

  return (
    <div className="p-4 space-y-4">
      <ToastContainer />
      {/* سربرگ */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">مدیریت محصولات</h2>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          افزودن محصول
        </Button>
      </div>

      {/* فیلتر دسته و جستجو */}
      <CategoryFilter />
      <Input
        label="جستجو"
        placeholder="نام یا توضیحات محصول..."
        value={searchQuery}
        onChange={(e) => {
          const value = e.target.value;
          startTransition(() => setSearchQuery(value));
        }}
        className="border px-2 py-1 rounded-md w-full mb-4"
      />
      {isPending && <p className="text-gray-500">در حال بارگذاری...</p>}

      {/* جدول محصولات */}
      <div className="flex flex-col space-y-4">
        <h3 className="font-semibold">لیست محصولات</h3>
        <ProductTable
          products={paginatedProducts}
          onEdit={handleOpenModal}
          onDelete={handleDeleteProduct}
        />
      </div>

      {/* صفحه‌بندی */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
        onPageChange={handlePageChange}
      />

      {/* مدال فرم محصول */}
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
