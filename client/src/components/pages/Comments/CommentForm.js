import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import Button from "../../Button/Button"

const validationSchema = yup.object().shape({
    comment: yup
        .string()
        .required("Required")
        .min(3, "The comment is too short")
        .max(250, "The comment is too long"),
})

function CommentForm({
    loading,
    error,
    handleSubmit,
    autoFocus = false,
    initialMessage = "",
}) {
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
                />

                {formik.touched.comment && formik.errors.comment ? (
                    <div>{formik.errors.comment}</div>
                ) : error ? (
                    <div>{error}</div>
                ) : null}

                <br />

                <Button
                    variant="ordinary"
                    type="submit"
                    disabled={!formik.isValid && formik.isSubmitting}
                >
                    {loading ? "Loading..." : "Post"}
                </Button>
            </form>
        </div>
    )
}

export default CommentForm
