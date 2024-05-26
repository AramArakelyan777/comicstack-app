import React, { useState, useEffect } from "react"
import { createThread, getThreads } from "../../../services/threads"
import { NavLink, useNavigate } from "react-router-dom"
import { useAsyncFn } from "../../../hooks/useAsync"
import Chat from "../../../assets/forumIcons/Chat.png"
import Bug from "../../../assets/forumIcons/Bug.png"
import Support from "../../../assets/forumIcons/Support.png"
import Suggestion from "../../../assets/forumIcons/Suggestion.png"
import ThreadForm from "./ThreadForm"
import { handleRequestError } from "../../../context/ThreadContext"
import Button from "../../Button/Button"
import Input from "../../Input/Input"
import "./Thread.css"
import "../../../assets/texts.css"
import Footer from "../../Footer/Footer"
import { MdCancel } from "react-icons/md"
import { FaSearch } from "react-icons/fa"

export const ThreadList = () => {
    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const [threads, setThreads] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [showThreadForm, setShowThreadForm] = useState(false)
    const [search, setSearch] = useState("")
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                setLoading(true)
                const response = await getThreads(page, 10, search)
                setThreads(response.threads)
                setPageCount(response.totalPages)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }
        fetchThreads()
    }, [page, search])

    const {
        loading: formLoading,
        error: formError,
        execute: createThreadFn,
    } = useAsyncFn(createThread)

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>{error}</h1>
    if (!threads) return null

    function onThreadCreate({ title, description, thread_type }) {
        return createThreadFn({ title, description, thread_type })
            .then((response) => {
                navigate(`/threads/${response.thread_id}`)
            })
            .catch(handleRequestError)
    }

    const checkThreadType = (type) => {
        switch (type) {
            case "chat":
                return Chat
            case "bug":
                return Bug
            case "support":
                return Support
            case "suggestion":
                return Suggestion

            default:
                return Chat
        }
    }

    const handleSearch = () => {
        setSearch(searchInput)
    }

    return (
        <React.Fragment>
            <div className="thread-list-main-div">
                <div className="thread-list-search-div">
                    <Input
                        variant="search"
                        placeholder="Enter other dimensions 🌌"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        style={{ borderRadius: "10px 0 0 10px" }}
                    />
                    <Button
                        variant="ordinary"
                        onClick={handleSearch}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            borderRadius: "0 10px 10px 0",
                        }}
                    >
                        <FaSearch size={20} />
                    </Button>
                </div>
                {!showThreadForm ? (
                    <Button
                        variant="ordinary"
                        onClick={() => setShowThreadForm(true)}
                        style={{ marginTop: 20, marginBottom:20 }}
                    >
                        ADD A THREAD
                    </Button>
                ) : (
                    <React.Fragment>
                        <MdCancel
                            size={30}
                            color="#DB4947"
                            onClick={() => setShowThreadForm(false)}
                            style={{ cursor: "pointer", marginTop: 20 }}
                        />
                        <br />
                    </React.Fragment>
                )}
                {showThreadForm ? (
                    <div style={{marginBottom:20}}>
                        <ThreadForm
                            loading={formLoading}
                            error={formError}
                            handleSubmit={onThreadCreate}
                        />
                    </div>
                ) : null}
                {threads.map((thread) => (
                    <div
                        className="thread-list-container"
                        key={thread.thread_id}
                    >
                        <img
                            className="thread-container-image"
                            src={checkThreadType(thread.thread_type)}
                            alt="thread-icon"
                        />
                        <NavLink
                            style={{ textDecoration: "none", color: "white" }}
                            to={`/threads/${thread.thread_id}`}
                        >
                            <br />
                            <span
                                className="medium-heading"
                                style={{ wordBreak: "break-word" }}
                            >
                                {thread.title}
                            </span>
                        </NavLink>
                        <p className="small-text">
                            {thread.comment_count} messages
                        </p>
                    </div>
                ))}
                <div className="thread-pagination-buttons">
                    <Button
                        variant="ordinary"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        {"<<"}
                    </Button>
                    <span className="thread-paginaton-page-number">{page}</span>
                    <Button
                        variant="ordinary"
                        onClick={() =>
                            setPage((prev) => Math.min(prev + 1, pageCount))
                        }
                        disabled={page === pageCount}
                    >
                        {">>"}
                    </Button>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}
