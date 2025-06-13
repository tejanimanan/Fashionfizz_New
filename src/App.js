import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import ProfilePage from './Component/ProfilePage';

// Lazy-loaded components
const About = lazy(() => import('./Component/About'));
const Contact = lazy(() => import('./Component/Contact'));
const Home = lazy(() => import('./Component/Home'));
const Shop = lazy(() => import('./Component/Shop'));
// const Home = lazy(() => new Promise((resolve) => setTimeout(() => resolve(import("./Component/Home")), 2000)));
// const Shop = lazy(() => new Promise((resolve) => setTimeout(() => resolve(import("./Component/Shop")), 1000)));
const Register = lazy(() => import('./Component/Register'));
const Login = lazy(() => import('./Component/Login'));
const AllProduct = lazy(() => import('./Component/AllProduct'));
const WomenProduct = lazy(() => import('./WomenProduct'));
const MenProduct = lazy(() => import('./MenProduct'));
const BagProduct = lazy(() => import('./Component/BagProduct'));
const Cart = lazy(() => import('./Component/Cart'));
const SingleProduct = lazy(() => import('./Component/SingleProduct'));

const Loader = () => (
  <div
    className="loader-container"
  >
    <div className="bubbles">
      <span style={{ "--i": 1 }}></span>
      <span style={{ "--i": 2 }}></span>
      <span style={{ "--i": 3 }}></span>
      <span style={{ "--i": 4 }}></span>
      <span style={{ "--i": 5 }}></span>
      <span style={{ "--i": 6 }}></span>
      <span style={{ "--i": 7 }}></span>
      <span style={{ "--i": 8 }}></span>
      <span style={{ "--i": 9 }}></span>
      <span style={{ "--i": 10 }}></span>
    </div>
    <h2 className="loading-text text-white text-center ">
      Loading, please wait...
    </h2>
    <img src='images/Fashionfizz_logo.png' className='w-25 d-inline mt-5' alt='...'></img>
  </div>

);

// Component that will wrap the entire app with `BrowserRouter`
const AppWithRouter = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate(); // This hook tracks route changes

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }, [navigation]);

  return (
    <div className="App">
      {/* Show loader if loading state is true */}
      {loading && <Loader />}

      <div className='' style={{ display: (loading) ? "none" : "block" }}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />

            <Route path='/shop' element={<Shop />}>
              <Route index element={<AllProduct />} />
              <Route path='women' element={<WomenProduct />} />
              <Route path='men' element={<MenProduct />} />
              <Route path='Accessories' element={<BagProduct />} />
              
            </Route>

            <Route path='/about' element={<About />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/singleproduct/:id' element={<SingleProduct />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </Suspense>
      </div>
      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppWithRouter />
    </BrowserRouter>
  );
}

export default App;
