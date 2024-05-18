import React, { useContext, useEffect } from "react"
import { AuthorizationContext } from "../../../index"

function User() {
    const { store } = useContext(AuthorizationContext)
    useEffect(() => {
        if (localStorage.getItem("token")) store.chechAuth()
    }, [store])

    return (
        <div>
            {store.isAuth ? (
                <p>{`User ${store.user.email} is authorized`}</p>
            ) : (
                <p>Please authorize</p>
            )}

            {store.isAuth && !store.user.isActivated ? (
                <p>Click on activation link in email</p>
            ) : null}

            {store.isAuth ? (
                <button onClick={() => store.logout()}>Log out</button>
            ) : null}
        </div>
    )
}

export default User
