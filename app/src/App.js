import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import About from './pages/About';
import Main from './pages/Main';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
