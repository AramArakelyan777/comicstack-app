import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import Input from "../../Input/Input"
import Button from "../../Button/Button"
import "./Thread.css"

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
                    placeholder="Craft a heroic title 🖋️"
                />
                {formik.touched.title && formik.errors.title ? (
                    <div>{formik.errors.title}</div>
                ) : null}
                <br />

                <textarea
                    name="description"
                    {...formik.getFieldProps("description")}
                    placeholder="Enter a description"
                />
                {formik.touched.description && formik.errors.description ? (
                    <div>{formik.errors.description}</div>
                ) : null}
                <br />

                <select
                    name="thread_type"
                    {...formik.getFieldProps("thread_type")}
                >
                    <option>Choose a type</option>
                    <option value="chat">Chat</option>
                    <option value="bug">Bug</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="support">Support</option>
                </select>
                {formik.touched.thread_type && formik.errors.thread_type ? (
                    <div>{formik.errors.thread_type}</div>
                ) : null}
                <br />

                {error ? <div>{error}</div> : null}

                <Button
                    variant="ordinary"
                    style={{ marginTop: "20px" }}
                    type="submit"
                    disabled={!formik.isValid && formik.isSubmitting}
                >
                    {loading ? "Loading..." : "Post a thread"}
                </Button>
            </form>
        </div>
    )
}

export default ThreadForm
