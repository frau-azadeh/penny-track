import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid"
export interface Product{
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  date: string;
  category: string;
}

interface ProductState{
  products: Product[];
  searchQuery: string;
}

const initialState: ProductState = {
  products: [],
  searchQuery: "",
}

export const productSlice = createSlice({
  initialState,
  name: "products",
  reducers:{
    addProduct: (state, action:PayloadAction<{
      name: string;
      price: number;
      quantity: number;
      date: string;
      description: string;
      category: string;
    }>)=>{
      const newProduct: Product = {
        id: uuidv4(),
        name: action.payload.name,
        price: action.payload.price,
        quantity: action.payload.quantity,
        date: action.payload.date,
        description: action.payload.description,
        category: action.payload.category,
      }
      state.products.push(newProduct);
    },
    updateProduct: (
      state, 
      action:PayloadAction<{
        id: string;
        name: string;
        price: number;
        quantity: number;
        date: string;
        description: string;
        category: string;
      }>)=>{
        const product = state.products.find((p)=> p.id === action.payload.id);
        if(product){
          product.name = action.payload.name;
          product.price = action.payload.price;
          product.quantity = action.payload.quantity;
          product.date = action.payload.date;
          product.description = action.payload.description;
          product.category = action.payload.category;
        }
    },
    deleteProduct: (state, action: PayloadAction<string>)=>{
      state.products = state.products.filter((p)=> p.id !== action.payload)
    },
    setSearchQuery:(state, action:PayloadAction<string>)=>{
      state.searchQuery = action.payload
    }
  }
})

export const {addProduct, updateProduct, deleteProduct, setSearchQuery} = productSlice.actions
export default productSlice.reducer


