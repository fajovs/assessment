import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./ui/layout/RootLayout";
import Home from "./ui/pages/Home";
import Login from "./ui/pages/auth/Login";
import Register from "./ui/pages/auth/Register";


export const router = createBrowserRouter([
  { path:"/", element: <RootLayout />,
    children: [
      {index: true, element: <Home />},
      {path: "/", element: <Login />},
      {path: "/register"}

    ],
  },
  { path: "/login", element: <Login />},
  { path: "/register", element: <Register />},
])


