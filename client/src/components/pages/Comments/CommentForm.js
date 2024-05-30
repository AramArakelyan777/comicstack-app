import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import Button from "../../Button/Button"
import { useTranslation } from "react-i18next"
import Loading from "../../Loading/Loading"

const validationSchema = yup.object().shape({
    comment: yup
        .string()
        .required("Required")
        .min(3, "The comment is too short")
        .max(2500, "The comment is too long"),
})

function CommentForm({
    loading,
    error,
    handleSubmit,
    autoFocus = false,
    initialMessage = "",
}) {
    const { t } = useTranslation()

    const formik = useFormik({
        initialValues: {
            comment: initialMessage,
        },
        validationSchema,
        onSubmit: (values, onSubmitProps) => {
            onSubmitProps.setSubmitting(true)
            handleSubmit(values?.comment)
            onSubmitProps.resetForm()
            onSubmitProps.setSubmitting(false)
        },
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <textarea
                    autoFocus={autoFocus}
                    {...formik.getFieldProps("comment")}
                    name="comment"
                    style={{ resize: "vertical", width: "300px" }}
                    placeholder={`${t("commentFormPlaceholder")}`}
                />

                {formik.touched.comment && formik.errors.comment ? (
                    <div>{formik.errors.comment}</div>
                ) : error ? (
                    <div className="error small-text">{error}</div>
                ) : null}

                <br />

                <Button
                    variant="ordinary"
                    type="submit"
                    disabled={!formik.isValid && formik.isSubmitting}
                    style={{ marginTop: 7 }}
                >
                    {loading ? <Loading /> : t("commentFormPostButton")}
                </Button>
            </form>
        </div>
    )
}

export default CommentForm
