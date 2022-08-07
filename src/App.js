import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Profile from './pages/Profie';
import SignIn from './pages/SignIn';
import SignUp from './pages/SingUp';
import Category from './pages/Category';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import Navbar from './components/Navbar';
import {ToastContainer} from 'react-toastify';
function App() {
  return (
    <>
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={<Explore/>}/>
          <Route path="/offers" element={<Offers/>}/>
          <Route path="/category/:categoryName" element={<Category/>}/>
          <Route path="/profile" element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>


        </Routes>

        <Navbar/>
      </Router>
     
    </>
  );
}

export default App;
