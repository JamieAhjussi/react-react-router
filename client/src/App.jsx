import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ViewProductPage from "@/pages/ViewProductPage";
import EditProductPage from "@/pages/EditProductPage";
import CreateProductPage from "@/pages/CreateProductPage";

function App() {
  return (
    <div className="App">
      <header className="app-shell-header">
        <div className="app-shell-title">
          <h1>Products</h1>
          <p>React Router + Express mock API : Assignment TechUP</p>
        </div>
        <div className="app-shell-actions">
          <span className="pill">HackHour • React Router</span>
        </div>
      </header>

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
