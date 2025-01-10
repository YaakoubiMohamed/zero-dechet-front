import './App.css';
import LoginForm from './LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        
      </Routes>
    </Router>
  );
}

export default App;
