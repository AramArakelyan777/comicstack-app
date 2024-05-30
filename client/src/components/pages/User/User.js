import React, { useContext, useEffect, useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
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
    deleteAccount,
} from "../../../services/user-service"
import { useAsyncFn } from "../../../hooks/useAsync"
import unknownAvatar from "../../../assets/forumIcons/Avatar.png"
import { useTranslation } from "react-i18next"
import ConfirmationModal from "./ConfirmationModal"
import Loading from "../../Loading/Loading"

function User() {
    const { t } = useTranslation()
    const { store } = useContext(AuthorizationContext)
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState(null)
    const [avatarFile, setAvatarFile] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

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

    const {
        loading: deleteAccountLoading,
        error: deleteAccountError,
        execute: deleteAccountFn,
    } = useAsyncFn(deleteAccount)

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

    const usernameValidationSchema = yup.object().shape({
        newUsername: yup
            .string()
            .required("Username is required")
            .min(3, "Username must be at least 3 characters")
            .max(50, "Username must be 50 characters or less"),
    })

    const passwordValidationSchema = yup.object().shape({
        currentPassword: yup.string().required("Current password is required"),
        newPassword: yup
            .string()
            .matches(
                /(?=.*[A-Z])/,
                "Password must contain at least one uppercase letter"
            )
            .matches(
                /(?=.{6,20}$)/,
                "Password must be between 6 and 20 characters"
            )
            .matches(
                /[ -/:-@[-`{-~]/,
                "Password must contain at least one special character"
            )
            .matches(/(?=.*[0-9])/, "Password must contain at least one digit")
            .required("New password is required"),
    })

    const usernameFormik = useFormik({
        initialValues: { newUsername: "" },
        validationSchema: usernameValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await changeUsernameFn(values.newUsername)
                resetForm()
                const data = await getAUserFn()
                setUserDetails(data)
            } catch (error) {
                console.error("Error changing username", error)
            }
        },
    })

    const passwordFormik = useFormik({
        initialValues: { currentPassword: "", newPassword: "" },
        validationSchema: passwordValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await changePasswordFn(
                    values.currentPassword,
                    values.newPassword
                )
                resetForm()
            } catch (error) {
                console.error("Error changing password", error)
            }
        },
    })

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

    const handleDeleteAccount = async () => {
        try {
            await deleteAccountFn()
            store.logout()
            navigate("/")
        } catch (error) {
            console.error("Error deleting account", error)
        }
    }

    if (!store.isAuth || store.isLoading) {
        return <p>Please authorize</p>
    }

    if (userLoading) return <Loading />

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
                            <Loading />
                        ) : (
                            <form onSubmit={usernameFormik.handleSubmit}>
                                <div>
                                    <h2 className="medium-heading">
                                        {t("userPageChangeUsername")}
                                    </h2>
                                    <Input
                                        variant="regular"
                                        type="text"
                                        name="newUsername"
                                        value={
                                            usernameFormik.values.newUsername
                                        }
                                        onChange={usernameFormik.handleChange}
                                        onBlur={usernameFormik.handleBlur}
                                        placeholder={t("userPageNewUsername")}
                                    />
                                    {usernameFormik.touched.newUsername &&
                                    usernameFormik.errors.newUsername ? (
                                        <div className="error small-text">
                                            {usernameFormik.errors.newUsername}
                                        </div>
                                    ) : null}
                                    <br />
                                    <Button
                                        variant="ordinary"
                                        type="submit"
                                        disabled={
                                            !usernameFormik.isValid ||
                                            !usernameFormik.dirty
                                        }
                                    >
                                        {t("userPageChangeSettingButton")}
                                    </Button>
                                </div>
                            </form>
                        )}
                        {changeUsernameError ? (
                            <div className="error small-text">
                                {changeUsernameError}
                            </div>
                        ) : null}

                        {changePasswordLoading ? (
                            <Loading />
                        ) : (
                            <form onSubmit={passwordFormik.handleSubmit}>
                                <div>
                                    <h2 className="medium-heading">
                                        {t("userPageChangePassword")}
                                    </h2>
                                    <Input
                                        variant="regular"
                                        type="password"
                                        name="currentPassword"
                                        value={
                                            passwordFormik.values
                                                .currentPassword
                                        }
                                        onChange={passwordFormik.handleChange}
                                        onBlur={passwordFormik.handleBlur}
                                        placeholder={t(
                                            "userPageCurrentPassword"
                                        )}
                                    />
                                    {passwordFormik.touched.currentPassword &&
                                    passwordFormik.errors.currentPassword ? (
                                        <div className="error small-text">
                                            {
                                                passwordFormik.errors
                                                    .currentPassword
                                            }
                                        </div>
                                    ) : null}
                                    <br />
                                    <Input
                                        variant="regular"
                                        type="password"
                                        name="newPassword"
                                        value={
                                            passwordFormik.values.newPassword
                                        }
                                        onChange={passwordFormik.handleChange}
                                        onBlur={passwordFormik.handleBlur}
                                        placeholder={t("userPageNewPassword")}
                                    />
                                    {passwordFormik.touched.newPassword &&
                                    passwordFormik.errors.newPassword ? (
                                        <div className="error small-text">
                                            {passwordFormik.errors.newPassword}
                                        </div>
                                    ) : null}
                                    <br />
                                    <Button
                                        variant="ordinary"
                                        type="submit"
                                        disabled={
                                            !passwordFormik.isValid ||
                                            !passwordFormik.dirty
                                        }
                                    >
                                        {t("userPageChangeSettingButton")}
                                    </Button>
                                </div>
                            </form>
                        )}
                        {changePasswordError ? (
                            <div className="error small-text">
                                {changePasswordError}
                            </div>
                        ) : null}

                        {uploadAvatarLoading ? (
                            <Loading />
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
                            <div className="error small-text">
                                {uploadAvatarError}
                            </div>
                        ) : null}

                        {deleteAvatarLoading ? (
                            <Loading />
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
                            <div className="error small-text">
                                {deleteAvatarError}
                            </div>
                        ) : null}

                        {deleteAccountLoading ? (
                            <Loading />
                        ) : (
                            <div>
                                <h2 className="medium-heading">
                                    {t("userPageDeleteAccount")}
                                </h2>
                                <Button
                                    variant="ordinary"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    {t("userPageDeleteAccountButton")}
                                </Button>
                            </div>
                        )}
                        {deleteAccountError ? (
                            <div className="error small-text">
                                {deleteAccountError}
                            </div>
                        ) : null}
                    </div>
                </React.Fragment>
            ) : (
                <div className="error small-text">{userError}</div>
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
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeleteAccount}
            />
        </div>
    )
}

export default User
