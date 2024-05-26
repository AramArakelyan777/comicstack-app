import { makeRequest } from "./makeRequest"

export function setAStatus({ status, comic_id }) {
    return makeRequest(`status/${comic_id}`, {
        method: "POST",
        data: { status },
    }).catch((error) => {
        throw error
    })
}

export function getAStatus({ comic_id }) {
    return makeRequest(`status/${comic_id}`).catch((error) => {
        throw error
    })
}

export function deleteAStatus({ user_id, comic_id }) {
    return makeRequest(`/status/${user_id}/${comic_id}`, {
        method: "DELETE",
    }).catch((error) => {
        throw error
    })
}
