import "./Navbar.css"
import React from "react"
import catalogs from "../../assets/icons/Catalog.svg"
import faq from "../../assets/icons/FAQ.svg"
import home from "../../assets/icons/logo.png"
import forum from "../../assets/icons/Forum.svg"
import user from "../../assets/icons/User.svg"

const MenuIcon = ({ name }) => {
    switch (name) {
        case "genres":
            return <img src={catalogs} alt="menu-icon" />
        case "faq":
            return <img src={faq} alt="menu-icon" />
        case "home":
            return <img src={home} alt="menu-icon" />
        case "forum":
            return <img src={forum} alt="menu-icon" />
        case "user":
            return <img src={user} alt="menu-icon" />
        default:
            return null
    }
}

export default MenuIcon
