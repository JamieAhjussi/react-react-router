import { useNavigate } from "react-router-dom";
import EditProductForm from "../components/EditProductForm";

function EditProductPage() {
  const navigate = useNavigate();

  return (
    <main className="layout-main-full">
      <section className="card">
        <header className="card-header">
          <div>
            <h2>Edit product</h2>
            <p className="subtle-meta">
              Refine details while keeping the interface quiet.
            </p>
          </div>
          <button
            type="button"
            className="ghost-button"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to list
          </button>
        </header>

        <EditProductForm />
      </section>
    </main>
  );
}

export default EditProductPage;
