import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SEO from "./components/seo/SEO";
import Layout from "./components/layout/Layout";
import { Toaster } from "sonner";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <SEO
                title="Hero HQ | The Can Man"
                description="Join the elite team at The Can Man. Apply now to become a Hero and help us clean up Texas."
              />
              <Home />
            </Layout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
