import { makeRequest } from "./makeRequest"

export function rateAComics({ rating, comic_id }) {
    return makeRequest(`rating/${comic_id}`, {
        method: "POST",
        data: { rating },
    }).catch((error) => {
        throw error
    })
}

export function getARating({ comic_id }) {
    return makeRequest(`rating/${comic_id}`).catch((error) => {
        throw error
    })
}

export function deleteARating({ user_id, comic_id }) {
    return makeRequest(`/rating/${user_id}/${comic_id}`, {
        method: "DELETE",
    }).catch((error) => {
        throw error
    })
}
