import React from "react"
import { useComics, handleRequestError } from "../../../context/ComicsContext"
import CommentsList from "./ComicsCommentsList"
import CommentForm from "../Comments/CommentForm"
import { useAsyncFn } from "../../../hooks/useAsync"
import { createComment } from "../../../services/comicComments"
import "./Comics.css"

function Comics() {
    const { comic, rootComments, createLocalComment } = useComics()
    const {
        loading,
        error,
        execute: createCommentFn,
    } = useAsyncFn(createComment)

    function onCommentCreate(message) {
        return createCommentFn({ comic_id: comic.comic_id, message })
            .then(createLocalComment)
            .catch(handleRequestError)
    }

    return (
        <div className="comics-container">
            <img
                className="comics-container-image"
                src={comic.cover_image_url}
                alt="comics_cover"
            />
            <p className="bigger-heading">{comic.title}</p>
            <p className="comics-description">{comic.description}</p>
            <p>{comic.average_rating}</p>
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

export default Comics
