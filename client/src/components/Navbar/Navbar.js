import { NavLink } from "react-router-dom"
import "./Navbar.css"
import MenuIcon from "./MenuIcon"
import "../../assets/texts.css"

const Navbar = () => {
    return (
        <div className="navbar-container">
            <nav className="navbar">
                <NavLink to="/genres">
                    <div className="navbarLink">
                        <MenuIcon name="genres" />
                        <span className="menu-text">GENRES</span>
                    </div>
                </NavLink>

                <NavLink to="/faq">
                    <div className="navbarLink">
                        <MenuIcon name="faq" />
                        <span className="menu-text">FAQ</span>
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
                        <span className="menu-text">FORUM</span>
                    </div>
                </NavLink>

                <NavLink to="/login">
                    <div className="navbarLink">
                        <MenuIcon name="user" />
                        <span className="menu-text">USER</span>
                    </div>
                </NavLink>
            </nav>
        </div>
    )
}

export default Navbar
