import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function CreateProductForm() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const navigate = useNavigate();

  async function postProduct() {
    if (!productName) return;
    if (!productDescription) return;
    if (!productPrice) return;
    if (!productImage) return;

    const request = await axios.post("http://localhost:4001/products/", {
      name: productName,
      description: productDescription,
      price: productPrice,
      image: productImage,
    });
    // console.log(request);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await postProduct();
    navigate("/");
  }
  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Create Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            required
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url here"
            value={productImage}
            onChange={(e) => {
              setProductImage(e.target.value);
            }}
            required
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            value={productPrice}
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
            required
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Enter description here"
            value={productDescription}
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
            rows={4}
            cols={30}
            required
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default CreateProductForm;
