import { useFormik } from "formik"
import React from "react"
import * as yup from "yup"
import register from "../../../assets/images/authorization/Register.png"
import Button from "../../Button/Button"
import Input from "../../Input/Input"
import "./Authorization.css"

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
        .matches(/(?=.{6,50}$)/, "Email must be between 6 and 50 characters")
        .email("Invalid email address"),
    username: yup
        .string()
        .required("Required")
        .matches(
            /(?=.{3,50}$)/,
            "Username must be between 6 and 50 characters"
        ),
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

const onSubmit = (values, onSubmitProps) => {
    console.log("Form values", values)
    onSubmitProps.resetForm()
}

const Register = () => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        validateOnBlur: true,
        validateOnChange: true,
    })

    return (
        <div>
            <img className="registerImage" src={register} alt="register" />
            <form onSubmit={formik.handleSubmit}>
                <Button
                    type="submit"
                    disabled={!formik.isValid}
                    variant="ordinary"
                >
                    REGISTER
                </Button>
            </form>
            <div className="registerLinks">
                <div className="mainLink">
                    <span>Already have</span>
                    <span className="coloredLink"> an account?</span>
                </div>
            </div>
        </div>
    )
}

export default Register
