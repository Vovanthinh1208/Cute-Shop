import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navbar, Sidebar, Footer, ScrollToTop } from "./components";

import {
  Home,
  Error,
  Shipping,
  SingleProduct,
  Checkout,
  Products,
  Cart,
  SuccessfulPayment,
} from "./pages";
import ProductsReview from "./pages/ProductsReview";
import OrderPage from "./pages/OrderPage";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/sign_up" component={SignUp} />
          <Route path="/sign_in" component={SignIn} />
          <Route exact path="/forgot_password">
            <ForgotPassword />
          </Route>

          {/* Protected Routes */}
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shipping" component={Shipping} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products_review"
            component={ProductsReview}
          />
          <ProtectedRoute exact path="/order" component={OrderPage} />
          <ProtectedRoute
            exact
            path="/products/:slug"
            component={SingleProduct}
          />
          <ProtectedRoute exact path="/checkout" component={Checkout} />
          <ProtectedRoute
            exact
            path="/successful_payment"
            component={SuccessfulPayment}
          />

          {/* Catch all route */}
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;

const Layout: React.FC = ({ children }) => {
  const location = useLocation();

  const shouldHideNavbar =
    location.pathname === "/sign_in" || location.pathname === "/sign_up";

  return (
    <>
      <ScrollToTop />
      {!shouldHideNavbar && <Navbar />}
      <Sidebar />
      {children}
      <Footer />
    </>
  );
};
