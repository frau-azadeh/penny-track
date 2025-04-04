import React, { useState, useTransition } from "react";
import { useDispatch } from "react-redux";
import { setStartDate, setEndDate } from "../../store/featcher/expenseSlice";

const DateFilter: React.FC = () => {
  const [startDate, setStartDateValue] = useState<string>("");
  const [endDate, setEndDateValue] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStartDateValue(value);
    startTransition(() => {
      dispatch(setStartDate(value));
    });
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEndDateValue(value);
    startTransition(() => {
      dispatch(setEndDate(value));
    });
  };

  return (
    <div className="flex space-x-4 mb-4">
      <div>
        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="border px-2 py-1 rounded-md"
        />
      </div>
      <div>
        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="border px-2 py-1 rounded-md"
        />
      </div>
      {isPending && <p className="text-gray-500">Filtering...</p>}
    </div>
  );
};

export default DateFilter;
