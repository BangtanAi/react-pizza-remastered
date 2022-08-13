import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalCount = state.items.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0
    },
    removeItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice -= findItem.price * findItem.count
      state.totalCount -= findItem.count
    },
    plusItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count++;
      }
      state.totalPrice += findItem.price;
      state.totalCount++;
    },
    minusItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice -= findItem.price;
      state.totalCount--;
    },
  },
});

export const selectCartItemById = (id) => (state) => state.cart.items.find(obj => obj.id === id)

// Action creators are generated for each case reducer function
export const { addItem, removeItem, plusItem, minusItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
