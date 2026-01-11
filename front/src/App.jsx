import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Clients/components/Layout/Header';
import Footer from './Clients/components/Layout/Footer';
import Home from './Clients/pages/Home';
import Login from './Clients/pages/Auth/Login';
import Register from './Clients/pages/Auth/Register';
import ForgotPassword from "./Clients/pages/Auth/ForgotPassword";

function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;