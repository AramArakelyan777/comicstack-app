import React from "react"
import { useNavigate } from "react-router-dom"
import "../../../assets/texts.css"
import { IMAGES } from "./images"
import "./Genres.css"
import Footer from "../../Footer/Footer"

const Genres = () => {
    const navigate = useNavigate()

    const handleGenreClick = (genreId) => {
        navigate(`/comics?genre=${genreId}`)
    }

    return (
        <React.Fragment>
            <div className="genres">
                <h1 className="bigger-heading">GENRES</h1>
                {IMAGES.map((imageGroup) => (
                    <div key={imageGroup[0].id} className="genre-column">
                        {imageGroup.map((image) => (
                            <div
                                className="genre-container"
                                key={image.id}
                                onClick={() => handleGenreClick(image.id)}
                            >
                                <img src={image.src} alt="genre" />
                                <div className="centered-text-genre">
                                    {image.text}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Genres
