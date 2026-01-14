import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProductForm() {
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [product,setProduct]=useState('');
  const navigate = useNavigate();


  const getProduct=async ()=>{
    const response = await axios.get(`http://localhost:4001/products/${id}`)
    setProduct(response.data.data);
    const data = response.data.data;

    setProduct(data);
    setProductName(data.name);
    setProductDescription(data.description);
    setProductImage(data.image);
    setProductPrice(data.price);
  }

  async function updateProduct() {
    if (!productName) return;
    if (!productDescription) return;
    if (!productPrice) return;
    if (!productImage) return;

    const request = await axios.put(`http://localhost:4001/products/${id}`, {
      name: productName,
      description: productDescription,
      price: productPrice,
      image: productImage,
    });
    // console.log(request);

    navigate(`/`);
  }


  useEffect(()=>{
    getProduct();
  },[id])

  return (
    <form className="product-form" onSubmit={updateProduct}>
      <h1>Edit Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            value={productName}
            onChange={(e) => {setProductName(e.target.value)}}
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
            onChange={(e) => {setProductImage(e.target.value)}}
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
            onChange={(e) => {setProductPrice(e.target.value)}}
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
            onChange={(e) => {setProductDescription(e.target.value)}}
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default EditProductForm;
