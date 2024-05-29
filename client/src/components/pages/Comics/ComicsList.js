import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import { getComicsByGenres, getComicsByTags } from "../../../services/filtering"
import { getComics } from "../../../services/comics"
import { useAsync } from "../../../hooks/useAsync"
import { useTranslation } from "react-i18next"

export const ComicsList = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const genreId = params.get("genre")
    const tagId = params.get("tag")

    const { t } = useTranslation()

    const {
        loading,
        error,
        value: comics,
    } = useAsync(() => {
        return genreId
            ? getComicsByGenres(genreId)
            : tagId
              ? getComicsByTags(tagId)
              : getComics()
    }, [genreId, tagId])

    if (loading) return <h1>Loading...</h1>
    if (error) return <div className="error">{error}</div>
    if (!comics?.length) return <p>{t("comicsFilterNoResults")}</p>
    if (!comics) return null

    return (
        <div className="comics-link-container">
            {comics.map((comic) => {
                return (
                    <div className="comics-link" key={comic?.comic_id}>
                        <NavLink to={`/comics/${comic?.comic_id}`}>
                            <img
                                src={comic?.cover_image_url}
                                alt={comic?.title}
                                className="comics-link-image"
                            />
                            <p style={{ marginBottom: 0 }}>{comic?.title}</p>
                            <div className="comics-list-item-average-rating">
                                <svg
                                    width="15"
                                    height="15"
                                    fill="none"
                                    viewBox="0 0 17 17"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17 8.5C17 3.80587 13.1941 0 8.5 0C3.80588 0 4.76837e-07 3.80587 4.76837e-07 8.5C4.76837e-07 13.1941 3.80588 17 8.5 17C13.1941 17 17 13.1941 17 8.5ZM4.06158 11.5642L5.70067 8.5L4.06229 5.43575L7.48283 6.04704L9.89046 3.54167L10.3658 6.98417L13.493 8.5L10.3658 10.0158L9.89046 13.4583L7.48213 10.953L4.06158 11.5642Z"
                                        fill="#DB4947"
                                    />
                                </svg>
                                <span
                                    className="small-text"
                                    style={{ marginLeft: 3 }}
                                >
                                    {comic?.average_rating || 0}
                                </span>
                            </div>
                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
}
