import React, { useContext, useEffect, useState } from "react"
import { AuthorizationContext } from "../../../index"
import Button from "../../Button/Button"
import { useNavigate, NavLink } from "react-router-dom"
import { getAUser } from "../../../services/user-service"
import { useAsyncFn } from "../../../hooks/useAsync"
import unknownAvatar from "../../../assets/forumIcons/Avatar.png"
import { useTranslation } from "react-i18next"

function User() {
    const { t } = useTranslation()

    const { store } = useContext(AuthorizationContext)
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState(null)

    const {
        loading: userLoading,
        error: userError,
        execute: getAUserFn,
    } = useAsyncFn(getAUser)

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const data = await getAUserFn()
                setUserDetails(data)
            } catch (error) {
                console.error("Error fetching user details", error)
            }
        }

        if (store.isAuth) {
            fetchUserDetails()
        }
    }, [store.isAuth, getAUserFn])

    if (!store.isAuth || store.isLoading) {
        return <p>Please authorize</p>
    }

    if (userLoading) return <div>Loading...</div>

    const groupedComics = userDetails?.statuses?.reduce((acc, status) => {
        const { status: comicStatus, ...comicDetails } = status
        if (!acc[comicStatus]) {
            acc[comicStatus] = []
        }
        acc[comicStatus].push(comicDetails)
        return acc
    }, {})

    const localisedStatus = (status) => {
        switch (status) {
            case "in plans":
                return t("comicsStatusInPlans")
            case "reading":
                return t("comicsStatusReading")
            case "read":
                return t("comicsStatusRead")
            case "favourite":
                return t("comicsStatusFavorite")
            default:
                return null
        }
    }

    return (
        <div className="user-page-container">
            {store.isAuth && userDetails ? (
                <React.Fragment>
                    <h1
                        style={{ wordWrap: "break-word" }}
                        className="bigger-heading"
                    >
                        {t("userPageGreeting", {
                            username: userDetails?.username,
                        })}
                    </h1>

                    <img
                        src={userDetails.avatar_url || unknownAvatar}
                        alt="avatar"
                        className="user-page-avatar"
                    />

                    <p>{userDetails.email}</p>

                    <p style={{ color: "#db4947" }}>
                        {userDetails.is_activated
                            ? ""
                            : "Please click on activation link in email"}
                    </p>

                    <p>
                        {t("userPageMemberSince")}:{" "}
                        {new Date(userDetails.created_at).toLocaleDateString()}
                    </p>

                    <h2 className="bigger-heading user-page-statuses-heading">
                        {t("userPageReadlist")}
                    </h2>
                    {Object.keys(groupedComics).length > 0 ? (
                        Object.entries(groupedComics).map(
                            ([status, comics]) => (
                                <div key={status}>
                                    <h3 className="medium-heading">
                                        {localisedStatus(status)}
                                    </h3>
                                    {comics.map((comic) => (
                                        <div
                                            className="user-page-status"
                                            key={comic?.comic_id}
                                        >
                                            <NavLink
                                                to={`/comics/${comic?.comic_id}`}
                                            >
                                                <img
                                                    src={comic?.cover_image_url}
                                                    alt={comic?.title}
                                                    className="comics-link-image"
                                                />
                                                <p>{comic?.title}</p>
                                            </NavLink>
                                        </div>
                                    ))}
                                </div>
                            )
                        )
                    ) : (
                        <div>{t("comicsFilterNoResults")}</div>
                    )}
                </React.Fragment>
            ) : (
                <div>{userError}</div>
            )}

            <Button
                variant="ordinary"
                onClick={() => {
                    store.logout()
                    navigate("/")
                }}
                style={{ marginTop: 30 }}
            >
                {t("logoutButton")}
            </Button>
        </div>
    )
}

export default User
