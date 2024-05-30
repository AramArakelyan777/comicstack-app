import React from "react"
import "./MainLoading.css"

const MainLoading = () => {
    return (
        <React.Fragment>
            <div className="body">
                <span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <div className="hand">
                    <span></span>
                    <div className="face"></div>
                    <div className="cowl"></div>
                </div>
            </div>
            <div className="speed">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </React.Fragment>
    )
}

export default MainLoading
