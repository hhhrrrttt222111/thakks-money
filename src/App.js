import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Home, Profile, Login } from "./components";
import PrivateRoute from "./utils/PrivateRoute"
import ScrollToTop from "./utils/ScrollToTop"

import './App.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
            <Route path="login" element={<Login />} />
            <Route 
              path="profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
