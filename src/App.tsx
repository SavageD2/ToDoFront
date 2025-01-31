import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import PrivateRoute from './services/PrivateRoute';
import LoginForm from './components/AuthForm/LoginForm';
import RegisterForm from './components/AuthForm/RegisterForm';
import LandingPage from './components/Landing/LandingPage';
const App: React.FC = () => {


    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <div className="main-content">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />     
                </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;