import { makeRequest } from "./makeRequest"

export function getComics() {
    return makeRequest("/comics")
}

export function getAComics(comic_id) {
    return makeRequest(`/comics/${comic_id}`)
}

export function getTopComics() {
    return makeRequest("/top-comics")
}

export function getPopularComics() {
    return makeRequest("/popular-comics")
}

export function getComicPages(comic_id) {
    return makeRequest(`/comics/${comic_id}/pages`)
}
