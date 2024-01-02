import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./index.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App';
import AuthPage from './pages/auth/AuthPage';
import { RecoilRoot } from 'recoil';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </RecoilRoot>
);

reportWebVitals();
