import React from "react"
import messageGuys from "../../assets/images/404 Message Guys.png"
import "./NotFound.css"

function NotFound() {
    return (
        <div>
            <img
                className="notFoundImage"
                src={messageGuys}
                alt="message-guys"
            />
            <h1>Not Found</h1>
            <p>Warning: the page you are trying to enter does not exist.</p>
        </div>
    )
}

export default NotFound
