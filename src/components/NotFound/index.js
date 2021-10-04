import React from "react"
import ThemeContext from "../../context/ThemeContext"
import "./index.css"

function index() {
  return (
    <ThemeContext.Consumer>
      {(value) => {
        const { isDarkTheme } = value
        const notFoundImg = isDarkTheme
          ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
          : "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        const notFoundContainer = isDarkTheme
          ? "not-found-dark not-found-container"
          : "not-found-container"
          console.log(isDarkTheme,"darkk")
        return (
          <div className={notFoundContainer}>
            <img className="not-found-img" src={notFoundImg} alt="not-found" />
            <h2 className="not-found-title">Page Not Found</h2>
            <p>We are sorry,the page you requested could not be found.</p>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default index
