import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navbar: React.FC = () => {
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
            <ul className="navbar-links">
                {!token ? (
                    <>
                        <li>
                            <Link to="/login">Connexion</Link>
                        </li>
                        <li>
                            <Link to="/register">Inscription</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/dashboard">Tableau de bord</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Déconnexion</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
