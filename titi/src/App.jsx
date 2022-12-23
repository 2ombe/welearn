import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import Navbar from "react-bootstrap/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import Badge from "react-bootstrap/Badge";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import SignIn from "./screens/SignIn";
import ShippingAddress from "./screens/ShippingAddress";
import SignUp from "./screens/SignUp";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreeen from "./screens/PlaceOrderScreeen";
import OrderScreen from "./screens/OrderScreen";
import Profile from "./screens/profile";
import Button from "react-bootstrap/Button";
import { getError } from "./Utils";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import SearcScreen from "./screens/SearcScreen";
import ProtectedRote from "./components/ProtectedRote";
import Dashbord from "./screens/Dashbord";
import AdminRoute from "./components/AdminRoute";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("shippingAddress");
    window.location.href = "/signin";
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`api/products/categories`);
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? "d-flex flex-column site-container active-cont "
            : "d-flex flex-column site-container"
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Button
                  variant="dark"
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                >
                  <i className="fas fa-bars"></i>
                </Button>
                <Navbar.Brand>COCO</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signOutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign in
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/product">
                        <NavDropdown.Item>product</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/order">
                        <NavDropdown.Item>order</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
              : "side-navbar d-flex justify-content-between flex-wrap flex-column"
          }
        >
          <Nav className="flex-column flex-white w-100 p-2 ">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main className="mt-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />

              {/* /*admin routes*/}
              <Route
                path="/admin/dashborad"
                element={
                  <AdminRoute>
                    <Dashbord />
                  </AdminRoute>
                }
              />

              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRote>
                    <Profile />
                  </ProtectedRote>
                }
              />
              <Route path="/search" element={<SearcScreen />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/placeorder" element={<PlaceOrderScreeen />} />
              <Route
                path="/order"
                element={
                  <ProtectedRote>
                    <OrderScreen />
                  </ProtectedRote>
                }
              />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/shipping" element={<ShippingAddress />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">all right reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
