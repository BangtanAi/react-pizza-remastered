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
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

function Home() {
  const activeCategory = useSelector((state) => state.filter.activeCategory);
  const sortType = useSelector((state) => state.filter.sortType);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const { items, status } = useSelector((state) => state.pizza);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchValue } = React.useContext(SearchContext);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const getPizzas = async () => {
    const category = activeCategory > 0 ? `category=${activeCategory}` : "";
    const order = sortType.sortProperty.replace("-", "");
    const orderBy = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";
    dispatch(
      fetchPizzas({
        currentPage,
        category,
        order,
        orderBy,
        search,
      })
    );
    window.scrollTo(0, 0);
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
      getPizzas();
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
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить питсы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(6)].map((_, index) => (
                <PizzaBlockLoader key={index} />
              ))
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      )}
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
