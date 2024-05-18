import React, { useContext } from "react"
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
        .required("Required")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
})

const Register = () => {
    const { store } = useContext(AuthorizationContext)
    const navigate = useNavigate()

    const onSubmit = async (values, onSubmitProps) => {
        await store.registration(values.username, values.email, values.password)

        onSubmitProps.resetForm()

        navigate("/user")
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
            <form onSubmit={formik.handleSubmit}>
                {store.error ? (
                    <div className="error small-text">{store.error}</div>
                ) : null}

                <div className="form-control">
                    <div>
                        <label htmlFor="email">Email</label>
                    </div>
                    <br />
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        {...formik.getFieldProps("email")}
                        variant="regular"
                        placeholder="Unleash your email heroically! 🦸‍♀️📮"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="error small-text">
                            {formik.errors.email}
                        </div>
                    ) : null}
                </div>
                <div className="form-control">
                    <div>
                        <label htmlFor="username">Username</label>
                    </div>
                    <br />
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        {...formik.getFieldProps("username")}
                        variant="regular"
                        placeholder="Craft your username like a hero! 🛡️🧙‍♂️"
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className="error small-text">
                            {formik.errors.username}
                        </div>
                    ) : null}
                </div>
                <div className="form-control">
                    <div>
                        <label htmlFor="password">Password</label>
                    </div>
                    <br />
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        {...formik.getFieldProps("password")}
                        variant="regular"
                        placeholder="Craft a mighty password! 🔐"
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
                            Confirm Password
                        </label>
                    </div>
                    <br />
                    <Input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        {...formik.getFieldProps("confirmPassword")}
                        variant="regular"
                        placeholder="Confirm your epic password! 🔒"
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
                    REGISTER
                </Button>
            </form>
            <div className="registerLinks">
                <div className="mainLink" onClick={() => navigateToLogin()}>
                    <span>Already have</span>
                    <span className="coloredLink"> an account?</span>
                </div>
            </div>
        </div>
    )
}

export default observer(Register)
