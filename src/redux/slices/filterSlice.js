import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,
  sortType: {
    name: "популярности (desc)",
    sortProperty: "rating",
  },
  currentPage: 1
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory: (state, action)=>{
        state.activeCategory = action.payload
    },
    setActiveSortType: (state, action)=>{
        state.sortType = action.payload
    },
    setCurrentPage: (state, action)=>{
        state.currentPage = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setActiveCategory, setActiveSortType, setCurrentPage } = filterSlice.actions

export default filterSlice.reducer