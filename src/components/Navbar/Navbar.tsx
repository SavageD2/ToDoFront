import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">To-Do App</Link>
            </div>
            <button
                className="menu-button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
            >
                ☰
            </button>
            <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
                {!token ? (
                    <>
                        <li>
                            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
                        </li>
                        <li>
                            <Link to="/register" onClick={() => setIsMenuOpen(false)}>Inscription</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <button onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                                Déconnexion
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
