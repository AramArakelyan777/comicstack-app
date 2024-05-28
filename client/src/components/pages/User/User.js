import React, { useContext, useEffect, useState } from "react"
import { AuthorizationContext } from "../../../index"
import Button from "../../Button/Button"
import { useNavigate } from "react-router-dom"
import { getAUser } from "../../../services/user-service"

function User() {
    const { store } = useContext(AuthorizationContext)
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const data = await getAUser()
                setUserDetails(data)
            } catch (error) {
                console.error("Error fetching user details", error)
            }
        }

        if (store.isAuth) {
            fetchUserDetails()
        }
    }, [store.isAuth])

    if (!store.isAuth) {
        return <p>Please authorize</p>
    }

    return (
        <div className="user-page-container">
            {store.isAuth && userDetails && (
                <React.Fragment>
                    <h1 className="bigger-heading">{`Hello, ${userDetails.username}!`}</h1>

                    {userDetails.avatar_url && (
                        <img src={userDetails.avatar_url} alt="avatar" className="user-page-avatar" />
                    )}

                    <p>{userDetails.email}</p>

                    <p style={{ color: "#db4947" }}>
                        {userDetails.is_activated
                            ? ""
                            : "Please click on activation link in email"}
                    </p>

                    <p>
                        Member since:{" "}
                        {new Date(userDetails.created_at).toLocaleDateString()}
                    </p>

                    <h2 className="medium-heading user-page-statuses">Your comics statuses</h2>

                    {userDetails.statuses.map((status) => (
                        <div key={status.comic_id}>
                            {`Comic ID: ${status.comic_id}, Status: ${status.status}`}
                        </div>
                    ))}
                </React.Fragment>
            )}

            <Button
                variant="ordinary"
                onClick={() => {
                    store.logout()
                    navigate("/")
                }}
                style={{ marginTop: 30 }}
            >
                LOG OUT
            </Button>
        </div>
    )
}

export default User
