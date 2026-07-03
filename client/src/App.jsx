import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import AnalyticsPage from "./pages/AnalyticsPage";
import BudgetPage from "./pages/BudgetPage";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Login from "./pages/Login";


function App() {
return (
<BrowserRouter>
<Routes>
    <Route path="/login" element={<Login />} />
<Route element={<ProtectedRoute>
    <MainLayout />
    </ProtectedRoute>
}
>

<Route path="/" element={<Dashboard />} />
<Route path="/expenses" element={<Expenses />} />
<Route path="/analytics" element={<AnalyticsPage />} />
<Route path="/budget" element={<BudgetPage />} />
<Route path="/reports" element={<Reports />} />
<Route path="/profile" element={<Profile />} />

</Route>
</Routes>
</BrowserRouter>
);

}

export default App;