import React, { useContext, useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import login from "../../../assets/images/authorization/Login.png"
import Button from "../../Button/Button"
import Input from "../../Input/Input"
import "./Authorization.css"
import "../../../assets/texts.css"
import { useNavigate } from "react-router-dom"
import { AuthorizationContext } from "../../../index"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"

const initialValues = {
    emailOrUsername: "",
    password: "",
}

const validationSchema = yup.object().shape({
    emailOrUsername: yup
        .string()
        .required("Required")
        .min(3, "Email/username must be at least 3 characters")
        .max(50, "Email/username must be 50 characters or less")
        .test("is-valid", "Invalid username or email", (value) => {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
            const usernameRegex = /^[a-zA-Z0-9_\u0531-\u0587]+$/
            
            return emailRegex.test(value) || usernameRegex.test(value)
        }),
    password: yup
        .string()
        .matches(
            /(?=.*[A-Z])/,
            "Password must contain at least one uppercase letter"
        )
        .matches(/(?=.{6,20}$)/, "Password must be between 6 and 20 characters")
        .matches(
            /[ -/:-@[-`{-~]/,
            "Password must contain at least one special character"
        )
        .matches(/(?=.*[0-9])/, "Password must contain at least one digit")
        .required("Required"),
})

const Login = () => {
    const { t } = useTranslation()

    const { store } = useContext(AuthorizationContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (store.isAuth) {
            navigate("/user")
        }
    }, [store.isAuth, navigate])

    const onSubmit = async (values, onSubmitProps) => {
        await store.login(
            values.emailOrUsername,
            values.emailOrUsername,
            values.password
        )

        onSubmitProps.resetForm()
    }

    const navigateToRegister = () => {
        navigate("/register")
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        validateOnBlur: true,
        validateOnChange: true,
    })

    return (
        <div className="login">
            <img className="loginImage" src={login} alt="login" />
            {store.error ? (
                <div className="error small-text">{store.error}</div>
            ) : null}

            <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                    <div>
                        <label htmlFor="emailOrUsername">
                            {t("loginEmailOrUsername")}
                        </label>
                    </div>
                    <br />
                    <Input
                        type="text"
                        name="emailOrUsername"
                        id="emailOrUsername"
                        {...formik.getFieldProps("emailOrUsername")}
                        variant="regular"
                        placeholder={`${t("loginEmailOrUsernamePlaceholder")} 🦹‍♀️`}
                    />
                    {formik.touched.emailOrUsername &&
                    formik.errors.emailOrUsername ? (
                        <div className="error small-text">
                            {formik.errors.emailOrUsername}
                        </div>
                    ) : null}
                </div>
                <div className="form-control">
                    <div>
                        <label htmlFor="password">{t("loginPassword")}</label>
                    </div>
                    <br />
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        {...formik.getFieldProps("password")}
                        variant="regular"
                        placeholder={`${t("loginPasswordPlaceholder")} 🗝️`}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="error small-text">
                            {formik.errors.password}
                        </div>
                    ) : null}
                </div>
                <Button
                    type="submit"
                    disabled={!formik.isValid}
                    variant="ordinary"
                >
                    {t("loginButton")}
                </Button>
            </form>
            <div className="loginLinks">
                <div className="mainLink">
                    <span>{t("loginLinkForgotten")}</span>
                    <span className="coloredLink">
                        {" "}
                        {t("loginLinkPassword")}
                    </span>
                </div>
                <div className="mainLink" onClick={() => navigateToRegister()}>
                    <span>{t("loginLinkCreate")}</span>
                    <span className="coloredLink">
                        {" "}
                        {t("loginLinkAccount")}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default observer(Login)
