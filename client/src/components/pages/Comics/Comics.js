import React, { useState, useEffect } from "react"
import { useComics, handleRequestError } from "../../../context/ComicsContext"
import CommentsList from "./ComicsCommentsList"
import CommentForm from "../Comments/CommentForm"
import { useAsyncFn } from "../../../hooks/useAsync"
import { createComment } from "../../../services/comicComments"
import { rateAComics, getARating } from "../../../services/rating"
import { STARS } from "./rate-stars"
import moment from "moment"
import tippy from "tippy.js"
import "tippy.js/dist/tippy.css"
import "./Comics.css"
import Button from "../../Button/Button"
import { setAStatus, getAStatus } from "../../../services/status"
import { MdFavorite } from "react-icons/md"
import { LuCalendarClock } from "react-icons/lu"
import { FaBookOpenReader } from "react-icons/fa6"
import { LuBookOpenCheck } from "react-icons/lu"
import { useTranslation } from "react-i18next"

function Comics() {
    const { t } = useTranslation()

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

    const {
        loading: statusLoading,
        error: statusError,
        execute: setAStatusFn,
    } = useAsyncFn(setAStatus)

    const [selectedRating, setSelectedRating] = useState(0)
    const [selectedStatus, setSelectedStatus] = useState("")
    const [hoveredRating, setHoveredRating] = useState(0)

    useEffect(() => {
        if (comic) {
            getARating({ comic_id: comic.comic_id })
                .then((rating) => {
                    setSelectedRating(rating ? rating?.rating : 0)
                })
                .catch((error) => {
                    setSelectedRating(0)
                    handleRequestError(error)
                })
        }
    }, [comic])

    useEffect(() => {
        if (comic) {
            getAStatus({ comic_id: comic.comic_id })
                .then((status) => {
                    setSelectedStatus(status ? status?.status : "")
                })
                .catch((error) => {
                    setSelectedStatus("")
                    handleRequestError(error)
                })
        }
    }, [comic])

    useEffect(() => {
        tippy(".icon", {
            content: (reference) => reference.getAttribute("data-tooltip"),
            arrow: true,
        })
    }, [statusLoading])

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

    const handleStatusClick = (status) => {
        setSelectedStatus(status)
        return setAStatusFn({ status, comic_id: comic?.comic_id }).catch(
            handleRequestError
        )
    }

    const handleRateHover = (rating) => {
        setHoveredRating(rating)
    }

    const handleRateLeave = () => {
        setHoveredRating(selectedRating)
    }

    return (
        <div className="comics-container">
            <div className="comics-item-header">
                <div>
                    <img
                        className="comics-container-image"
                        src={comic?.cover_image_url}
                        alt="comics_cover"
                    />
                    <br />
                    <Button variant="ordinary" style={{ marginTop: 10 }}>
                        {t("comicsStartReadingButton")}
                    </Button>
                </div>
                <div className="comics-item-info">
                    <p className="medium-heading">{comic?.title}</p>
                    <p>
                        <b>{t("comicsAuthor")}:</b> {comic?.author}
                    </p>
                    <p>
                        <b>{t("comicsDate")}:</b>{" "}
                        {moment(comic?.date).format("DD-MM-YYYY")}
                    </p>
                    <p>
                        <b>{t("comicsGenres")}:</b>{" "}
                        {comic?.genres?.map(
                            (genre, index) =>
                                genre?.genre_name +
                                (index < comic?.genres.length - 1 ? ", " : "")
                        )}
                    </p>
                    <p>
                        <b>{t("comicsTags")}:</b>{" "}
                        {comic?.tags?.map(
                            (tag, index) =>
                                tag?.tag_name +
                                (index < comic?.tags.length - 1 ? ", " : "")
                        )}
                    </p>
                    <p>
                        <b>{t("comicsStatus")}:</b>{" "}
                        {comic?.current_status || ""}
                    </p>
                    <div className="comics-status-icons-container">
                        {statusLoading ? (
                            "Loading..."
                        ) : (
                            <React.Fragment>
                                <MdFavorite
                                    className={`icon ${selectedStatus === "favourite" ? "selected" : ""}`}
                                    data-tooltip={t("comicsStatusFavorite")}
                                    size={30}
                                    onClick={() =>
                                        handleStatusClick("favourite")
                                    }
                                />
                                <LuCalendarClock
                                    className={`icon ${selectedStatus === "in plans" ? "selected" : ""}`}
                                    data-tooltip={t("comicsStatusInPlans")}
                                    size={30}
                                    onClick={() => {
                                        handleStatusClick("in plans")
                                    }}
                                />
                                <FaBookOpenReader
                                    className={`icon ${selectedStatus === "reading" ? "selected" : ""}`}
                                    data-tooltip={t("comicsStatusReading")}
                                    size={30}
                                    onClick={() => handleStatusClick("reading")}
                                />
                                <LuBookOpenCheck
                                    className={`icon ${selectedStatus === "read" ? "selected" : ""}`}
                                    data-tooltip={t("comicsStatusRead")}
                                    size={30}
                                    onClick={() => handleStatusClick("read")}
                                />
                            </React.Fragment>
                        )}
                        {statusError ? <div>{statusError}</div> : null}
                    </div>
                </div>
            </div>
            <p className="medium-heading" style={{ marginTop: 70 }}>
                {t("comicsDescription")}
            </p>
            <p className="comics-description">{comic?.description}</p>

            <p
                className="medium-heading"
                style={{ marginTop: 70, marginBottom: 7 }}
            >
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
                            onMouseEnter={() => handleRateHover(rate.id)}
                            onMouseLeave={handleRateLeave}
                        >
                            <path
                                d="M17 8.5C17 3.80587 13.1941 0 8.5 0C3.80588 0 4.76837e-07 3.80587 4.76837e-07 8.5C4.76837e-07 13.1941 3.80588 17 8.5 17C13.1941 17 17 13.1941 17 8.5ZM4.06158 11.5642L5.70067 8.5L4.06229 5.43575L7.48283 6.04704L9.89046 3.54167L10.3658 6.98417L13.493 8.5L10.3658 10.0158L9.89046 13.4583L7.48213 10.953L4.06158 11.5642Z"
                                fill={
                                    rate.id <= (hoveredRating || selectedRating)
                                        ? rate.color
                                        : "gray"
                                }
                            />
                        </svg>
                    ))}
                </div>
            )}
            {rateError ? <div>{rateError}</div> : null}

            <div className="rating-counts">
                {STARS.map((star, index) => {
                    const ratingCount = comic?.rating_counts?.find(
                        (r) => r.rating === star.id
                    )
                    const count = ratingCount ? parseInt(ratingCount.count) : 0

                    const totalSum = comic?.rating_counts?.reduce(
                        (sum, item) => sum + parseInt(item.count, 10),
                        0
                    )

                    return (
                        <div key={index} className="rating-row">
                            <svg
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 17 17"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M17 8.5C17 3.80587 13.1941 0 8.5 0C3.80588 0 4.76837e-07 3.80587 4.76837e-07 8.5C4.76837e-07 13.1941 3.80588 17 8.5 17C13.1941 17 17 13.1941 17 8.5ZM4.06158 11.5642L5.70067 8.5L4.06229 5.43575L7.48283 6.04704L9.89046 3.54167L10.3658 6.98417L13.493 8.5L10.3658 10.0158L9.89046 13.4583L7.48213 10.953L4.06158 11.5642Z"
                                    fill={star.color}
                                />
                            </svg>
                            <progress
                                className="comics-rating-progress-bar"
                                value={ratingCount?.count || 0}
                                max={totalSum}
                            />
                            <span className="rating-count">
                                {count}{" "}
                                <span className="comics-rating-votes">
                                    {t("comicsRatingVotes")}
                                </span>
                            </span>
                        </div>
                    )
                })}
            </div>

            <div>
                <h3 className="medium-heading" style={{ marginTop: 70 }}>
                    {t("comicsComments")}
                </h3>
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
