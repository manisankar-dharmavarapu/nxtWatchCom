import React, { Component } from "react"
import Cookies from "js-cookie"
import ThemeContext from "../../context/ThemeContext"
import "./index.css"

const lightLogo =
  "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
const darkLogo =
  "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
  
class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    showPassword: false,
    showSubmitError: false,
    errorMsg: "",
  }

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props

    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    })
    history.replace("/")
  }

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg })
  }

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value })
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  onShowPassword=()=>{
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }))
  }
  
  onSubmitUser = async (e) => {
    e.preventDefault()
    const { username, password } = this.state
    const userDetails = { username, password }
    const url = "https://apis.ccbp.in/login"
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserNameField = () => {
    const { username } = this.state
    return (
      <div className="input-item">
        <label className="label-styles" htmlFor="username">
          USERNAME
        </label>
        <br />
        <input
          id="username"
          type="text"
          placeholder="username"
          className="input-styles"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const { password,showPassword } = this.state
    return (
      <div className="input-item">
        <label className="label-styles" htmlFor="userpassword">
          PASSWORD
        </label>
        <br/>
        <input
          id="userpassword"
          type={showPassword ? "text" : "password"}
          placeholder="password"
          className="input-styles"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  renderShowPassword = () => {
    const { showPassword } = this.state
    return (
      <div style={{ marginTop: 13 }}>
        <input
          type="checkbox"
          id="showpassword"
          value={showPassword}
          onChange={this.onShowPassword}
        />
        <label htmlFor="showpassword">Show Password</label>
      </div>
    )
  }

  render() {
    const {showPassword,password,showSubmitError,username, errorMsg} = this.state
   return (
     <ThemeContext.Consumer>
       {(value) => {
         const {isDarkTheme}=value
         const formContainer = isDarkTheme
           ? "dark-former-container form-container"
           : "form-container"
          const siteLogo=isDarkTheme ? darkLogo : lightLogo 
          const loginContainer = isDarkTheme
            ? "dark-login-container login-container"
            : "login-container"
            const inputStyles = isDarkTheme
              ? "dark-input-styles input-styles"
              : "input-styles"
         return (
           <div className={loginContainer}>
             <div className={formContainer}>
               <div>
                 <img
                   className="logo-image"
                   src={siteLogo}
                   alt="website logo"
                 />{" "}
               </div>
               <form className="form-styles" onSubmit={this.onSubmitUser}>
                 <div className="input-item">
                   <label className="label-styles" htmlFor="username">
                     USERNAME
                   </label>
                   <br />
                   <input
                     id="username"
                     type="text"
                     placeholder="username"
                     className={inputStyles}
                     value={username}
                     onChange={this.onChangeUsername}
                   />
                 </div>
                 <div className="input-item">
                   <label className="label-styles" htmlFor="userpassword">
                     PASSWORD
                   </label>
                   <br />
                   <input
                     id="userpassword"
                     type={showPassword ? "text" : "password"}
                     placeholder="password"
                     className={inputStyles}
                     value={password}
                     onChange={this.onChangePassword}
                   />
                 </div>{" "}
                 {this.renderShowPassword()}
                 <button type="submit" className="login-btn">
                   Login
                 </button>
                 {showSubmitError && (
                   <p className="error-message">*{errorMsg}</p>
                 )}
               </form>
             </div>
           </div>
         )
       }}
     </ThemeContext.Consumer>
   )
  }
}
export default LoginForm
