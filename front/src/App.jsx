import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Header from "./Clients/components/Layout/Header";
import Footer from "./Clients/components/Layout/Footer";

// Auth
import Home          from "./Clients/pages/Home";
import Login         from "./Clients/pages/Auth/Login";
import Register      from "./Clients/pages/Auth/Register";
import ForgotPassword from "./Clients/pages/Auth/ForgotPassword";

// Catalog
import ArtisansList  from "./Clients/pages/Catalog/ArtisansList";
import ArtisanDetail from "./Clients/pages/Catalog/ArtisanDetail";

// Services
import MyServices      from "./Clients/pages/Services/MyServices";
import ServiceRequest  from "./Clients/pages/Services/ServiceRequest";
import ServiceImmediate from "./Clients/pages/Services/ServiceImmediate";

// Appointments
import MyAppointments  from "./Clients/pages/Appointments/MyAppointments";
import BookAppointment from "./Clients/pages/Appointments/BookAppointment";

// Profile
import ClientProfile from "./Clients/pages/Profile/ClientProfile";
import EditProfile   from "./Clients/pages/Profile/EditProfile";

// Atelier
import CreateAtelier   from "./Clients/pages/Atelier/CreateAtelier";
import EditAtelier     from "./Clients/pages/Atelier/EditAtelier";
import GestionHoraires from "./Clients/pages/Atelier/Gestionhoraires";
import GestionOeuvres  from "./Clients/pages/Atelier/Gestionoeuvres";
import GestionOffres   from "./Clients/pages/Atelier/Gestionoffres";

// Reviews
import WriteReview from "./Clients/pages/Reviews/WriteReview";
import MyReviews   from "./Clients/pages/Reviews/MyReviews";

// Notifications
import NotificationsList from "./Clients/pages/Notifications/NotificationsList";

// Admin
import AdminLogin              from "./Admin/pages/AdminLogin";
import AdminDashboard          from "./Admin/pages/AdminDashboard";
import AdminUsers              from "./Admin/pages/AdminUsers";
import AdminArtisanVerification from "./Admin/pages/AdminArtisanVerification";
import AdminModeration         from "./Admin/pages/AdminModeration";
import AdminAteliers           from "./Admin/pages/AdminAteliers";
import AdminServices           from "./Admin/pages/AdminServices";
import AdminAppointments       from "./Admin/pages/AdminAppointments";
import AdminReviews            from "./Admin/pages/AdminReviews";
import AdminSettings           from "./Admin/pages/AdminSettings";
import AdminLayout             from "./Admin/layouts/AdminLayout";

import { AuthProvider } from "./Clients/components/Auth/AuthContext";
import ProtectedRoute  from "./component/ProtectedRoute";

// ── Wrapper layout client (évite la répétition)
function ClientLayout({ children, pt }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow${pt ? ` ${pt}` : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* ========== ROUTES CLIENT ========== */}

                    {/* Home */}
                    <Route
                        path="/"
                        element={
                            <div className="flex flex-col min-h-screen">
                                <Header />
                                <main className="flex-grow">
                                    <Home />
                                </main>
                                <Footer />
                            </div>
                        }
                    />

                    {/* Auth */}
                    <Route
                        path="/login"
                        element={
                            <div className="flex flex-col min-h-screen">
                                <Header />
                                <main className="flex-grow">
                                    <Login />
                                </main>
                                <Footer />
                            </div>
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            <div className="flex flex-col min-h-screen">
                                <Header />
                                <main className="flex-grow pt-20 md:pt-20 ">
                                    <Register />
                                </main>
                                <Footer />
                            </div>
                        }
                    />

                    <Route
                        path="/forgot-password"
                        element={
                            <div className="flex flex-col min-h-screen">
                                <Header />
                                <main className="flex-grow">
                                    <ForgotPassword />
                                </main>
                                <Footer />
                            </div>
                        }
                    />

                    {/* Catalog - Artisans */}
                    <Route
                        path="/artisans"
                        element={
                            <AuthComponent>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow">
                                        <ArtisansList />
                                    </main>
                                    <Footer />
                                </div>
                            </AuthComponent>
                        }
                    />

                    <Route
                        path="/artisan/:id"
                        element={
                            <AuthComponent>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow">
                                        <ArtisanDetail />
                                    </main>
                                    <Footer />
                                </div>
                            </AuthComponent>
                        }
                    />

                    {/* Services */}
                    <Route
                        path="/my-services"
                        element={
                            <AuthComponent>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow">
                                        <MyServices />
                                    </main>
                                    <Footer />
                                </div>
                            </AuthComponent>

                        }
                    />

                    <Route
                        path="/services/request"
                        element={
                            <AuthComponent>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow">
                                        <ServiceRequest />
                                    </main>
                                    <Footer />
                                </div>
                            </AuthComponent>
                        }
                    />

                    <Route
                        path="/services/request/:artisanId"
                        element={
                            <AuthComponent>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow">
                                        <ServiceRequest />
                                    </main>
                                    <Footer />
                                </div>
                            </AuthComponent>
                        }
                    />

                    <Route
                        path="/services/immediate"
                        element={
                            <AuthComponent>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow">
                                        <ServiceImmediate />
                                    </main>
                                    <Footer />
                                </div>
                            </AuthComponent>
                        }
                    />

                    {/* Appointments */}
                    <Route
                        path="/my-appointments"
                        element={
                            <AuthComponent>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow">
                                        <MyAppointments />
                                    </main>
                                    <Footer />
                                </div>
                            </AuthComponent>
                        }
                    />

                    <Route
                        path="/appointments/book"
                        element={
                            <AuthComponent>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow">
                                        <BookAppointment />
                                    </main>
                                    <Footer />
                                </div>
                            </AuthComponent>
                        }
                    />

                    <Route
                        path="/appointments/book/:artisanId"
                        element={
                            <AuthComponent>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow">
                                        <BookAppointment />
                                    </main>
                                    <Footer />
                                </div>
                            </AuthComponent>
                        }
                    />

                    {/* Profile */}
                    <Route
                        path="/profile"
                        element={
                            <AuthComponent>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow">
                                        <ClientProfile />
                                    </main>
                                    <Footer />
                                </div>
                            </AuthComponent>
                        }
                    />

                    <Route
                        path="/profile/edit"
                        element={
                            <AuthComponent>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow">
                                        <EditProfile />
                                    </main>
                                    <Footer />
                                </div>
                            </AuthComponent>
                        }
                    />

                    {/* Reviews */}
                    <Route
                        path="/reviews/write/:artisanId"
                        element={
                            <AuthComponent>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow">
                                        <WriteReview />
                                    </main>
                                    <Footer />
                                </div>
                            </AuthComponent>
                        }
                    />

                    <Route
                        path="/my-reviews"
                        element={
                            <AuthComponent>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow">
                                        <MyReviews />
                                    </main>
                                    <Footer />
                                </div>
                            </AuthComponent>
                        }
                    />

                    {/* Notifications */}
                    <Route
                        path="/notifications"
                        element={
                            <AuthComponent>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow">
                                        <NotificationsList />
                                    </main>
                                    <Footer />
                                </div>
                            </AuthComponent>
                        }
                    />


                    <Route path="/admin/login" element={<AdminLogin />} />

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
        </AuthProvider>
    );
}

export default App;