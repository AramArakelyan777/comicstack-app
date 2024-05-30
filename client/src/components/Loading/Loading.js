import React from "react"
import loadingImg from "../../assets/images/loading.png"
import "./Loading.css"

function Loading() {
    return <img src={loadingImg} alt="Loading..." className="loading-img" />
}

export default Loading
