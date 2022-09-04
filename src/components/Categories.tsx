import React from "react";
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
  activeCategory: number;
  onChangeCategory: (idx: number) => void
}

const Categories:React.FC<CategoriesProps> = React.memo(({activeCategory, onChangeCategory}) => {
  useWhyDidYouUpdate('Categories', {activeCategory, onChangeCategory});
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
    return(
        <div className="categories">
              <ul>
                {categories.map((item, i)=> <li key={i} onClick={()=>onChangeCategory(i)} className={activeCategory === i ? 'active' : ''}>{item}</li>)}
              </ul>
            </div>
    )
})

export default Categories;