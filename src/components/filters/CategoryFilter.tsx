import React, { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { selectCategory } from "../../store/featcher/categorySlice";

const CategoryFilter: React.FC = () => {
  const dispatch = useDispatch();

  // استفاده از useMemo برای بهینه کردن دسترسی به دسته‌بندی‌ها
  const categories = useSelector((state: RootState) => state.category.categories);
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);

  const memoizedCategories = useMemo(() => categories, [categories]);

  // استفاده از useCallback برای جلوگیری از ساخت مجدد تابع
  const handleCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(selectCategory(event.target.value));
    },
    [dispatch]
  );

  return (
    <div className="mb-4">
      <label className="mr-2">Filter by Category:</label>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="border px-2 py-1 rounded-md"
      >
        {memoizedCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
