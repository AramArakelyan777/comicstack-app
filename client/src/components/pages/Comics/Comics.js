import React from "react"
import { useComics, handleRequestError } from "../../../context/ComicsContext"
import CommentsList from "./ComicsCommentsList"
import CommentForm from "../Comments/CommentForm"
import { useAsyncFn } from "../../../hooks/useAsync"
import { createComment } from "../../../services/comicComments"
import "./Comics.css"
import { rateAComics } from "../../../services/rating"

function Comics() {
    const { comic, rootComments, createLocalComment } = useComics()
    console.log(comic)
    const {
        loading,
        error,
        execute: createCommentFn,
    } = useAsyncFn(createComment)

    const {
        loading: rateLoading,
        error: rateError,
        execute: rateAComicsFn,
    } = useAsyncFn(rateAComics)

    function onCommentCreate(message) {
        return createCommentFn({ comic_id: comic.comic_id, message })
            .then(createLocalComment)
            .catch(handleRequestError)
    }

    const handleRateClick = (rating) => {
        rateAComicsFn({ rating, comic_id: comic?.comic_id }).catch(
            handleRequestError
        )
    }

    return (
        <div className="comics-container">
            <img
                className="comics-container-image"
                src={comic?.cover_image_url}
                alt="comics_cover"
            />
            <p className="bigger-heading">{comic?.title}</p>
            <p className="comics-description">{comic?.description}</p>
            
            <p>{comic?.average_rating || 0}</p>
            {rateLoading ? (
                "Loading..."
            ) : (
                <div>
                    <button onClick={() => handleRateClick(1)}>1</button>
                    <button onClick={() => handleRateClick(2)}>2</button>
                    <button onClick={() => handleRateClick(3)}>3</button>
                    <button onClick={() => handleRateClick(4)}>4</button>
                    <button onClick={() => handleRateClick(5)}>5</button>
                </div>
            )}
            {rateError ? <div>{rateError}</div> : null}

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
