import React, { useState } from "react"
import { useThread, handleRequestError } from "../../../context/ThreadContext"
import CommentsList from "./ThreadCommentsList"
import CommentForm from "../Comments/CommentForm"
import { useAsyncFn } from "../../../hooks/useAsync"
import {
    createComment,
    deleteComment,
    updateComment,
    likeComment,
    unlikeComment,
} from "../../../services/threadComments"
import unknownAvatar from "../../../assets/forumIcons/Avatar.png"
import "../Comments/Comments.css"
import { IconContext } from "react-icons/lib"
import { FaReply } from "react-icons/fa6"
import { MdCancel } from "react-icons/md"
import { BiSolidEditAlt } from "react-icons/bi"
import { MdOutlineDelete } from "react-icons/md"
import { MdOutlineAutoDelete } from "react-icons/md"
import { MdFavorite } from "react-icons/md"
import { MdFavoriteBorder } from "react-icons/md"
import { useTranslation } from "react-i18next"

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
})

function Comment({
    comment_id,
    user,
    messages,
    created_at,
    like_count,
    liked_by_me,
    depth = 0,
}) {
    const MAX_DEPTH = 3
    const {
        thread,
        getReplies,
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
    } = useThread()

    const { t } = useTranslation()

    const childComments = getReplies(comment_id)

    const [areChildrenHidden, setAreChildrenHidden] = useState(false)
    const [isReplying, setIsReplying] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [likedByMe, setLikedByMe] = useState(liked_by_me)
    const [likeCount, setLikeCount] = useState(like_count)
    const [editMessage, setEditMessage] = useState(messages)

    const createCommentFn = useAsyncFn(createComment)
    const updateCommentFn = useAsyncFn(updateComment)
    const deleteCommentFn = useAsyncFn(deleteComment)
    const likeCommentFn = useAsyncFn(likeComment)
    const unlikeCommentFn = useAsyncFn(unlikeComment)

    const onCommentReply = (message, parent_id) => {
        return createCommentFn
            .execute({
                thread_id: thread?.thread_id,
                message,
                parent_id,
            })
            .then((comment) => {
                setIsReplying(false)
                createLocalComment(comment)
            })
            .catch(handleRequestError)
    }

    const onCommentUpdate = (message) => {
        return updateCommentFn
            .execute({
                thread_id: thread?.thread_id,
                message,
                comment_id,
            })
            .then((comment) => {
                setIsEditing(false)
                setEditMessage("")
                updateLocalComment(comment_id, comment.messages)
            })
            .catch(handleRequestError)
    }

    const onEditClick = () => {
        if (isEditing) {
            setEditMessage(editMessage)
        } else {
            setEditMessage(messages)
        }
        setIsEditing(!isEditing)
    }

    const onCommentDelete = () => {
        return deleteCommentFn
            .execute({
                thread_id: thread?.thread_id,
                comment_id,
            })
            .then(() => deleteLocalComment(comment_id))
            .catch(handleRequestError)
    }

    const onLikeComment = () => {
        return likeCommentFn
            .execute({
                thread_id: thread?.thread_id,
                comment_id,
            })
            .then((response) => {
                if (!response.error) {
                    setLikedByMe(true)
                    setLikeCount((prevLikeCount) => prevLikeCount + 1)
                }
            })
            .catch(handleRequestError)
    }

    const onUnlikeComment = () => {
        return unlikeCommentFn
            .execute({
                thread_id: thread?.thread_id,
                comment_id,
            })
            .then((response) => {
                if (!response.error) {
                    setLikedByMe(false)
                    setLikeCount((prevLikeCount) => prevLikeCount - 1)
                }
            })
            .catch(handleRequestError)
    }

    return (
        <React.Fragment>
            <div className="comment-container">
                <div className="comment-container-top-section">
                    <div className="comment-user-info">
                        <img
                            className="user-avatar"
                            src={user?.avatar_url || unknownAvatar}
                            alt="avatar"
                        />
                        <span className="comment-top-section-username">
                            {user?.username}
                        </span>
                    </div>
                    <span className="small-text comment-date">
                        {dateFormatter.format(Date.parse(created_at))}
                    </span>
                </div>

                {isEditing ? (
                    <CommentForm
                        autoFocus
                        handleSubmit={(message) => onCommentUpdate(message)}
                        initialMessage={editMessage}
                        loading={updateCommentFn.loading}
                        error={updateCommentFn.error}
                    />
                ) : (
                    <p className="comment-message">{messages}</p>
                )}

                <IconContext.Provider
                    value={{
                        size: 20,
                        color: "#DB4947",
                        style: { cursor: "pointer" },
                    }}
                >
                    <div className="comment-container-operations">
                        <div className="comment-like">
                            {likedByMe ? (
                                <MdFavorite onClick={onUnlikeComment} />
                            ) : (
                                <MdFavoriteBorder onClick={onLikeComment} />
                            )}
                            <span className="comment-like-count">
                                {likeCount}
                            </span>
                        </div>

                        {likeCommentFn.error ? (
                            <div className="error small-text">
                                {likeCommentFn.error}
                            </div>
                        ) : null}

                        {unlikeCommentFn.error ? (
                            <div className="error small-text">
                                {unlikeCommentFn.error}
                            </div>
                        ) : null}

                        {isReplying ? (
                            <MdCancel
                                onClick={() =>
                                    setIsReplying((prevState) => !prevState)
                                }
                            />
                        ) : (
                            <FaReply
                                onClick={() =>
                                    setIsReplying((prevState) => !prevState)
                                }
                            />
                        )}

                        {isEditing ? (
                            <MdCancel onClick={onEditClick} />
                        ) : (
                            <BiSolidEditAlt onClick={onEditClick} />
                        )}

                        {deleteCommentFn.loading ? (
                            <MdOutlineAutoDelete
                                disabled={deleteCommentFn.loading}
                                onClick={onCommentDelete}
                            />
                        ) : (
                            <MdOutlineDelete
                                disabled={deleteCommentFn.loading}
                                onClick={onCommentDelete}
                            />
                        )}
                    </div>
                </IconContext.Provider>

                {deleteCommentFn.error ? (
                    <div className="error small-text">
                        {deleteCommentFn.error}
                    </div>
                ) : null}
            </div>
            {isReplying ? (
                <div>
                    <CommentForm
                        autoFocus
                        loading={createCommentFn.loading}
                        error={createCommentFn.error}
                        handleSubmit={(message) =>
                            onCommentReply(message, comment_id)
                        }
                    />
                </div>
            ) : null}

            {childComments && childComments.length > 0 && (
                <React.Fragment>
                    {depth < MAX_DEPTH ? (
                        <div
                            className={`nested-comments-stack ${
                                areChildrenHidden ? "hide" : ""
                            }`}
                        >
                            <button
                                className="collapse-line"
                                onClick={() => setAreChildrenHidden(true)}
                            />
                            <div className="nested-comments">
                                <CommentsList
                                    comments={childComments}
                                    depth={depth + 1}
                                />
                            </div>
                        </div>
                    ) : (
                        <div
                            className={`flat-comments ${areChildrenHidden ? "hide" : ""}`}
                        >
                            <CommentsList
                                comments={childComments}
                                depth={depth}
                            />
                        </div>
                    )}
                    <p
                        className={`showReplies ${!areChildrenHidden ? "hide" : ""}`}
                        onClick={() => setAreChildrenHidden(false)}
                    >
                        {t("forumThreadCommentsShowReplies")} ▼
                    </p>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default Comment
