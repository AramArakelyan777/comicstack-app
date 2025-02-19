import axios from "axios"
import { makeAutoObservable } from "mobx"
import AuthService from "../services/AuthService"

export default class Store {
    user = {}
    isAuth = false
    isLoading = false
    error = ""

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setUser(user) {
        this.user = user
    }

    setLoading(bool) {
        this.isLoading = bool
    }

    setError(error) {
        this.error = error
    }

    async login(username, email, password) {
        this.setLoading(true)
        try {
            const response = await AuthService.login(username, email, password)
            localStorage.setItem("bearer", response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            this.error = ""
        } catch (errorMessage) {
            this.error = errorMessage || "Error"
        } finally {
            this.setLoading(false)
        }
    }

    async registration(username, email, password) {
        this.setLoading(true)
        try {
            const response = await AuthService.registration(
                username,
                email,
                password
            )
            localStorage.setItem("bearer", response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            this.error = ""
        } catch (errorMessage) {
            this.error = errorMessage || "Error"
        } finally {
            this.setLoading(false)
        }
    }

    async logout() {
        this.setLoading(true)
        try {
            await AuthService.logout()
            localStorage.removeItem("bearer")
            this.setAuth(false)
            this.setUser({})
            this.error = ""
        } catch (errorMessage) {
            this.error = errorMessage || "Error"
        } finally {
            this.setLoading(false)
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/refresh`,
                {
                    withCredentials: true,
                }
            )
            localStorage.setItem("bearer", response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log("Error while checking auth", e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }
}
