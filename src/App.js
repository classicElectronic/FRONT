import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Home from './pages/Home';
// import Login from './pages/auths/Login';
// import Register from './pages/auths/Register';
// import Header from './components/nav/Header';
// import SideDrawer from './components/drawer/SideDrawer';
// import RegisterComplete from './pages/auths/RegisterComplete';
// import ForgotPassword from './pages/auths/ForgotPassword';
// import History from './pages/user/History';
// import Password from './pages/user/Password';
// import Wishlist from './pages/user/Wishlist';
// import Product from './pages/Product';

// import AdminDashboard from './pages/admin/AdminDashboard';
// import CategoryCreate from './pages/admin/category/CategoryCreate';
// import CategoryUpdate from './pages/admin/category/CategoryUpdate';
// import SubCreate from './pages/admin/sub/SubCreate';
// import SubUpdate from './pages/admin/sub/SubUpdate';
// import ProductCreate from './pages/admin/product/ProductCreate';
// import AllProducts from './pages/admin/product/AllProducts';
// import ProductUpdate from './pages/admin/product/ProductUpdate';
// import CategoryHome from './pages/category/CategoryHome';
// import SubHome from './pages/sub/SubHome';
// import Shop from './pages/Shop';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import Payment from './pages/Payment';
// import CreateCouponPage from './pages/admin/coupon/CreateCoupon';


// import UserRoute from './components/routes/UserRoute';
// import AdminRoute from './components/routes/AdminRoute';


import { auth } from './Firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/auth';
import { LoadingOutlined } from '@ant-design/icons'


// using lazy
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import('./pages/auths/Register'));
const Header = lazy(() => import('./components/nav/Header'));
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'));

const NavDrawer = lazy(() => import('./components/drawer/NavDrawer'));

const BrandHome = lazy(() => import('./pages/brand/BrandHome'));

const RegisterComplete = lazy(() => import('./pages/auths/RegisterComplete'));
const ForgotPassword = lazy(() => import('./pages/auths/ForgotPassword'));
const History = lazy(() => import('./pages/user/History'));
const Password = lazy(() => import('./pages/user/Password'));
const Login = lazy(() => import('./pages/auths/Login'));
const Wishlist = lazy(() => import('./pages/user/Wishlist'));
const Product = lazy(() => import('./pages/Product'));

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CategoryCreate = lazy(() => import('./pages/admin/category/CategoryCreate'));

const HeroCreate = lazy(() => import('./pages/admin/hero/HeroCreate'));

const CategoryUpdate = lazy(() => import('./pages/admin/category/CategoryUpdate'));
const BrandCreate = lazy(() => import('./pages/admin/brand/BrandCreate'));
const BrandUpdate = lazy(() => import('./pages/admin/brand/BrandUpdate'));
const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'));
const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'));
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'));
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'));
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'));
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'));
const SubHome = lazy(() => import('./pages/sub/SubHome'));
const Shop = lazy(() => import('./pages/Shop'));

const Brand = lazy(() => import('./pages/Brand'));

const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Payment = lazy(() => import('./pages/Payment'));
const CreateCouponPage = lazy(() => import('./pages/admin/coupon/CreateCoupon'));

const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));


const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);

        currentUser(idTokenResult.token)
          .then(
            (res) => {
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: res.data.name,
                  email: res.data.email,
                  number: res.data.number,
                  token: idTokenResult.token,
                  role: res.data.role,
                  _id: res.data._id,
                },
              });
            }
          )
          .catch((err) => console.log(err));

      }
    });

    // cleanup
    return () => unsubscribe();
  }, [dispatch]);


  return (
    <Suspense fallback={
      <div className="col text-center p-5">
        Loading <LoadingOutlined />
      </div>
    }>
      <Router>
        <Header />
        <SideDrawer />
        <NavDrawer />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Home} />;
          <Route exact path="/login" component={Login} />;
          <Route exact path="/register" component={Register} />;
          <Route exact path="/register/complete" component={RegisterComplete} />
          <Route exact path="/forgot/password" component={ForgotPassword} />
          <UserRoute exact path="/user/history" component={History} />
          <UserRoute exact path="/user/password" component={Password} />
          <UserRoute exact path="/user/wishlist" component={Wishlist} />
          <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />

          <AdminRoute exact path="/admin/hero" component={HeroCreate} />

          <AdminRoute exact path="/admin/category" component={CategoryCreate} />
          <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
          <AdminRoute exact path="/admin/brand" component={BrandCreate} />
          <AdminRoute exact path="/admin/brand/:slug" component={BrandUpdate} />
          <AdminRoute exact path="/admin/sub" component={SubCreate} />
          <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
          <AdminRoute exact path="/admin/product" component={ProductCreate} />
          <AdminRoute exact path="/admin/products" component={AllProducts} />
          <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />

          <Route exact path="/product/:slug" component={Product} />;
          <Route exact path="/category/:slug" component={CategoryHome} />;
          <Route exact path="/brand/:slug" component={BrandHome} />;
          <Route exact path="/sub/:slug" component={SubHome} />;
          <Route exact path="/shop" component={Shop} />;
          <Route exact path="/brands" component={Brand} />;
          <Route exact path="/cart" component={Cart} />;
          <UserRoute exact path="/checkout" component={Checkout} />
          <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
          <UserRoute exact path="/payment" component={Payment} />;
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
