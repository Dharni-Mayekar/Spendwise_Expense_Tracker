import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import AnalyticsPage from "./pages/AnalyticsPage";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";


function App() {
return (
<BrowserRouter>
<Routes>

    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password"element={<ForgotPassword />} />

    <Route element={<ProtectedRoute>
    <MainLayout />
    </ProtectedRoute>
}
>

<Route path="/" element={<Dashboard />} />
<Route path="/expenses" element={<Expenses />} />
<Route path="/analytics" element={<AnalyticsPage />} />
<Route path="/reports" element={<Reports />} />
<Route path="/profile" element={<Profile />} />


</Route>
</Routes>
</BrowserRouter>
);

}

export default App;