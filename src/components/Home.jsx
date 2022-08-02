import React from "react";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlockLoader from "../components/PizzaBlock/PizzaBlockLoader";
import { Pagination } from "./Pagination";
import { SearchContext } from "../App";

function Home() {
  const {searchValue} = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortType, setActiveSortType] = React.useState({
    name: "популярности (desc)",
    sortProperty: "rating",
  });
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  const category = activeCategory > 0 ? `category=${activeCategory}` : "";
  const order = sortType.sortProperty.replace('-', '');
  const orderBy = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const search = searchValue ? `search=${searchValue}`: '';

  React.useEffect(() => {
    setIsLoading(true);
    fetch(`https://62e2bc283891dd9ba8eeef9d.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${order}&order=${orderBy}&${search}`)
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, [activeCategory, sortType, searchValue, currentPage]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          onChangeCategory={(id) => setActiveCategory(id)}
        />
        <Sort
          sortType={sortType}
          onChangeSortType={(id) => setActiveSortType(id)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => (
              <PizzaBlockLoader key={index} />
            ))
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Home;
