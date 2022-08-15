import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    "pizza/fetchAllPizzas",
    async (params) => {
      const {currentPage, category, order, orderBy, search} = params;
      const res = await axios.get(
        `https://62e2bc283891dd9ba8eeef9d.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${order}&order=${orderBy}&${search}`
      );
      return res.data;
    }
  );

const initialState = {
  items: [],
  status: "loading",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
      setItems(state, action){
          state.items = action.payload
      }
  },
  extraReducers: {
      [fetchPizzas.pending]: (state)=> {
          state.status = 'loading';
          state.items = [];
      },
      [fetchPizzas.fulfilled]: (state, action)=>{
          state.items = action.payload;
          state.status = 'success';
      },
      [fetchPizzas.rejected]: (state, action) =>{
          state.status = 'error';
          state.items = [];
      }
  }
});

// Action creators are generated for each case reducer function
export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
