import React, { useState, useTransition } from 'react'
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../store/featcher/expenseSlice';
import { Input } from '../ui';

const ExpenseForm:  React.FC = () => {
  const [query, setQuery] = useState("");
  const [isPending, statrtTransition] = useTransition();
  const dispatch = useDispatch();

  const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    statrtTransition(()=>{
      dispatch(setSearchQuery(value))
    })
  }

  return (
    <div className='mb-4'>
      <Input
        label='جستجو'
        placeholder='نام  مورد نظر را تایپ کنید'
        value={query}
        className='w-full'
        onChange={handleSearch}
      />
      {isPending && <p className='text-gray-500'>در حال به روز رسانی نتایج ...</p>}
    </div>
  )
}

export default ExpenseForm