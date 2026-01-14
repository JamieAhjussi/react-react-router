import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProductForm() {
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const navigate = useNavigate();

  const getProduct = async () => {
    const response = await axios.get(`http://localhost:4001/products/${id}`);
    const data = response.data.data;

    setProductName(data.name);
    setProductDescription(data.description);
    setProductImage(data.image);
    setProductPrice(data.price);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!productName || !productDescription || !productPrice || !productImage) {
      return;
    }

    await axios.put(`http://localhost:4001/products/${id}`, {
      name: productName,
      description: productDescription,
      price: productPrice,
      image: productImage,
    });

    navigate(`/`);
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Edit product</h1>

      <div className="input-container">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className="field"
          placeholder="Enter name"
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
          placeholder="Update the description for this product."
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
          Save changes
        </button>
      </div>
    </form>
  );
}

export default EditProductForm;
