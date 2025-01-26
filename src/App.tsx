import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {


    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />     
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;