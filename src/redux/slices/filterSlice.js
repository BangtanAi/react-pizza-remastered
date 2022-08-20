import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,
  sortType: {
    name: "популярности (desc)",
    sortProperty: "rating",
  },
  searchValue: '',
  currentPage: 1
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory: (state, action)=>{
        state.activeCategory = action.payload
    },
    setSearchValue: (state, action) =>{
        state.searchValue = action.payload
    },
    setActiveSortType: (state, action)=>{
        state.sortType = action.payload
    },
    setCurrentPage: (state, action)=>{
        state.currentPage = action.payload
    },
    setFilters: (state, action) => {
      state.activeCategory = Number(action.payload.currentPage);
      state.sortType = action.payload.sortType;
      state.currentPage = Number(action.payload.currentPage);
    }
  },
})

// Action creators are generated for each case reducer function
export const { setActiveCategory, setActiveSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer