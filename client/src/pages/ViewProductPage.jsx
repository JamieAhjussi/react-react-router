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
    <main>
      <header>
        <h1>View Product Page</h1>
      </header>

      <section className="view-product-container">
        {isLoading && <p>Loading...</p>}

        {!isLoading && error && <p>{error}</p>}

        {!isLoading && !error && product && (
          <article>
            <h2>Product Title {product.name}</h2>
            <p>{product.description}</p>
          </article>
        )}
      </section>

      <section>
        <button type="button" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </section>
    </main>
  );
}

export default ViewProductPage;