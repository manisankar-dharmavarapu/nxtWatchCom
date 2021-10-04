import React from "react"
import { AiFillHome } from "react-icons/ai"
import { HiFire } from "react-icons/hi"
import { SiYoutubegaming } from "react-icons/si"
import { MdPlaylistAdd } from "react-icons/md"
import { Link } from "react-router-dom"
import "./index.css"
import ThemeContext from "../../context/ThemeContext"

const menuList = [
  {
    link: "/",
    title: "Home",
    icon: <AiFillHome />,
  },
  {
    link: "/trending",
    title: "Trending",
    icon: <HiFire />,
  },
  {
    link: "/gaming",
    title: "Gaming",
    icon: <SiYoutubegaming />,
  },
  {
    link: "/savedvideos",
    title: "Saved Videos",
    icon: <MdPlaylistAdd />,
  },
]

function SideMenu() {
  return (
    <ThemeContext.Consumer>
      {(value) => {
        const { isDarkTheme } = value
        const renderMenuItem = (item) => {
          const { link, title, icon } = item
          const isActive = window.location.pathname === link
          const activeMenuItem = isActive
            ? isDarkTheme
              ? "lg-menu-item dark-active-list-item"
              : "lg-menu-item active-list-item"
            : "lg-menu-item"
          const activeIcon = isActive
            ? "menu-logo active-icon-color"
            : "menu-logo"
          return (
            <Link to={link} className="link-styles">
              <li className={activeMenuItem}>
                <span className={activeIcon}>{icon}</span>
                {title}
              </li>
            </Link>
          )
        }
        const containerTheme = isDarkTheme
          ? "dark-theme-container lg-menu-container"
          : "light-theme-container lg-menu-container"
          
        return (
          <div className={containerTheme}>
            <ul className="lg-menu-list">
              {menuList.map((item) => renderMenuItem(item))}
            </ul>
            <div className="contact-us-container">
              <h3>CONTACT US</h3>
              <div className="contact-container">
                <img
                  className="contact-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <img
                  className="contact-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
                <img
                  className="contact-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </div>
              <p>Enjoy! Now to see your channels and recomendations!</p>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default SideMenu
