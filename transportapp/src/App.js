import './App.css';
import { BrowserRouter, Route, Routes, redirect, Switch } from 'react-router-dom'
// import any components you want to use in this file:
import Login from './components/Login';
import JobViewer from './components/Jobs/JobViewer';
import TruckViewer from './components/Truck/TruckViewer';
import ManageUsers from './components/Employees/ManageUsers';
import AccountSettings from './components/User/AccountSettings';


// // use state instead of variables
// let isUserLoggedIn = true;
// let currentPath = isUserLoggedIn ? <Home /> : <Login />



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<JobViewer />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="TruckViewer" element={<TruckViewer />}></Route>
                <Route path="ManageUsers" element={<ManageUsers />}></Route>
                <Route path="AccountSettings" element={<AccountSettings />}></Route>
                <Route path="JobViewer" element={<JobViewer />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
