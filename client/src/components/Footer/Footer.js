import React from "react"
import "./Footer.css"
import "../../assets/texts.css"
import logo from "../../assets/images/footer/DarkLogo.png"
import Input from "../Input/Input"
import Button from "../Button/Button"
import { useFormik } from "formik"
import * as yup from "yup"

const onSubmit = (values, onSubmitProps) => {
    console.log("Form values", values)
    onSubmitProps.resetForm()
}

const validationSchema = yup.object().shape({
    subscribeEmail: yup
        .string()
        .required("Required")
        .matches(/(?=.{6,50}$)/, "Email must be between 6 and 50 characters")
        .email("Invalid email address"),
})

function Footer() {
    const formik = useFormik({
        initialValues: { subscribeEmail: "" },
        onSubmit,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
    })

    return (
        <div className="footer">
            <img className="darkLogo" src={logo} alt="logo" />
            <div className="footer-content">
                <div>
                    <p>Subscribe to get our newsletter!</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <Input
                                type="email"
                                name="subscribeEmail"
                                id="subscribeEmail"
                                {...formik.getFieldProps("subscribeEmail")}
                                variant="small"
                                placeholder=""
                            />
                            {formik.touched.subscribeEmail &&
                            formik.errors.subscribeEmail ? (
                                <div className="error small-text">
                                    {formik.errors.subscribeEmail}
                                </div>
                            ) : null}
                        </div>
                        <Button
                            variant="ordinary"
                            type="submit"
                            id="subscribeEmail"
                            disabled={!formik.isValid}
                        >
                            Subscribe
                        </Button>
                    </form>
                    <p>Please help us keep ComicStack free!</p>
                </div>
                <div className="info"></div>
            </div>
        </div>
    )
}

export default Footer