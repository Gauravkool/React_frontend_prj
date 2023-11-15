import Product from "./Product";
import { useEffect, useState } from "react";
// import ProductsData from "./data";
import axios from "axios";
function ProductList() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get("http://localhost:8080/products");
    console.log("data", res.data);
    setProducts(res.data);
  };
  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:8080/products/${id}`);
    console.log("data", res.data);
    if (res.data._id) {
      setProducts(products.filter((p) => p._id !== res.data._id));
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {products.map((product, index) => (
        <Product {...product} key={index} handleDelete={handleDelete}></Product>
      ))}
    </>
  );
}

export default ProductList;
