import React from "react"
import login from "../../../assets/images/authorization/Login.png"
import "./Login.css"
import * as yup from "yup"
import { useFormik } from "formik"
import Input from "../../Input/Input"
import Button from "../../Button/Button"

const initialValues = {
    emailOrUsername: "",
    password: "",
}

const validationSchema = yup.object().shape({
    emailOrUsername: yup
        .string()
        .email("Invalid email address")
        .required("Required")
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
                <div>
                    <label htmlFor="emailOrUsername">Email or Username</label>
                    <br />
                    <Input
                        type="text"
                        name="emailOrUsername"
                        id="emailOrUsername"
                        {...formik.getFieldProps("emailOrUsername")}
                        variant="regular"
                    />
                    {formik.touched.emailOrUsername &&
                    formik.errors.emailOrUsername ? (
                        <div>{formik.errors.emailOrUsername}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <br />
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        {...formik.getFieldProps("password")}
                        variant="regular"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                </div>
                <Button
                    type="submit"
                    disabled={!formik.isValid}
                    variant="ordinary"
                    onClick={() => alert()}
                >
                    LOG IN
                </Button>
            </form>
        </div>
    )
}

export default Login
