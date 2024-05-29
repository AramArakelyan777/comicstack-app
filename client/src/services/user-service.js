import { makeRequest } from "./makeRequest"

export function getAUser() {
    return makeRequest("/user")
}

export const changeUsername = (newUsername) => {
    return makeRequest("/user/change-username", {
        method: "POST",
        data: { newUsername },
    })
}

export const changePassword = (currentPassword, newPassword) => {
    return makeRequest("/user/change-password", {
        method: "POST",
        data: { currentPassword, newPassword },
    })
}

export const uploadAvatar = (formData) => {
    return makeRequest("/user/profile-picture", {
        method: "POST",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export const deleteAvatar = () => {
    return makeRequest("/user/profile-picture", {
        method: "DELETE",
    })
}
