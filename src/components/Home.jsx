import React from "react";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort, { sortNames } from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlockLoader from "../components/PizzaBlock/PizzaBlockLoader";
import { Pagination } from "./Pagination";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveCategory,
  setCurrentPage,
  setFilters,
} from "./../redux/slices/filterSlice";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

function Home() {
  const activeCategory = useSelector((state) => state.filter.activeCategory);
  const sortType = useSelector((state) => state.filter.sortType);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const fetchPizzas = () => {
    setIsLoading(true);
    const category = activeCategory > 0 ? `category=${activeCategory}` : "";
    const order = sortType.sortProperty.replace("-", "");
    const orderBy = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";
    axios
      .get(
        `https://62e2bc283891dd9ba8eeef9d.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${order}&order=${orderBy}&${search}`
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });
  };

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        activeCategory,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategory, sortType, currentPage]);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortType = sortNames.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sortType,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [activeCategory, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          onChangeCategory={(id) => dispatch(setActiveCategory(id))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => (
              <PizzaBlockLoader key={index} />
            ))
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={(number) => {
          dispatch(setCurrentPage(number));
        }}
      />
    </div>
  );
}

export default Home;
