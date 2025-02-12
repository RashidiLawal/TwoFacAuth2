import React from 'react';
import { 
  createBrowserRouter, 
  RouterProvider,
  createRoutesFromElements,
  Route, 
} from 'react-router-dom';
import RootLayout from "./components/common/RootLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Loading from "./components/common/loading";
import TwoFactorSetup from "./utils/TwoFaSetup";
import TwoFactorVerify from "./utils/TwoFaVerify";
import { AuthProvider } from "./context/auth-context";
import "../src/styles/FormStyles.scss";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

console.log({
  RootLayout,
  ProtectedRoute,
  Loading,
  Login,
  Dashboard,
  TwoFactorSetup,
  TwoFactorVerify
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route 
        index
        element={
          <React.Suspense fallback={<Loading />}> 
            <Login />
          </React.Suspense>
        } 
      />
       <Route element={<ProtectedRoute />}>
      <Route 
        path="/dashboard" 
        element={
          <React.Suspense fallback={<Loading />}>
           <Dashboard />
          </React.Suspense>
        } 
      />
      <Route 
        path="/2fa/setup" 
        element={
          <React.Suspense fallback={<Loading />}>
            <TwoFactorSetup />
          </React.Suspense>
        } 
      />
      <Route 
        path="/2fa/verify" 
        element={
          <React.Suspense fallback={<Loading />}>
            <TwoFactorVerify />
          </React.Suspense>
        } 
      />
      </Route>
    </Route>
  )
);
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
};

export default App;
