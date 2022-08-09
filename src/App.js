import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Profile from './pages/Profie';
import SignIn from './pages/SignIn';
import SignUp from './pages/SingUp';
import Category from './pages/Category';
import Contact from './pages/Contact';
import CreateListing from './pages/CreateListing';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import Navbar from './components/Navbar';
import Listing from './pages/Listing'
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
          <Route path='/contact/:landlordId' element={<Contact/>}/>
          <Route path="/profile" element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/create-listing" element={<CreateListing/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route
            path='/category/:categoryName/:listingId'
            element={<Listing />}
          />

        </Routes>

        <Navbar/>
      </Router>
     
    </>
  );
}

export default App;
