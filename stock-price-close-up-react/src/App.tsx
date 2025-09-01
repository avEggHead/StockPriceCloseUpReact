import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StockLookup from "./pages/StockLookup";

function HomePage() {
  return <h1>Welcome to Stock Price Close-Up</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stocks" element={<StockLookup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
