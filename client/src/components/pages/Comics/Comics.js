import React, { useState, useEffect } from "react"
import { useComics, handleRequestError } from "../../../context/ComicsContext"
import CommentsList from "./ComicsCommentsList"
import CommentForm from "../Comments/CommentForm"
import { useAsyncFn } from "../../../hooks/useAsync"
import { createComment } from "../../../services/comicComments"
import { rateAComics, getARating } from "../../../services/rating"
import "./Comics.css"
import { STARS } from "./rate-stars"

function Comics() {
    const { comic, rootComments, createLocalComment } = useComics()

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

    const [selectedRating, setSelectedRating] = useState(0)

    useEffect(() => {
        if (comic) {
            getARating({ comic_id: comic.comic_id })
                .then((rating) => {
                    if (rating) {
                        setSelectedRating(rating?.rating)
                    }
                })
                .catch((error) => {
                    setSelectedRating(0)
                    handleRequestError(error)
                })
        }
    }, [comic])

    function onCommentCreate(message) {
        return createCommentFn({ comic_id: comic.comic_id, message })
            .then(createLocalComment)
            .catch(handleRequestError)
    }

    const handleRateClick = (rating) => {
        setSelectedRating(rating)
        return rateAComicsFn({ rating, comic_id: comic?.comic_id }).catch(
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

            <p className="medium-heading">
                {comic?.average_rating || 0} ({comic?.total_votes || 0})
            </p>
            {rateLoading ? (
                "Loading..."
            ) : (
                <div className="rating-stars">
                    {STARS.map((rate) => (
                        <svg
                            key={rate.id}
                            width="30"
                            height="30"
                            fill="none"
                            viewBox="0 0 17 17"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => handleRateClick(rate.id)}
                        >
                            <path
                                d="M17 8.5C17 3.80587 13.1941 0 8.5 0C3.80588 0 4.76837e-07 3.80587 4.76837e-07 8.5C4.76837e-07 13.1941 3.80588 17 8.5 17C13.1941 17 17 13.1941 17 8.5ZM4.06158 11.5642L5.70067 8.5L4.06229 5.43575L7.48283 6.04704L9.89046 3.54167L10.3658 6.98417L13.493 8.5L10.3658 10.0158L9.89046 13.4583L7.48213 10.953L4.06158 11.5642Z"
                                fill={
                                    rate.id <= selectedRating
                                        ? rate.color
                                        : "gray"
                                }
                            />
                        </svg>
                    ))}
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
