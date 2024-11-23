import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Inicio from './pages/inicio';
import Users from './pages/users';
function App() {
  return (
    <Router>
      <Header/>
      <div className="min-h-screen flex flex-col bg-gray-100">
  <Routes>
      <Route path="/" element={<Inicio />}/>
      <Route path="/users" element={<Users />}/>
  </Routes>
  </div>
    <Footer/>
    </Router>
  );
}

export default App;

