import React from "react"
import "../../../assets/texts.css"
import { IMAGES } from "./images"
import "./Genres.css"

const Genres = () => {
    return (
        <div className="genres">
            <h1 className="bigger-heading">GENRES</h1>
            <div>
                {IMAGES.map((imageGroup) => (
                    <div key={imageGroup[0].id} className="column">
                        {imageGroup.map((image) => (
                            <div className="container">
                                <img key={image.id} src={image.src} alt="genre" />
                                <div className="centered">
                                    <p>{image.text}</p>
                                </div>
                            </div>

                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Genres
