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

    // 💡 استفاده از useTransition برای اعمال تغییر
    startTransition(() => {
      dispatch(setSearchQuery(value));
    });
  };

  return (
    <div className="mb-4">
      <Input
        label="Search Expenses"
        name="search"
        value={query}
        onChange={handleSearch}
        placeholder="Search by name or description..."
        className="w-full"
      />
      {isPending && <p className="text-gray-500">Updating results...</p>}
    </div>
  );
};

export default ExpenseSearch;
