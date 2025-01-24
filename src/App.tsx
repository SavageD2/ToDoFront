import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
// import Home from './pages/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
// import Login from './pages/Auth/Login';
// import Register from './pages/Auth/Register';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} /> */}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;