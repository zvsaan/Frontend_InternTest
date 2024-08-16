import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ExpenseListPage from "./pages/ExpenseListPage";
import WalletManagementPage from "./pages/WalletManagementPage";
import CategoryManagementPage from "./pages/CategoryManagementPage";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <Router>
      {" "}
      <Routes>
        {" "}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />{" "}
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />{" "}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />{" "}
        <Route
          path="/daftarpengeluaran"
          element={
            isAuthenticated ? <ExpenseListPage /> : <Navigate to="/login" />
          }
        />{" "}
        <Route
          path="/dompet"
          element={
            isAuthenticated ? (
              <WalletManagementPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />{" "}
        <Route
          path="/kategori"
          element={
            isAuthenticated ? (
              <CategoryManagementPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />{" "}
        <Route path="*" element={<Navigate to="/dashboard" />} />{" "}
      </Routes>{" "}
    </Router>
  );
}
export default App;