import { makeRequest } from "./makeRequest"

export function getAUser() {
    return makeRequest("/user")
}
