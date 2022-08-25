import React from "react";

type CategoriesProps = {
  activeCategory: number;
  onChangeCategory: any
}

const Categories:React.FC<CategoriesProps> = ({activeCategory, onChangeCategory}) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
    return(
        <div className="categories">
              <ul>
                {categories.map((item, i)=> <li key={i} onClick={()=>onChangeCategory(i)} className={activeCategory === i ? 'active' : ''}>{item}</li>)}
              </ul>
            </div>
    )
}

export default Categories;