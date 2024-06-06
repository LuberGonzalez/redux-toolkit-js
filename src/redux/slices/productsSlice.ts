import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product, ProductState } from "../../types/prouductsTypes";

const initialState: ProductState = {
  data: [],
};

const produtsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    createProducts: (state, action: PayloadAction<Product>) => {
      state.data = [...state.data, action.payload];
    },
    readProducts: (state, action: PayloadAction<Product[]>) => {
      state.data = action.payload;
    },
    updateProducts: (state, action: PayloadAction<Product>) => {
      const { id, name } = action.payload;
      const product = state.data.find((product) => product.id === id);
      if (product) {
        product.name = name;
      }
    },
    deleteProducts: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.data = state.data.filter((product) => product.id !== id);
    },
  },
});

export const { createProducts, readProducts, updateProducts, deleteProducts } =
  produtsSlice.actions;

export default produtsSlice.reducer;
