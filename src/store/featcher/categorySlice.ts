import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryState{
  categories: string[];
  selectedCategory: string;
}

const initialState: CategoryState={
  categories: ["همه","غذا","میوه","کتاب","لباس"],
  selectedCategory: "همه",
}

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers:{
    setCategories: (state, action:PayloadAction<string[]>)=>{
      state.categories = action.payload
    },
    selectCategory: (state, action: PayloadAction<string>)=>{
      state.selectedCategory = action.payload
    }
  }
})

export const {selectCategory, setCategories} = categorySlice.actions
export default categorySlice.reducer;