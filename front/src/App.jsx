import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Clients/components/Layout/Header';
import Footer from './Clients/components/Layout/Footer';
import Home from './Clients/pages/Home';
import Login from './Clients/pages/Auth/Login';
import Register from './Clients/pages/Auth/Register';
import ForgotPassword from "./Clients/pages/Auth/ForgotPassword";

// Imports Admin
import AdminLogin from './Admin/pages/AdminLogin';
import AdminDashboard from './Admin/pages/AdminDashboard';
import AdminUsers from './Admin/pages/AdminUsers';
import AdminArtisanVerification from './Admin/pages/AdminArtisanVerification';
import AdminModeration from './Admin/pages/AdminModeration';
import AdminAteliers from './Admin/pages/AdminAteliers';
import AdminServices from './Admin/pages/AdminServices';
import AdminAppointments from './Admin/pages/AdminAppointments';
import AdminReviews from './Admin/pages/AdminReviews';
import AdminSettings from './Admin/pages/AdminSettings';
import AdminLayout from './Admin/layouts/AdminLayout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Routes Client avec Header/Footer */}
                <Route path="/" element={
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-grow">
                            <Home />
                        </main>
                        <Footer />
                    </div>
                } />
                
                <Route path="/login" element={
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-grow">
                            <Login />
                        </main>
                        <Footer />
                    </div>
                } />
                
                <Route path="/register" element={
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-grow">
                            <Register />
                        </main>
                        <Footer />
                    </div>
                } />
                
                <Route path="/forgot-password" element={
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-grow">
                            <ForgotPassword />
                        </main>
                        <Footer />
                    </div>
                } />

                {/* Route connexion Admin (SANS Header/Footer) */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Routes Admin (SANS Header/Footer) */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="verification" element={<AdminArtisanVerification />} />
                    <Route path="moderation" element={<AdminModeration />} />
                    <Route path="ateliers" element={<AdminAteliers />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="appointments" element={<AdminAppointments />} />
                    <Route path="reviews" element={<AdminReviews />} />
                    <Route path="settings" element={<AdminSettings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;