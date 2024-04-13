import { Route, Routes } from "react-router-dom"
import "./App.css"
import FAQ from "./components/pages/FAQ/FAQ"
import Genres from "./components/pages/Genres/Genres"
import Forum from "./components/pages/Forum/Forum"
import HomePage from "./components/pages/HomePage/HomePage"
import Navbar from "./components/Navbar/Navbar"
import NotFound from "./components/Navbar/NotFound"
import Login from "./components/pages/User/Login"
import Register from "./components/pages/User/Register"

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/genres" element={<Genres />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <Navbar />
        </div>
    )
}

export default App
