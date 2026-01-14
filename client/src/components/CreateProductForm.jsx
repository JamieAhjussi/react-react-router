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
    if (!productName || !productDescription || !productPrice || !productImage) {
      return;
    }

    await axios.post("http://localhost:4001/products/", {
      name: productName,
      description: productDescription,
      price: productPrice,
      image: productImage,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await postProduct();
    navigate("/");
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Create product</h1>

      <div className="input-container">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className="field"
          placeholder="Minimal desk lamp, ceramic mug…"
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          required
        />
      </div>

      <div className="input-container">
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          name="image"
          type="text"
          className="field"
          placeholder="https://"
          value={productImage}
          onChange={(e) => {
            setProductImage(e.target.value);
          }}
          required
        />
      </div>

      <div className="input-container">
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          className="field"
          placeholder="0.00"
          value={productPrice}
          onChange={(e) => {
            setProductPrice(e.target.value);
          }}
          required
        />
      </div>

      <div className="input-container">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="field field-textarea"
          placeholder="A short, clear description of your product."
          value={productDescription}
          onChange={(e) => {
            setProductDescription(e.target.value);
          }}
          rows={4}
          cols={30}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-button">
          Create product
        </button>
      </div>
    </form>
  );
}

export default CreateProductForm;
