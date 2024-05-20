import React, { useState } from "react"
import { handleRequestError, useThread } from "../../../context/ThreadContext"
import { useAsyncFn } from "../../../hooks/useAsync"
import { createComment } from "../../../services/threadComments"
import { deleteThread, updateThread } from "../../../services/threads"
import CommentForm from "../Comments/CommentForm"
import CommentsList from "./ThreadCommentsList"
import ThreadForm from "./ThreadForm"
import { useNavigate } from "react-router-dom"
import { IconContext } from "react-icons/lib"
import { MdCancel } from "react-icons/md"
import { BiSolidEditAlt } from "react-icons/bi"
import { MdOutlineDelete } from "react-icons/md"
import { MdOutlineAutoDelete } from "react-icons/md"
import "./Thread.css"

function Thread() {
    const navigate = useNavigate()

    const {
        thread: initialThread,
        rootComments,
        createLocalComment,
    } = useThread()
    const [thread, setThread] = useState(initialThread)
    console.log(initialThread)
    const {
        loading: updateLoading,
        error: updateError,
        execute: updateThreadFn,
    } = useAsyncFn(updateThread)

    const {
        loading: deleteLoading,
        error: deleteError,
        execute: deleteThreadFn,
    } = useAsyncFn(deleteThread)

    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(initialThread.title)
    const [editMessage, setEditMessage] = useState(initialThread.description)
    const [editedThreadType, setEditedThreadType] = useState(
        initialThread.thread_type
    )

    const {
        loading,
        error,
        execute: createCommentFn,
    } = useAsyncFn(createComment)

    function onCommentCreate(message) {
        return createCommentFn({ thread_id: thread.thread_id, message })
            .then(createLocalComment)
            .catch(handleRequestError)
    }

    const onEditClick = () => {
        if (isEditing) {
            setEditedTitle(thread.title)
            setEditMessage(thread.description)
            setEditedThreadType(thread.thread_type)
        } else {
            setEditedTitle(initialThread.title)
            setEditMessage(initialThread.description)
            setEditedThreadType(initialThread.thread_type)
        }
        setIsEditing(!isEditing)
    }

    function onThreadUpdate(values) {
        const updatedThread = { ...thread, ...values }
        setThread(updatedThread)

        return updateThreadFn({ ...values, thread_id: thread.thread_id })
            .then(() => {
                setIsEditing(false)
            })
            .catch(handleRequestError)
    }

    function onThreadDelete() {
        return deleteThreadFn({ thread_id: thread.thread_id })
            .then(() => {
                navigate("/threads")
            })
            .catch(handleRequestError)
    }

    return (
        <div className="thread-container">
            <IconContext.Provider
                value={{
                    size: 20,
                    color: "#DB4947",
                    style: { cursor: "pointer" },
                }}
            >
                {isEditing ? (
                    <div>
                        <ThreadForm
                            handleSubmit={(values) => onThreadUpdate(values)}
                            loading={updateLoading}
                            error={updateError}
                            initialTitle={editedTitle}
                            initialDescription={editMessage}
                            initialThreadType={editedThreadType}
                        />
                        {isEditing ? (
                            <MdCancel onClick={onEditClick} />
                        ) : (
                            <BiSolidEditAlt onClick={onEditClick} />
                        )}
                    </div>
                ) : (
                    <div>
                        <p className="bigger-heading thread-title">
                            {thread.title}
                        </p>
                        <p className="thread-description-text">
                            {thread.description}
                        </p>

                        <div className="thread-operations">
                            {isEditing ? (
                                <MdCancel onClick={onEditClick} />
                            ) : (
                                <BiSolidEditAlt onClick={onEditClick} />
                            )}

                            {deleteLoading ? (
                                <MdOutlineAutoDelete
                                    disabled={deleteLoading}
                                    onClick={onThreadDelete}
                                />
                            ) : (
                                <MdOutlineDelete
                                    disabled={deleteLoading}
                                    onClick={onThreadDelete}
                                />
                            )}
                        </div>
                    </div>
                )}
                {deleteError ? <div>{deleteError}</div> : null}
            </IconContext.Provider>
            <div>
                <h3>Comments</h3>
                <div>
                    <CommentForm
                        loading={loading}
                        error={error}
                        handleSubmit={onCommentCreate}
                    />
                    {rootComments && rootComments.length > 0 ? (
                        <div>
                            <CommentsList comments={rootComments} />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Thread
