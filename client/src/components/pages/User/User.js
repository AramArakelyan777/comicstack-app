import React, { useContext, useEffect } from "react"
import { AuthorizationContext } from "../../../index"
import Button from "../../Button/Button"
import { useNavigate } from "react-router-dom"

function User() {
    const { store } = useContext(AuthorizationContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("bearer")) store.chechAuth()
    }, [store])

    return (
        <div>
            {store.isAuth ? (
                <p>{`Hello,  ${store.user.username}!`}</p>
            ) : (
                <p>Please authorize</p>
            )}

            {store.isAuth && !store.user.isActivated ? (
                <p>Please click on activation link in email</p>
            ) : null}

            {store.isAuth ? (
                <Button
                    variant="ordinary"
                    onClick={() => {
                        store.logout()
                        navigate("/")
                    }}
                >
                    LOG OUT
                </Button>
            ) : null}
        </div>
    )
}

export default User