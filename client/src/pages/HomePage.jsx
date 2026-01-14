import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios.get("http://localhost:4001/products/");
      setProducts(results.data.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (productID) => {
    try {
      await axios.delete(`http://localhost:4001/products/${productID}`);
      setProducts((prev) => prev.filter((p) => p.id !== productID));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="layout-main">
      <section className="card">
        <header className="card-header">
          <div>
            <h2>Products</h2>
            <p className="subtle-meta">
              Product overview 
            </p>
          </div>
          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/create")}
          >
            New Product
          </button>
        </header>

        <div className="card-body">
          {isLoading && <p className="subtle-meta">Loading products…</p>}
          {isError && (
            <p className="subtle-meta">Request failed. Please try again.</p>
          )}

          {!isLoading && !products.length && !isError && (
            <p className="subtle-meta">
              No products yet. Create your first product to get started.
            </p>
          )}

          <div className="product-list">
            {products.map((product) => (
              <article key={product.id} className="product">
                <div className="product-preview">
                  <img
                    src={product.image}
                    alt={product.name}
                    width="72"
                    height="72"
                  />
                </div>
                <div className="product-detail">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-price">
                    ฿{Number(product.price).toLocaleString()}
                  </p>
                  <p className="product-description">
                    {product.description || "No description provided."}
                  </p>
                </div>
                <div className="product-actions">
                  <button
                    type="button"
                    className="chip-button"
                    onClick={() => navigate(`/view/${product.id}`)}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="chip-button"
                    onClick={() => navigate(`/edit/${product.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="chip-button chip-button--danger"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="card">
        <header className="card-header">
          <h2>Activity</h2>
          <span>Today</span>
        </header>
        <div className="card-body">
          <p className="subtle-meta">
            Use the actions on the left to create, inspect, and refine your
            product catalogue. Changes update in real time.
          </p>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
