import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserDashboard from './screens/User/UserDashboard';
import AdminDashboard from './screens/Admin/AdminDashboard';
import Coupons from './screens/User/Coupons';
import MealChart from './screens/User/MealChart';
import Complains from './screens/User/Complains';
import Contacts from './screens/User/Contacts';
import PopupBox from './components/PopupBox';
import Home from './screens/Home';
import Reviews from './screens/Reviews';
import Profile from './screens/User/Profile';

function App() {

  return (
    <Routes>
      {/* <Route exact path="/dashboard" Component={Dashboard} ></Route> */}
      <Route exact path="/" Component={Home} ></Route>
      <Route exact path="/coupons" Component={Coupons} ></Route>
      <Route exact path="/mealchart" Component={MealChart} ></Route>
      <Route exact path="/complains" Component={Complains} ></Route>
      <Route exact path="/contacts" Component={Contacts} ></Route>
      <Route exact path="/popup" Component={PopupBox} ></Route>
      <Route exact path="/user-dashboard" Component={UserDashboard} ></Route>
      <Route exact path="/admin-dashboard" Component={AdminDashboard} ></Route>
      <Route exact path="/reviews" Component={Reviews} ></Route>
      <Route exact path="/profile" Component={Profile} ></Route>

    </Routes>
      
    

  )
}

export default App
