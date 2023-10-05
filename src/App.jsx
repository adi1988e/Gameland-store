import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
  Route,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./features/productsSlice";
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  Login,
  PrivateRoute,
  Register,
  Orders,
} from "./pages";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { Footer, Sidebar, Loading, Navbar } from "./components";
import { store } from "./store";
import { authUser } from "./features/userSlice";
import { useCookies } from "react-cookie";

function CustomerLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  const [cookies] = useCookies(["token"]);
  const dispatch = useDispatch();
  const { product_loading: loading, product_error: error } = useSelector(
    (store) => store.products
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route
            path="/register"
            element={<Register />}
            errorElement={<Error />}
            action={registerAction(store)}
          />
          <Route
            path="/login"
            element={<Login />}
            errorElement={<Error />}
            action={loginAction(store)}
          />
          <Route
            path="checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path="orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Route>
      </Route>
    )
  );

  useEffect(() => {
    if (cookies.token) {
      dispatch(authUser(cookies.token));
    }
  }, [cookies, dispatch]);

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return <RouterProvider router={router} />;
}

export default App;
