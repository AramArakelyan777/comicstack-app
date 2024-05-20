import React from "react"
import { NavLink } from "react-router-dom"
import { getComics } from "../../../services/comics"
import { useAsync } from "../../../hooks/useAsync"

export const ComicsList = () => {
    const { loading, error, value: comics } = useAsync(getComics)

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>{error}</h1>
    if (!comics) return null

    return (
        <div className="comics-link-container">
            {comics.map((comic) => (
                <NavLink
                    style={{ textDecoration: "none", color: "white" }}
                    to={`/comics/${comic.comic_id}`}
                    key={comic.comic_id}
                    className="comics-link"
                >
                    <img
                        src={comic.cover_image_url}
                        alt="comics-cover"
                        className="comics-link-image"
                    />
                    <p>{comic.title}</p>
                </NavLink>
            ))}
        </div>
    )
}
