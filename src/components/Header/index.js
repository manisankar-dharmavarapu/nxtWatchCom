import * as React from "react"
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  Slide
} from "@mui/material"
import { withRouter, Link } from "react-router-dom"
import Cookies from "js-cookie"
import { AiFillHome } from "react-icons/ai"
import { HiFire } from "react-icons/hi"
import { SiYoutubegaming } from "react-icons/si"
import { MdPlaylistAdd } from "react-icons/md"
import { FaMoon } from "react-icons/fa"
import { GiHamburgerMenu } from "react-icons/gi"
import { FiSun } from "react-icons/fi"
import { AiOutlineClose } from "react-icons/ai"
import { RiLogoutBoxRFill } from "react-icons/ri"
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />
})

function Header(props) {
  const [open, setOpen] = React.useState(false)
  const [openMenu, setOpenMenu] = React.useState(false)

  const onOpenMenu = () => {
    setOpenMenu(true)
  }

  const onCloseMenu = () => {
    setOpenMenu(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onLogout = () => {
    setOpen(true)
  }

  const onConfirmLogout = () => {
    const { history } = props
    Cookies.remove("jwt_token")
    history.replace("/login")
  }
  
  const renderMobileMenu = () => {
    return (
      <ThemeContext.Consumer>
        {(value) => {
          const { isDarkTheme } = value
          const renderMenuItem = (item) => {
            const { link, title, icon } = item
            const isActive = window.location.pathname === link
            const activeMenuItem = isActive
              ? isDarkTheme
                ? "header-menu-item dark-active-list-item"
                : "header-menu-item active-list-item"
              : "header-menu-item"
            const activeIcon = isActive
              ? "menu-logo active-icon-color"
              : "menu-logo"
            return (
              <Link to={link} className="link-styles">
                <li className={activeMenuItem} onClick={onCloseMenu}>
                  <span className={activeIcon}>{icon}</span>
                  {title}
                </li>
              </Link>
            )
          }
          const menuContainer = isDarkTheme
            ? "dark-menu-container menu-container"
            : "menu-container"
          const closeBtn=isDarkTheme ?  "dark-menu-container" : '' 
          return (
            <Dialog
              fullScreen
              open={openMenu}
              onClose={onCloseMenu}
              style={{ color: "red" }}
              TransitionComponent={Transition}
            >
              <div className={closeBtn} style={{ display: "flex" }}>
                <IconButton
                  style={{color:isDarkTheme ? "#ffff" : '' ,marginLeft: "auto", paddingLeft: "15px" }}
                  onClick={onCloseMenu}
                >
                  <AiOutlineClose/>
                </IconButton>
              </div>
              <div className={menuContainer}>
                <ul className="lg-menu-list">
                  {menuList.map((item) => renderMenuItem(item))}
                </ul>
              </div>
            </Dialog>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
  return (
    <ThemeContext.Consumer>
      {(value) => {
        const { isDarkTheme, toggleTheme } = value
        const companyLogo = isDarkTheme
          ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
          : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        const btnStyle = isDarkTheme
          ? "logout-btn dark-btn"
          : "logout-btn light-btn"
        const logoutBtn = isDarkTheme ? "dark-icon logo-icon" : "logo-icon"
        const modalStyle = isDarkTheme
          ? "dark-modal-container"
          : "modal-container"
        return (
          <AppBar
            position="static"
            style={{
              backgroundColor: isDarkTheme ? "#212121" : "white",
              color: isDarkTheme ? "white" : "black",
              boxShadow: "none",
            }}
          >
            <Toolbar className="header-container">
              <Box>
                <img className="logo-img" src={companyLogo} alt="logo" />
              </Box>

              <Box className="header-profile-selection">
                <Box>
                  <IconButton onClick={toggleTheme}>
                    {isDarkTheme ? (
                      <FiSun style={{ color: "#ffffff" }} />
                    ) : (
                      <FaMoon style={{ color: "#0f0f0f" }} />
                    )}
                  </IconButton>
                </Box>
                <Box sx={{ display: { sm: "none" } }}>
                  <IconButton
                    size="large"
                    aria-haspopup="true"
                    onClick={onOpenMenu}
                    color="inherit"
                  >
                    {" "}
                    <GiHamburgerMenu />
                  </IconButton>
                  {renderMobileMenu()}
                </Box>
                <Box sx={{ display: { xs: "none", sm: "inline-block" } }}>
                  <img
                    className="profile-logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />
                </Box>
                <Box sx={{ display: { xs: "none", sm: "inline-block" } }}>
                  <button onClick={onLogout} className={btnStyle}>
                    Logout
                  </button>
                </Box>
                <Box sx={{ display: { sm: "none" } }}>
                  <IconButton onClick={onLogout}>
                    <RiLogoutBoxRFill
                      style={{ color: isDarkTheme ? "white" : "black" }}
                      className={logoutBtn}
                    />
                  </IconButton>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                  <div style={{ padding: "24px" }} className={modalStyle}>
                    <h3>Are you sure you want to logout?</h3>
                    <div className="model-btns">
                      <button
                        className="modal-cancel-btn"
                        onClick={handleClose}
                      >
                        Disagree
                      </button>
                      <button
                        className="modal-logout-btn"
                        onClick={onConfirmLogout}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </Dialog>
              </Box>
            </Toolbar>
          </AppBar>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default withRouter(Header)
