import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import { getComicsByGenres } from "../../../services/filtering"
import { getComics } from "../../../services/comics"
import { useAsync } from "../../../hooks/useAsync"

export const ComicsList = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const genreId = params.get("genre")

    const {
        loading,
        error,
        value: comics,
    } = useAsync(() => {
        return genreId ? getComicsByGenres(genreId) : getComics()
    }, [genreId])

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>{error}</h1>
    if (!comics) return null

    return (
        <div className="comics-link-container">
            {comics.map((comic) => (
                <NavLink
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
