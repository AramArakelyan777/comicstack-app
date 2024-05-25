import React, { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import "./HomePage.css"
import Button from "../../Button/Button"
import Footer from "../../Footer/Footer"
import { TAGS } from "./tags"
import { getTopComics } from "../../../services/comics"
import { handleRequestError } from "../../../context/ComicsContext"

const HomePage = () => {
    const navigate = useNavigate()

    const [topComics, setTopComics] = useState([])

    useEffect(() => {
        getTopComics().then(setTopComics).catch(handleRequestError)
    }, [])

    const handleTagClick = (tagId) => {
        navigate(`/comics?tag=${tagId}`)
    }
    console.log(topComics)

    return (
        <React.Fragment>
            <div className="homepage-container">
                {TAGS.map((tagName) => (
                    <Button
                        variant="tags"
                        key={tagName.id}
                        style={{ margin: 7 }}
                        onClick={() => handleTagClick(tagName.id)}
                    >
                        {tagName.tag}
                    </Button>
                ))}
                <h2 className="medium-heading">Top this month</h2>
                <div className="top-comics-container">
                    {topComics.map((comic) => (
                        <div className="comics-link" key={comic?.comic_id}>
                            <NavLink to={`/comics/${comic?.comic_id}`}>
                                <img
                                    src={comic?.cover_image_url}
                                    alt={comic?.title}
                                    className="comics-link-image"
                                />
                                <p style={{ marginBottom: 0 }}>
                                    {comic?.title}
                                </p>
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
                    ))}
                </div>
                <h2 className="medium-heading">See also</h2>
                <Button variant="ordinary" onClick={() => navigate("/comics")}>
                    See all comics
                </Button>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default HomePage
