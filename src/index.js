import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import DetailsPage from "./pages/DetailsPage";
import CartPage from "./pages/CartPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import AdminPage from "./pages/AdminPage";
import { AuthContextProvider } from "./context/AuthContext";
import { CartContextProvider } from "./context/CartContext";
import { CurrentUserProvider } from "./context/CurrentUserContext";
import ProtectedCart from "./routes/ProtectedCart";
import ProtectedAuth from "./routes/ProtectedAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "cart",
        element: (
          <ProtectedCart>
            <CartPage />
          </ProtectedCart>
        )
      },
      {
        path: "api/products",
        element: <ProductsPage />
      },
      {
        path: "api/products/:id",
        element: <DetailsPage />
      }
    ]
  },
  {
    path: "auth/signup",
    element: (
      <ProtectedAuth>
        <SignUpPage />
      </ProtectedAuth>
    )
  },
  {
    path: "auth/signin",
    element: (
      <ProtectedAuth>
        <SignInPage />
      </ProtectedAuth>
    )
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <CurrentUserProvider>
          <RouterProvider router={router} />
        </CurrentUserProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
