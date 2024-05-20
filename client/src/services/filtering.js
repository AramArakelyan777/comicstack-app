import { makeRequest } from "./makeRequest"

export function getComicsByGenres(genre_id) {
    return makeRequest(`/comics/genre/${genre_id}`)
}

export function getComicsByTags(tag_id) {
    return makeRequest(`/comics/tag/${tag_id}`)
}
