import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Inicio from './pages/inicio';
import Users from './pages/users';
import UserDetail from './pages/userDetail';
function App() {
  return (
    <Router>
      <Header/>
      <div className="min-h-screen flex flex-col bg-gray-100">
  <Routes>
      <Route path="/" element={<Inicio />}/>
      <Route path="/users" element={<Users />}/>
      <Route path="/user/:id" element={<UserDetail />}/>
  </Routes>
  </div>
    <Footer/>
    </Router>
  );
}

export default App;

