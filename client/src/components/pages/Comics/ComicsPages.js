import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getComicPages } from "../../../services/comics"
import "./Comics.css"

function ComicPages() {
    const { comic_id } = useParams()
    const [comicPages, setComicPages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchPages() {
            try {
                const pages = await getComicPages(comic_id)
                setComicPages(pages)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchPages()
    }, [comic_id])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="comics-page-container">
            {comicPages.map((page) => (
                <img
                    key={page?.page_number}
                    src={page?.page_url}
                    alt={`page ${page?.page_number}`}
                    className="comics-page-image"
                />
            ))}
        </div>
    )
}

export default ComicPages
