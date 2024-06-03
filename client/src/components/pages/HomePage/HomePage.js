import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { NavLink, useNavigate } from "react-router-dom"
import ArmenianSvg from "../../../assets/icons/armenian.png"
import EnglishSvg from "../../../assets/icons/english.png"
import { handleRequestError } from "../../../context/ComicsContext"
import { useAsyncFn } from "../../../hooks/useAsync"
import { getPopularComics, getTopComics } from "../../../services/comics"
import Button from "../../Button/Button"
import Footer from "../../Footer/Footer"
import "./HomePage.css"
import { TAGS } from "./tags"
import Loading from "../../Loading/Loading"

const HomePage = () => {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
        document.body.className = lng === "am" ? "font-armenian" : ""
    }

    const {
        loading: topLoading,
        error: topError,
        execute: getTopComicsFn,
    } = useAsyncFn(getTopComics)

    const {
        loading: popularLoading,
        error: popularError,
        execute: getPopularComicsFn,
    } = useAsyncFn(getPopularComics)

    const [topComics, setTopComics] = useState([])
    const [popularComics, setPopularComics] = useState([])

    useEffect(() => {
        const savedLanguage = localStorage.getItem("i18nextLng")
        if (savedLanguage) {
            document.body.className =
                savedLanguage === "am" ? "font-armenian" : ""
        }
        getTopComicsFn().then(setTopComics).catch(handleRequestError)
        getPopularComicsFn().then(setPopularComics).catch(handleRequestError)
    }, [getTopComicsFn, getPopularComicsFn])

    const handleTagClick = (tagId) => {
        navigate(`/comics?tag=${tagId}`)
    }

    return (
        <React.Fragment>
            <div className="homepage-container">
                <button
                    onClick={() => changeLanguage("en")}
                    style={{
                        margin: 7,
                        width: 45,
                        height: 35,
                        backgroundColor: "transparent",
                        border: "1px solid #db4947",
                        borderRadius: 10,
                        cursor: "pointer",
                    }}
                >
                    <img
                        src={EnglishSvg}
                        alt="English"
                        style={{ width: 30, height: 30 }}
                    />
                </button>
                <button
                    onClick={() => changeLanguage("am")}
                    style={{
                        margin: 7,
                        width: 45,
                        height: 35,
                        backgroundColor: "transparent",
                        border: "1px solid #db4947",
                        borderRadius: 10,
                        cursor: "pointer",
                    }}
                >
                    <img
                        src={ArmenianSvg}
                        alt="Armenian"
                        style={{ width: 30, height: 30 }}
                    />
                </button>
                <br />
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
                <h2 className="medium-heading">{t("homePageTopOfAllTime")}</h2>
                <div className="top-comics-container">
                    {topLoading ? (
                        <Loading />
                    ) : (
                        topComics.map((comic) => (
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
                        ))
                    )}
                    {topError ? (
                        <div className="error small-text">{topError}</div>
                    ) : null}
                </div>
                <h2 className="medium-heading">{t("homePagePopular")}</h2>
                <div className="top-comics-container">
                    {popularLoading ? (
                        <Loading />
                    ) : (
                        popularComics.map((comic) => (
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
                        ))
                    )}
                    {popularError ? (
                        <div className="error small-text">{popularError}</div>
                    ) : null}
                </div>
                <Button
                    variant="ordinary"
                    onClick={() => navigate("/comics")}
                    style={{ margin: "35px 0" }}
                >
                    {t("homePageSeeAll")}
                </Button>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default HomePage
