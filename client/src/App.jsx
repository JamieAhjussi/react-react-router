import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ViewProductPage from "@/pages/ViewProductPage";
import EditProductPage from "@/pages/EditProductPage";
import CreateProductPage from "@/pages/CreateProductPage";
function App() {
  return (
    <div className="App">
      {/* Start coding here */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/view/:id" element={<ViewProductPage />} />
          <Route path="/edit/:id" element={<EditProductPage />} />
          <Route path="/create" element={<CreateProductPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
