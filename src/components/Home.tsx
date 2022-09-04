import React from "react";
import PizzaBlock from "./PizzaBlock/PizzaBlock";
import Sort, { sortNames } from "./Sort";
import Categories from "./Categories";
import PizzaDetail from "./PizzaDetail";
import PizzaBlockLoader from "./PizzaBlock/PizzaBlockLoader";
import { Pagination } from "./Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveCategory,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

const Home:React.FC = () => {
  const activeCategory = useSelector((state: any) => state.filter.activeCategory);
  const sortType = useSelector((state: any) => state.filter.sortType);
  const currentPage = useSelector((state: any) => state.filter.currentPage);
  const { items, status } = useSelector((state: any) => state.pizza);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchValue = useSelector((state: any) => state.filter.searchValue);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const getPizzas = async () => {
    const category = activeCategory > 0 ? `category=${activeCategory}` : "";
    const order = sortType.sortProperty.replace("-", "");
    const orderBy = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";
    dispatch(
      //@ts-ignore
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

  const onChangeCategoryId = React.useCallback((id: number) => {
    dispatch(setActiveCategory(id))
  }, [])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          onChangeCategory={onChangeCategoryId}
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
            : items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={(number: number) => {
          dispatch(setCurrentPage(number));
        }}
      />
    </div>
  );
}

export default Home;
