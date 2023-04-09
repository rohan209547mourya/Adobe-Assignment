import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import LoginForm from './components/authentication/LoginForm';
import SignupForm from './components/authentication/SignupForm';
import Logout from './components/Logout';
import Error from './components/Error';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Admin from './components/admin/Admin';


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Posts />
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
            {
                path: 'profile',
                element: <Profile />
            },
        ]
    },
    {
    path:'/admin/sdfsdf82n0n0283nlsd',
        element: <Admin />
    }

])


const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App