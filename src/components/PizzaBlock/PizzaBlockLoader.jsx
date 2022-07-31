import React from "react"
import ContentLoader from "react-content-loader"

const PizzaBlockLoader = (props) => (
  <ContentLoader 
    speed={1}
    width={280}
    height={455}
    viewBox="0 0 280 455"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="pizza-block"
    {...props}
  >
    <circle cx="137" cy="124" r="125" /> 
    <rect x="-3" y="260" rx="5" ry="5" width="280" height="24" /> 
    <rect x="1" y="302" rx="5" ry="5" width="280" height="77" /> 
    <rect x="5" y="391" rx="5" ry="5" width="140" height="42" /> 
    <rect x="150" y="392" rx="5" ry="5" width="140" height="42" />
  </ContentLoader>
)

export default PizzaBlockLoader;