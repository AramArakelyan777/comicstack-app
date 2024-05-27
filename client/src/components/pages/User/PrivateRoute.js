import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthorizationContext } from "../../../index"

const PrivateRoute = ({ children }) => {
    const { store } = useContext(AuthorizationContext)

    if (!store.isAuth) {
        return <Navigate to="/login" />
    }

    return children
}

export default PrivateRoute
