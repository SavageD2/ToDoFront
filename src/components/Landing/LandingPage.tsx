import { useState } from "react";
import LoginForm from "../AuthForm/LoginForm";
import RegisterForm from "../AuthForm/RegisterForm";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);

    const handleMouseEnter = (section: string) => setHoveredSection(section);
    const handleMouseLeave = () => setHoveredSection(null);

    return (
        <div className="landing-container">
            <div className="form-container">
                <div className="form-section">
                    <h1>Bienvenue sur TodoApp</h1>
                    <p>Organisez vos tâches et collaborez efficacement.</p>
                </div>
                <div className="form-wrapper">
                    <div
                        className={`form-box ${
                            hoveredSection === "login" ? "highlighted" : ""
                        }`}
                        onMouseEnter={() => handleMouseEnter("login")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <h2>Se connecter</h2>
                        <LoginForm />
                    </div>
                    <div
                        className={`form-box ${
                            hoveredSection === "register" ? "highlighted" : ""
                        }`}
                        onMouseEnter={() => handleMouseEnter("register")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <h2>S'inscrire</h2>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
