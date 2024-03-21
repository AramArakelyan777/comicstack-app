import React from "react"
import login from "../../../assets/images/authorization/Login.png"
import "./Login.css"

const Login = () => {
    return (
        <div>
            <img className="loginImage" src={login} alt="login" />
        </div>
    )
}

export default Login
