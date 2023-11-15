import axios from "axios";
import "./AddProduct.css";
import { useState } from "react";

function AddProduct() {
  const [product, setProduct] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    console.log(product);
    addProduct(product);
  }

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  const addProduct = async (product) => {
    const res = await axios.post("http://localhost:8080/products", product);
    console.log("data", res.data);
    // setProduct(product);
  };

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <fieldset>
        {/* Form Name */}
        <legend>Add Product</legend>
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="title">
            Title
          </label>
          <div className="col-md-4">
            <input
              id="title"
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="title"
              className="form-control input-md"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="thumbnail">
            Thumbnail
          </label>
          <div className="col-md-4">
            <input
              id="thumbnail"
              type="text"
              name="thumbnail"
              onChange={handleChange}
              placeholder="thumbnail"
              className="form-control input-md"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="price">
            Price
          </label>
          <div className="col-md-4">
            <input
              id="price"
              type="number"
              name="price"
              onChange={handleChange}
              placeholder="price"
              className="form-control input-md"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="category">
            Category
          </label>
          <div className="col-md-4">
            <select
              id="category"
              name="category"
              onChange={handleChange}
              className="form-control">
              <option value="">Choose</option>
              <option value="smartphone">SmartPhone</option>
              <option value="laptops">Laptops</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="brand">
            Brand
          </label>
          <div className="col-md-4">
            <select
              id="brand"
              name="brand"
              onChange={handleChange}
              className="form-control">
              <option value="">Choose</option>
              <option value="apple">Apple</option>
              <option value="samsung">Samsung</option>
              <option value="oppo">Oppo</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="title">
            DiscountPercentage
          </label>
          <div className="col-md-4">
            <input
              id="discountPercentage"
              type="number"
              name="discountPercentage"
              onChange={handleChange}
              placeholder="discountPercentage"
              className="form-control input-md"
            />
          </div>
        </div>
        <button className="btn btn-primary">Add</button>
      </fieldset>
    </form>
  );
}

export default AddProduct;
