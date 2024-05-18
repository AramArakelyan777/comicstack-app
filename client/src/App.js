import React from "react"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import FAQ from "./components/pages/FAQ/FAQ"
import Genres from "./components/pages/Genres/Genres"
import HomePage from "./components/pages/HomePage/HomePage"
import Navbar from "./components/Navbar/Navbar"
import NotFound from "./components/Navbar/NotFound"
import Login from "./components/pages/User/Login"
import Register from "./components/pages/User/Register"
import User from "./components/pages/User/User"
import Comics from "./components/pages/Comics/Comics"
import Thread from "./components/pages/Forum/Thread"
import { ComicsList } from "./components/pages/Comics/ComicsList"
import { ThreadList } from "./components/pages/Forum/ThreadList"
import ComicsContextProvider from "./context/ComicsContext"
import ThreadContextProvider from "./context/ThreadContext"
import { observer } from "mobx-react-lite"

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/genres" element={<Genres />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user" element={<User />} />
                <Route path="/comics" element={<ComicsList />} />
                <Route
                    path="/comics/:comic_id"
                    element={
                        <ComicsContextProvider>
                            <Comics />
                        </ComicsContextProvider>
                    }
                />
                <Route path="/threads" element={<ThreadList />} />
                <Route
                    path="/threads/:thread_id"
                    element={
                        <ThreadContextProvider>
                            <Thread />
                        </ThreadContextProvider>
                    }
                />
            </Routes>
            <Navbar />
        </div>
    )
}

export default observer(App)
