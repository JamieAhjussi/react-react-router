import { useNavigate } from "react-router-dom";
import CreateProductForm from "../components/CreateProductForm";

function CreateProductPage() {
  const navigate = useNavigate();

  return (
    <main className="layout-main-full">
      <section className="card">
        <header className="card-header">
          <div>
            <h2>Create product</h2>
            <p className="subtle-meta">
              Add a new minimal product to your collection.
            </p>
          </div>
          <button
            type="button"
            className="ghost-button"
            onClick={() => navigate("/")}
          >
            Back to list
          </button>
        </header>

        <CreateProductForm />
      </section>
    </main>
  );
}

export default CreateProductPage;
