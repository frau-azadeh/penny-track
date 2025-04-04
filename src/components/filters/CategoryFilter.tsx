import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { selectCategory } from "../../store/featcher/categorySlice";

const CategoryFilter: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.categories);
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectCategory(event.target.value));
  };

  return (
    <div className="mb-4">
      <label className="mr-2">Filter by Category:</label>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="border px-2 py-1 rounded-md"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
