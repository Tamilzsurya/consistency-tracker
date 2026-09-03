import {Route, Switch} from 'react-router-dom'

import LoginForm from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import GridPage from './pages/GridPage'
import TrendPage from './pages/TrendPage'
import ProfilePage from './pages/ProfilePage'
import VerifyOtpPage from './pages/VerifyOtpPage'


import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/register" component={RegisterPage} />
    <Route exact path="/grid" component={GridPage} />
    <Route exact path="/trends" component={TrendPage} />
    <Route exact path="/profile" component={ProfilePage} />
    <Route exact path="/verify-otp" component={VerifyOtpPage} />
  </Switch>
)

export default App
