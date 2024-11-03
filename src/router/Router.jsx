import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Profile from "../pages/profile/Profile";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import AddNewTodo from "../pages/addTodo/AddNewTodo";
import EmailVerification from "../pages/EmailVerification/Email"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/EmailVerification" element={< EmailVerification/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/add-new-todo" element={<AddNewTodo />} />
        <Route path="" element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
