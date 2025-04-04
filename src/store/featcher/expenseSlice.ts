import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// تعریف نوع هزینه
export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  description: string;
}

// حالت اولیه هزینه‌ها
interface ExpenseState {
  expenses: Expense[];
  searchQuery: string;
  startDate: string | null; // 💡 فیلتر تاریخ شروع
  endDate: string | null;   // 💡 فیلتر تاریخ پایان
}

const initialState: ExpenseState = {
  expenses: [],
  searchQuery: "",
  startDate: null,
  endDate: null,
};

// ایجاد اسلایس هزینه‌ها
const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (
        state,
        action: PayloadAction<{ title: string; amount: number | string; date: string; description: string }>
      ) => {
        const newExpense: Expense = {
          id: uuidv4(),
          title: action.payload.title,
          amount: Number(action.payload.amount),  // تبدیل به عدد
          date: action.payload.date,
          description: action.payload.description,
        };
        state.expenses.push(newExpense);
      },
    updateExpense: (
      state,
      action: PayloadAction<{ id: string; title: string; amount: number; date: string; description:string }>
    ) => {
      const expense = state.expenses.find((exp) => exp.id === action.payload.id);
      if (expense) {
        expense.title = action.payload.title;
        expense.amount = action.payload.amount;
        expense.date = action.payload.date;
        expense.description = action.payload.description;
      }
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter((exp) => exp.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
        state.searchQuery = action.payload;
      },
    setStartDate: (state, action: PayloadAction<string | null>) => {
        state.startDate = action.payload;
      },
    setEndDate: (state, action: PayloadAction<string | null>) => {
        state.endDate = action.payload;
      },
  },
});

// استخراج اکشن‌ها و ریدوسر
export const { addExpense, updateExpense, deleteExpense, setSearchQuery, setStartDate, setEndDate } = expenseSlice.actions;
export default expenseSlice.reducer;
