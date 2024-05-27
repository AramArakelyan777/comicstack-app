import { useFormik } from "formik"
import React from "react"
import { CiLocationOn } from "react-icons/ci"
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { IoIosMail } from "react-icons/io"
import * as yup from "yup"
import logo from "../../assets/images/footer/DarkLogo.png"
import "../../assets/texts.css"
import Button from "../Button/Button"
import Input from "../Input/Input"
import "./Footer.css"
import { useTranslation } from "react-i18next"

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
const { t } = useTranslation()

    const formik = useFormik({
        initialValues: { subscribeEmail: "" },
        onSubmit,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
    })

    return (
        <footer className="footer">
            <img className="darkLogo" src={logo} alt="logo" />
            <div className="footer-content">
                <div className="subscibe">
                    <p>{t("footerSubText")}</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <Input
                                type="email"
                                name="subscribeEmail"
                                id="subscribeEmail"
                                {...formik.getFieldProps("subscribeEmail")}
                                variant="small"
                                placeholder={`${t("footerSubPlaceholder")} 📧`}
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
                            {t("footerSubButton")}
                        </Button>
                    </form>
                    <p>{t("footerDonateText")}</p>
                    <Button variant="donate">{t("footerDonateButton")} ☕</Button>
                </div>
                <div className="info">
                    <div className="location">
                        <CiLocationOn size={25} />
                        <span>{t("footerInfoLocationText")}</span>
                    </div>
                    <span className="coloredText">
                    {t("footerInfoLocation")}
                    </span>
                    <div className="contact">
                        <IoIosMail size={25} />
                        <span>{t("footerInfoContactText")}</span>
                    </div>
                    <span className="coloredText">
                        info.comicstack@gmail.com
                    </span>
                    <div className="socials">
                        <FaGithub size={20} />
                        <FaFacebook size={20} />
                        <FaInstagram size={20} />
                        <FaXTwitter size={20} />
                    </div>
                </div>
            </div>
            <div className="policies">
                <p>{t("footerPagePrivacy")}</p>
                <p>{t("footerPageAgreement")}</p>
                <p>{t("footerPageCookie")}</p>
                <p>{t("footerPageTerms")}</p>
            </div>
            <p className="footer-text">
                {`${new Date().getFullYear()}`} {t("footerDisclaimer")}
            </p>
        </footer>
    )
}

export default Footer
