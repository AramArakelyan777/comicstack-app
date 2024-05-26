import { NavLink } from "react-router-dom"
import "./Navbar.css"
import MenuIcon from "./MenuIcon"
import "../../assets/texts.css"
import { useTranslation } from "react-i18next"

const Navbar = () => {
    const { t } = useTranslation()

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <NavLink to="/genres">
                    <div className="navbarLink">
                        <MenuIcon name="genres" />
                        <span className="menu-text">{t("menuGenres")}</span>
                    </div>
                </NavLink>

                <NavLink to="/faq">
                    <div className="navbarLink">
                        <MenuIcon name="faq" />
                        <span className="menu-text">{t("menuFAQ")}</span>
                    </div>
                </NavLink>

                <NavLink to="/">
                    <div className="homeNavLink">
                        <MenuIcon name="home" />
                    </div>
                </NavLink>

                <NavLink to="/threads">
                    <div className="navbarLink">
                        <MenuIcon name="forum" />
                        <span className="menu-text">{t("menuForum")}</span>
                    </div>
                </NavLink>

                <NavLink to="/login">
                    <div className="navbarLink">
                        <MenuIcon name="user" />
                        <span className="menu-text">{t("menuUser")}</span>
                    </div>
                </NavLink>
            </nav>
        </div>
    )
}

export default Navbar
