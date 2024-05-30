import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import Input from "../../Input/Input"
import Button from "../../Button/Button"
import "./Thread.css"
import { useTranslation } from "react-i18next"
import Loading from "../../Loading/Loading"

const validationSchema = yup.object().shape({
    title: yup
        .string()
        .required("Required")
        .min(3, "The title is too short")
        .max(80, "The title is too long"),
    description: yup
        .string()
        .required("Required")
        .min(50, "The description is too short")
        .max(5000, "The description is too long"),
    thread_type: yup.string().required("Thread type is required"),
})

function ThreadForm({
    loading,
    error,
    handleSubmit,
    initialTitle = "",
    initialDescription = "",
    initialThreadType = "",
}) {
    const { t } = useTranslation()

    const formik = useFormik({
        initialValues: {
            title: initialTitle,
            description: initialDescription,
            thread_type: initialThreadType,
        },
        validationSchema,
        onSubmit: (values, onSubmitProps) => {
            onSubmitProps.setSubmitting(true)
            handleSubmit(values)
            onSubmitProps.resetForm()
            onSubmitProps.setSubmitting(false)
        },
    })

    return (
        <div className="thread-form-container">
            <form onSubmit={formik.handleSubmit}>
                <Input
                    variant="regular"
                    type="text"
                    name="title"
                    {...formik.getFieldProps("title")}
                    placeholder={`${t("forumThreadFormTitle")} 🖋️`}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className="error small-text">
                        {formik.errors.title}
                    </div>
                ) : null}
                <br />

                <textarea
                    name="description"
                    {...formik.getFieldProps("description")}
                    placeholder={t("forumThreadFormDescription")}
                />
                {formik.touched.description && formik.errors.description ? (
                    <div className="error small-text">
                        {formik.errors.description}
                    </div>
                ) : null}
                <br />

                <select
                    name="thread_type"
                    {...formik.getFieldProps("thread_type")}
                >
                    <option>{t("forumThreadFormThreadType")}</option>
                    <option value="chat">{t("forumThreadFormTypeChat")}</option>
                    <option value="bug">{t("forumThreadFormTypeBug")}</option>
                    <option value="suggestion">
                        {t("forumThreadFormTypeSuggestion")}
                    </option>
                    <option value="support">
                        {t("forumThreadFormTypeSupport")}
                    </option>
                </select>
                {formik.touched.thread_type && formik.errors.thread_type ? (
                    <div className="error small-text">
                        {formik.errors.thread_type}
                    </div>
                ) : null}
                <br />

                {error ? <div className="error small-text">{error}</div> : null}

                <Button
                    variant="ordinary"
                    style={{ marginTop: "15px" }}
                    type="submit"
                    disabled={!formik.isValid && formik.isSubmitting}
                >
                    {loading ? <Loading /> : t("forumThreadFormPostButton")}
                </Button>
            </form>
        </div>
    )
}

export default ThreadForm
