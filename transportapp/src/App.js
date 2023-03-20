import './App.css';
import { BrowserRouter, Route, Routes, redirect, Switch } from 'react-router-dom'
// import any components you want to use in this file:
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About'; 
import Login from './components/Login';


// // use state instead of variables
// let isUserLoggedIn = true;
// let currentPath = isUserLoggedIn ? <Home /> : <Login />



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="about" element={<About />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
