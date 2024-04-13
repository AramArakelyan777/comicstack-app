import { useFormik } from "formik"
import React from "react"
import * as yup from "yup"
import login from "../../../assets/images/authorization/Login.png"
import Button from "../../Button/Button"
import Input from "../../Input/Input"
import "./Authorization.css"
import { useNavigate } from "react-router-dom"

const initialValues = {
    emailOrUsername: "",
    password: "",
}

const validationSchema = yup.object().shape({
    emailOrUsername: yup
        .string()
        .required("Required")
        .matches(
            /(?=.{3,50}$)/,
            "Email or username must be between 3 and 50 characters"
        )
        .test("is-valid", "Invalid username or email", (value) => {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
            const usernameRegex = /^[a-zA-Z0-9_]+$/

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

const onSubmit = (values, onSubmitProps) => {
    console.log("Form values", values)
    onSubmitProps.resetForm()
}

const Login = () => {
    const navigate = useNavigate()
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
        <div>
            <img className="loginImage" src={login} alt="login" />
            <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                    <div>
                        <label htmlFor="emailOrUsername">
                            Email or Username
                        </label>
                    </div>
                    <br />
                    <Input
                        type="text"
                        name="emailOrUsername"
                        id="emailOrUsername"
                        {...formik.getFieldProps("emailOrUsername")}
                        variant="regular"
                        placeholder="Username/Mail in the multiverse 🦹‍♀️"
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
                        <label htmlFor="password">Password</label>
                    </div>
                    <br />
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        {...formik.getFieldProps("password")}
                        variant="regular"
                        placeholder="Guard the Batcave entrance 🗝️"
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
                    LOG IN
                </Button>
            </form>
            <div className="loginLinks">
                <div className="mainLink">
                    <span>Forgotten</span>
                    <span className="coloredLink"> password?</span>
                </div>
                <div className="mainLink" onClick={() => navigateToRegister()}>
                    <span>Create</span>
                    <span className="coloredLink"> an account!</span>
                </div>
            </div>
        </div>
    )
}

export default Login
