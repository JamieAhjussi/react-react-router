import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ViewProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setError("ไม่พบรหัสสินค้า");
      return;
    }

    let cancelled = false;

    async function fetchProduct() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(`http://localhost:4001/products/${id}`);

        if (cancelled) return;

        setProduct(response.data.data);
      } catch (err) {
        if (cancelled) return;
        setError("ไม่สามารถดึงข้อมูลสินค้าได้ กรุณาลองใหม่อีกครั้ง");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <main className="layout-main-full">
      <section className="card">
        <header className="card-header">
          <div>
            <h2>Product detail</h2>
            <p className="subtle-meta">Focused, minimal view of a single item</p>
          </div>
          <button
            type="button"
            className="ghost-button"
            onClick={() => navigate("/")}
          >
            Back to list
          </button>
        </header>

        <section className="view-product-container">
          {isLoading && <p className="subtle-meta">Loading product…</p>}

          {!isLoading && error && <p className="subtle-meta">{error}</p>}

          {!isLoading && !error && product && (
            <article>
              <h2>{product.name}</h2>
              <p className="product-price">
                ฿{Number(product.price).toLocaleString()}
              </p>
              <p>{product.description}</p>
            </article>
          )}
        </section>
      </section>
    </main>
  );
}

export default ViewProductPage;