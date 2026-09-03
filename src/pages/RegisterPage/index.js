import {Component} from 'react'

// components
import LoginNavbar from '../../components/LoginNavbar'
import BrandCommonFooter from '../../components/BrandCommonFooter'
import RegisterForm from '../../components/RegisterForm'

// images
import previewHabitGrid from '../../assets/images/preview-Habit-Grid.jpg'

import './index.css'


class RegisterPage extends Component {
 

  render() {
    
    return (
      <div className="register-page-container">
        {/* Navbar */}
        <LoginNavbar />

        {/* Main*/}
        <main className="register-page-main">
                {/* Hero Section */}
                <section className="register-page-hero">
                  <div className="register-page-hero-text">
                    <h1 className="register-page-hero-title">Your consistency journey starts here.</h1>
                    <p className="register-page-hero-description">Join our community and start your journey towards a more consistent lifestyle.</p>
                  </div>
                  <img className="register-page-hero-image" src={previewHabitGrid} alt="Preview of Habit Grid" />
                </section>

                {/* Form Section */}
                <RegisterForm />
        </main>

        {/* Footer*/}
        <BrandCommonFooter />

      </div>
    )
  }
}

export default RegisterPage