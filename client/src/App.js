import {Route, Switch} from 'react-router-dom'

//pages
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import GridPage from './pages/GridPage'
import TrendPage from './pages/TrendPage'
import ProfilePage from './pages/ProfilePage'
import VerifyOtpPage from './pages/VerifyOtpPage'
import NotFoundPage from './pages/NotFoundPage'

//protected routes
import HomeProtectedRoute from './protectedRoutes/HomeProtectedRoute'
import LoginProtectedRoute from './protectedRoutes/LoginProtectedRoute'

import ProtectedLayout from './layouts/ProtectedLayout'




import './App.css'


const App = () => (



    <Switch>
    
        <LoginProtectedRoute  exact path="/login" component={LoginPage} />
        <LoginProtectedRoute  exact path="/register" component={RegisterPage} />
        <LoginProtectedRoute  exact path="/verify-otp" component={VerifyOtpPage} />

        <HomeProtectedRoute exact path="/" component={ProtectedLayout} />
        <HomeProtectedRoute exact path="/grid" component={ProtectedLayout} />
        <HomeProtectedRoute exact path="/trends" component={ProtectedLayout} />
        <HomeProtectedRoute exact path="/profile" component={ProtectedLayout} />


        {/* <HomeProtectedRoute path="/" component={ProtectedLayout} /> */}

        <Route  component={NotFoundPage} />


    </Switch>
  
  
)


export default App
