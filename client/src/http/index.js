import axios from "axios"

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_SERVER_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("bearer")}`
    return config
})

$api.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest._isRetry = true
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/refresh`,
                    {
                        withCredentials: true,
                    }
                )
                localStorage.setItem("bearer", response.data.accessToken)
                return $api.request(originalRequest)
            } catch (e) {
                console.log("Not Authorized", e)
            }
        }
        throw error
    }
)

export default $api
