import React from "react"
import { useNavigate } from "react-router-dom"
import "./HomePage.css"
import Button from "../../Button/Button"
import Footer from "../../Footer/Footer"
import { TAGS } from "./tags"

const HomePage = () => {
    const navigate = useNavigate()

    const handleTagClick = (tagId) => {
        navigate(`/comics?tag=${tagId}`)
    }

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
