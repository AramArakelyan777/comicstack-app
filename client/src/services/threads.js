import { makeRequest } from "./makeRequest"

export function getThreads(page = 1, limit = 10, search = "") {
    return makeRequest("/threads", {
        params: { page, limit, search },
    })
}

export function getAThread(thread_id) {
    return makeRequest(`/threads/${thread_id}`)
}

export function createThread({ title, description, thread_type }) {
    return makeRequest(`/threads`, {
        method: "POST",
        data: { title, description, thread_type },
    }).catch((error) => {
        throw error
    })
}

export function updateThread({ thread_id, title, description, thread_type }) {
    return makeRequest(`/threads/${thread_id}`, {
        method: "PUT",
        data: { title, description, thread_type },
    }).catch((error) => {
        throw error
    })
}

export function deleteThread({ thread_id }) {
    return makeRequest(`/threads/${thread_id}`, {
        method: "DELETE",
    }).catch((error) => {
        throw error
    })
}
