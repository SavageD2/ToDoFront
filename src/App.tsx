import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import PrivateRoute from './services/PrivateRoute';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';

const App: React.FC = () => {


    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />     
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;