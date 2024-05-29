import React, { useContext, useEffect, useState } from "react"
import { AuthorizationContext } from "../../../index"
import Button from "../../Button/Button"
import Input from "../../Input/Input"
import { useNavigate, NavLink } from "react-router-dom"
import {
    getAUser,
    changeUsername,
    changePassword,
    uploadAvatar,
    deleteAvatar,
} from "../../../services/user-service"
import { useAsyncFn } from "../../../hooks/useAsync"
import unknownAvatar from "../../../assets/forumIcons/Avatar.png"
import { useTranslation } from "react-i18next"

function User() {
    const { t } = useTranslation()
    const { store } = useContext(AuthorizationContext)
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState(null)
    const [newUsername, setNewUsername] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [avatarFile, setAvatarFile] = useState(null)

    const {
        loading: userLoading,
        error: userError,
        execute: getAUserFn,
    } = useAsyncFn(getAUser)

    const {
        loading: changeUsernameLoading,
        error: changeUsernameError,
        execute: changeUsernameFn,
    } = useAsyncFn(changeUsername)

    const {
        loading: changePasswordLoading,
        error: changePasswordError,
        execute: changePasswordFn,
    } = useAsyncFn(changePassword)

    const {
        loading: uploadAvatarLoading,
        error: uploadAvatarError,
        execute: uploadAvatarFn,
    } = useAsyncFn(uploadAvatar)

    const {
        loading: deleteAvatarLoading,
        error: deleteAvatarError,
        execute: deleteAvatarFn,
    } = useAsyncFn(deleteAvatar)

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

    const handleChangeUsername = async () => {
        try {
            await changeUsernameFn(newUsername)
            setNewUsername("")
            const data = await getAUserFn()
            setUserDetails(data)
        } catch (error) {
            console.error("Error changing username", error)
        }
    }

    const handleChangePassword = async () => {
        try {
            await changePasswordFn(currentPassword, newPassword)
            setCurrentPassword("")
            setNewPassword("")
        } catch (error) {
            console.error("Error changing password", error)
        }
    }

    const handleUploadAvatar = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("profilePicture", avatarFile)
        try {
            await uploadAvatarFn(formData)
            setAvatarFile(null)
            const data = await getAUserFn()
            setUserDetails(data)
        } catch (error) {
            console.error("Error uploading avatar", error)
        }
    }

    const handleDeleteAvatar = async () => {
        try {
            await deleteAvatarFn()
            const data = await getAUserFn()
            setUserDetails(data)
        } catch (error) {
            console.error("Error deleting avatar", error)
        }
    }

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

                    <div className="user-page-change-profile-settings">
                        <h1 className="bigger-heading">
                            {t("userPageChangeSettings")}
                        </h1>

                        {changeUsernameLoading ? (
                            "Loading..."
                        ) : (
                            <div>
                                <h2 className="medium-heading">
                                    {t("userPageChangeUsername")}
                                </h2>
                                <Input
                                    variant="regular"
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) =>
                                        setNewUsername(e.target.value)
                                    }
                                    placeholder={t("userPageNewUsername")}
                                />
                                <br />
                                <Button
                                    variant="ordinary"
                                    onClick={handleChangeUsername}
                                >
                                    {t("userPageChangeSettingButton")}
                                </Button>
                            </div>
                        )}
                        {changeUsernameError ? (
                            <div>{changeUsernameError}</div>
                        ) : null}

                        {changePasswordLoading ? (
                            "Loading..."
                        ) : (
                            <div>
                                <h2 className="medium-heading">
                                    {t("userPageChangePassword")}
                                </h2>
                                <Input
                                    variant="regular"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) =>
                                        setCurrentPassword(e.target.value)
                                    }
                                    placeholder={t("userPageCurrentPassword")}
                                />
                                <br />
                                <Input
                                    variant="regular"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    placeholder={t("userPageNewPassword")}
                                />
                                <br />
                                <Button
                                    variant="ordinary"
                                    onClick={handleChangePassword}
                                >
                                    {t("userPageChangeSettingButton")}
                                </Button>
                            </div>
                        )}
                        {changePasswordError ? (
                            <div>{changePasswordError}</div>
                        ) : null}

                        {uploadAvatarLoading ? (
                            "Loading..."
                        ) : (
                            <div>
                                <h2 className="medium-heading">
                                    {t("userPageChangeAvatar")}
                                </h2>
                                <form onSubmit={handleUploadAvatar}>
                                    <Input
                                        variant="regular"
                                        type="file"
                                        onChange={(e) =>
                                            setAvatarFile(e.target.files[0])
                                        }
                                        accept="image/*"
                                    />
                                    <br />
                                    <Button variant="ordinary" type="submit">
                                        {t("userPageChangeSettingButton")}
                                    </Button>
                                </form>
                            </div>
                        )}
                        {uploadAvatarError ? (
                            <div>{uploadAvatarError}</div>
                        ) : null}

                        {deleteAvatarLoading ? (
                            "Loading..."
                        ) : userDetails?.avatar_url ? (
                            <div>
                                <h2 className="medium-heading">
                                    {t("userPageDeleteAvatar")}
                                </h2>
                                <Button
                                    variant="ordinary"
                                    onClick={handleDeleteAvatar}
                                >
                                    {t("userPageDeleteAvatarButton")}
                                </Button>
                            </div>
                        ) : null}
                        {deleteAvatarError ? (
                            <div className="error">{deleteAvatarError}</div>
                        ) : null}
                    </div>
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
