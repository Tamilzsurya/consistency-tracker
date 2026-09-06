import {Route, Switch} from 'react-router-dom'


import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import GridPage from './pages/GridPage'
import TrendPage from './pages/TrendPage'
import ProfilePage from './pages/ProfilePage'
import VerifyOtpPage from './pages/VerifyOtpPage'

import HomeProtectedRoute from './ProtectedRoute/HomeProtectedRoute'
import LoginProtectedRoute from './ProtectedRoute/LoginProtectedRoute'


import './App.css'


const App = () => (
  
  <Switch>
    
    
    <LoginProtectedRoute  exact path="/login" component={LoginPage} />
    <LoginProtectedRoute  exact path="/register" component={RegisterPage} />
    <LoginProtectedRoute  exact path="/verify-otp" component={VerifyOtpPage} />

    <HomeProtectedRoute exact path="/" component={HomePage} />
    <HomeProtectedRoute exact path="/grid" component={GridPage} />
    <HomeProtectedRoute exact path="/trends" component={TrendPage} />
    <HomeProtectedRoute exact path="/profile" component={ProfilePage} />
    
  </Switch>
)


export default App
