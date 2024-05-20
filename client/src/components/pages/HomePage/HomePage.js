import React from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../Button/Button"

const HomePage = () => {
    const navigate = useNavigate()

    return (
        <div style={{ padding: 10 }}>
            <Button variant="ordinary" onClick={() => navigate("/comics")}>
                See all comics
            </Button>
        </div>
    )
}

export default HomePage
