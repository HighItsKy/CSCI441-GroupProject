import './App.css';
import { Route, Switch } from 'react-router-dom'
// import any components you want to use in this file:
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About'; 
import Login from './components/Login';
// use Route, Router instead
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


// use state instead of variables
let isUserLoggedIn = true;
let currentPath = isUserLoggedIn ? <Home /> : <Login />

const router = createBrowserRouter([
  {
    path: "/",
    element: currentPath
  }
])



function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
