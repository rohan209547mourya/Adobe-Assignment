import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import LoginForm from './components/authentication/LoginForm';
import SignupForm from './components/authentication/SignupForm';
import Logout from './components/Logout';


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <div>Posts</div>
            },
            {
                path: 'login',
                element: <LoginForm />
            },
            {
                path: 'signup',
                element: <SignupForm />
            },
            {
                path: 'logout',
                element: <Logout />
            },
        ]
    },

])


const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App