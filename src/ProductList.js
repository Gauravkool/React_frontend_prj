import Product from "./Product";
import { useEffect, useState } from "react";
// import ProductsData from "./data";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtodXNoaUBzb2h1LmNvbSIsImlhdCI6MTcwMDM4ODgyNn0.VN5CHQDBGVCsRisci4MIViT4oR9pFDNvHC6wOq1P7TIxksm5KtJRD5TZW4n8NafXmy1aA3bVITAX-G61lG7KkaPVpJKp-dbIW3cRQWtpW25QAyRkWhT_iUSafdiXuyODuOHVcYBKkrvOP5ybc-FXAyU-d29U03tdQI_qxhLEJCQEOSJc8hCsK7sDzxYWO9zm353Bexgtjtd7WToX5F2IukfmbzoURiBGpZDIo1f2EgovcPYW4WNfOn7pI0Po_Y7yoNBnrvHcHZN9_NqVzYZKPdKykyDmR5O818TEk2b70Jz52jmOwB4CVQK_AA0sUnij_gk6PoHxwhWWHYwp7qKp7w";
function ProductList() {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const getProducts = async () => {
    const res = await axios.get("/products");
    const data = await res.data;
    setProducts(data);
    setTotalPage(Object.keys(data).length);
    console.log(data);
    // console.log(Object.keys(data).length);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`/products/${id}`);
    console.log("data", res.data);
    if (res.data._id) {
      setProducts(products.filter((p) => p._id !== res.data._id));
    }
  };

  const handlePage = async (page) => {
    const res = await axios.get("/products?page=" + page);
    setProducts(res.data);
  };
  const handleSort = async (e) => {
    const field = e.target.value.split(".");
    const res = await axios.get(`/products?sort=${field[0]}&order=${field[1]}`);
    setProducts(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <select onChange={handleSort}>
        <option value="price.desc">Price High to Low</option>
        <option value="price.asc">Price Low to High</option>
        <option value="rating.desc">Rating High to Low</option>
        <option value="rating.asc">Rating Low to High</option>
      </select>
      {Array(Math.ceil(totalPage / 4))
        .fill(0)
        .map((e, i) => (
          <button key={i} onClick={() => handlePage(i + 1)}>{i + 1}</button>
        ))}
      {products.map((product, index) => (
        <Product {...product} key={index} handleDelete={handleDelete}></Product>
      ))}
    </>
  );
}

export default ProductList;
