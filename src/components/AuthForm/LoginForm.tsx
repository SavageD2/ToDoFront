import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./AuthForm.css";

const LoginForm: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setError("Format d'email invalide.");
            return;
        }
        setIsSubmitting(true);
        try {
            await login(email, password);
            setError(null);
            navigate("/dashboard");
        } catch {
            setError("Echec de la connexion. Verifiez vos informations.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Mot de passe:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <br />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Connexion..." : "Se connecter"}
            </button>
        </form>
    );
};

export default LoginForm;
