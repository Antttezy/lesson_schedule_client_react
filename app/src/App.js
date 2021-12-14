import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';
import './App.css';
import About from './pages/About';
import Groups from './pages/Groups';
import Lessons from './pages/Lessons';
import Login from './pages/Login';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Schedule from './pages/Schedule';
import Students from './pages/Students';
import Workloads from './pages/Workloads';
import { Login as login } from './redux/authentication/actions'

function App() {
  const dispatch = useDispatch()

  const isLogged = localStorage.getItem("isLogged")
  console.log(isLogged)

  if (isLogged) {
    const refreshToken = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    dispatch(login({
      accessToken: null,
      refreshToken,
      role
    }))
  }

  return (
    <div className="App">
      <Routes>
        <Route index element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/lessons' element={<Lessons />} />
        <Route path='/students' element={<Students />} />
        <Route path='/groups/*' element={<Groups />} />
        <Route path='/schedule/*' element={<Schedule />} />
        <Route path='/workloads/*' element={<Workloads />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
