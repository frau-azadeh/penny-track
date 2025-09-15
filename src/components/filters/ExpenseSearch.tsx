import React, { useState, useTransition } from "react";

import { useDispatch } from "react-redux";

import { setSearchQuery } from "../../store/featcher/expenseSlice";
import { Input } from "../ui";

const ExpenseSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    startTransition(() => {
      dispatch(setSearchQuery(value));
    });
  };

  return (
    <div className="mb-4">
      <Input
        label="جستجو"
        value={query}
        onChange={handleSearch}
        placeholder="نام یا متن مورد نظر را برای جستجو وارد کنید"
        className="w-full"
      />
      {isPending && <p className="text-gray-500">به روزرسانی نتیجه ... </p>}
    </div>
  );
};

export default ExpenseSearch;
