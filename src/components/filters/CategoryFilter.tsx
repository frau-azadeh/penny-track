import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store';
import { selectCategory } from "../../store/featcher/categorySlice";
const CategoryFilter:React.FC = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state: RootState)=>state.category.categories);
  const selectedCategory = useSelector((state: RootState)=> state.category.selectedCategory);

  const memorizedCategories = useMemo (()=> categories, [categories]);

  const handleCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>)=>{
      dispatch(selectCategory(event.target.value))
    },
    [dispatch]
  )
  return (
    <div className='mb-4'>
      <label className='mr-2'>فیلتر بر اساس دسته بندی: </label>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className='border px-2 py-1 rounded-md'
      >
        {memorizedCategories.map((category)=>(
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategoryFilter