import { bakeryAPI } from "../Settings.js"

export const saveContact = (contactObject) => {
    return fetch(`${bakeryAPI.baseURL}/contacts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactObject)
    })
}