import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

function PizzaDetail() {
  const { id } = useParams();
  const [item, setItems] = React.useState();
  React.useEffect(() => {
    async function fetchPizza() {
      const { data } = await axios.get(
        "https://62e2bc283891dd9ba8eeef9d.mockapi.io/pizzas/" + id
      );
      setItems(data);
    }
    fetchPizza()
  }, []);
  if (!item) {
    return <div className="container">Загрузка...</div>;
  }
  return (
    <div className="container">
      <h4>{item.name}</h4>
      <p>{item.price}</p>
      <img src={item.imageUrl} alt="" />
    </div>
  );
}

export default PizzaDetail;
