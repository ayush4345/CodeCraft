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
import ProblemPage from './pages/problems/[pid]';
import SignUp from './pages/auth/SignUp';
import Chat from './pages/chat/chat';
import Reset from './pages/auth/Reset';
import Profile from './pages/profile/Profile';
import { RecoilRoot } from 'recoil';
import Select from './Contests/contestselection';
import ContestProblemPage from './pages/contestproblems/[pid]';
import ContestForm from './Contests/Contestdetails'
import { ToastContainer } from 'react-toastify';
import Apply from './components/three/grid';
import ChallengesPage from './Contests/challengelist'
import 'react-toastify/dist/ReactToastify.css';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/contests/:contestId",
    element: <Select/>
  },
  {
    path: "/contestproblems/:pid",
    element: <ContestProblemPage />,
  },
  {
    path: "/contests/challenges",
    element: <ChallengesPage />,
  },
  {
    path: "/contests",
    element: <ContestForm/>,
  },
  {
    path: "/learn",
    element: <Apply />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/problems/:pid",
    element: <ProblemPage />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    <ToastContainer/>
  </RecoilRoot>
);

reportWebVitals();
