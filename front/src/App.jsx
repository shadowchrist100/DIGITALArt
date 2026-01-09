import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Home from './components/Home'


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/*  Routes  authentification  */}
                    <Route path = "/login" element = { <Login /> } />
                    <Route path = "/register" element = { <Register />} />

                    {/* Routes public */}
                    <Route path = "/" element = { <Home /> } />
                    <Route>

                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;