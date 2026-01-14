import { useNavigate } from "react-router-dom";
import CreateProductForm from "../components/CreateProductForm";

function CreateProductPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Create Product Page</h1>
      <CreateProductForm />
      <button type="button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default CreateProductPage;
