import {Component} from 'react'

// components
import LoginNavbar from '../../components/LoginNavbar'
import InputField from '../../components/InputField'
import BrandCommonFooter from '../../components/BrandCommonFooter'

// images
import previewHabitGrid from '../../assets/images/preview-Habit-Grid.jpg'

import './index.css'

const inputFieldsData = [
  { id: "fullName", label: "Full Name", type: "text", placeholder: "John Doe" },
  { id: "email", label: "Email", type: "email", placeholder: "hello@example.com" },
  { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
  { id: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "••••••••" }
];


class RegisterPage extends Component {


  render() {
    return (
      <div className="register-page-container">
        {/* Navbar Section */}
        <LoginNavbar />

        {/* Main Section */}
        <main className="register-page-main">
          <section className="register-page-hero">
            <div className="register-page-hero-text">
              <h1 className="register-page-hero-title">Your consistency journey starts here.</h1>
              <p className="register-page-hero-description">Join our community and start your journey towards a more consistent lifestyle.</p>
            </div>
            <img className="register-page-hero-image" src={previewHabitGrid} alt="Preview of Habit Grid" />
          </section>

          <form className="register-page-form">
            
            {
              inputFieldsData.map(eachField => (
                <InputField
                  key={eachField.id}
                  eachFieldData={eachField}
                />
              ))
            }

            <button className="register-page-form-button" type="submit">Create My Grid</button>

            <p className="register-page-form-description">Your journey starts in less than 30 seconds.</p>
            
          </form>
        </main>

        {/* Footer Section */}
        <BrandCommonFooter />

      </div>
    )
  }
}

export default RegisterPage