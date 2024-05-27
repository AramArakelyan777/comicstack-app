import React, { useContext, useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import register from "../../../assets/images/authorization/Register.png"
import Button from "../../Button/Button"
import Input from "../../Input/Input"
import "./Authorization.css"
import "../../../assets/texts.css"
import { useNavigate } from "react-router-dom"
import { AuthorizationContext } from "../../../index"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"

const initialValues = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
}

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .required("Required")
        .min(6, "Email must be at least 6 characters")
        .max(50, "Email must be 50 characters or less")
        .email("Invalid email address"),
    username: yup
        .string()
        .required("Required")
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be 30 characters or less"),
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
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Required"),
})

const Register = () => {
    const { t } = useTranslation()

    const { store } = useContext(AuthorizationContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (store.isAuth) {
            navigate("/user")
        }
    }, [store.isAuth, navigate])

    const onSubmit = async (values, onSubmitProps) => {
        await store.registration(values.username, values.email, values.password)

        onSubmitProps.resetForm()
    }

    const navigateToLogin = () => {
        navigate("/login")
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        validateOnBlur: true,
        validateOnChange: true,
    })

    return (
        <div className="register">
            <img className="registerImage" src={register} alt="register" />
            {store.error ? (
                <div className="error small-text">{store.error}</div>
            ) : null}

            <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                    <div>
                        <label htmlFor="email">{t("registerEmail")}</label>
                    </div>
                    <br />
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        {...formik.getFieldProps("email")}
                        variant="regular"
                        placeholder={`${t("registerEmailPlaceholder")} 🦸‍♀️📮`}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="error small-text">
                            {formik.errors.email}
                        </div>
                    ) : null}
                </div>
                <div className="form-control">
                    <div>
                        <label htmlFor="username">
                            {t("registerUsername")}
                        </label>
                    </div>
                    <br />
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        {...formik.getFieldProps("username")}
                        variant="regular"
                        placeholder={`${t("registerUsernamePlaceholder")} 🛡️🧙‍♂️`}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className="error small-text">
                            {formik.errors.username}
                        </div>
                    ) : null}
                </div>
                <div className="form-control">
                    <div>
                        <label htmlFor="password">
                            {t("registerPassword")}
                        </label>
                    </div>
                    <br />
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        {...formik.getFieldProps("password")}
                        variant="regular"
                        placeholder={`${t("registerPasswordPlaceholder")} 🔐`}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="error small-text">
                            {formik.errors.password}
                        </div>
                    ) : null}
                </div>
                <div className="form-control">
                    <div>
                        <label htmlFor="confirmPassword">
                            {t("registerConfirmPassword")}
                        </label>
                    </div>
                    <br />
                    <Input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        {...formik.getFieldProps("confirmPassword")}
                        variant="regular"
                        placeholder={`${t("registerConfirmPasswordPlaceholder")} 🔐`}
                    />
                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                        <div className="error small-text">
                            {formik.errors.confirmPassword}
                        </div>
                    ) : null}
                </div>
                <Button
                    type="submit"
                    disabled={!formik.isValid}
                    variant="ordinary"
                >
                    {t("registerButton")}
                </Button>
            </form>
            <div className="registerLinks">
                <div className="mainLink" onClick={() => navigateToLogin()}>
                    <span>{t("registerLinkAlreadyHave")}</span>
                    <span className="coloredLink">
                        {" "}
                        {t("registerLinkAccount")}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default observer(Register)
