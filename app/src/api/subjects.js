import axios from "axios"

const applicationUrl = process.env.REACT_APP_APPLICATION_URL

export async function listSubjects(accessToken) {
    try {
        let response = await axios.get(`${applicationUrl}/subjects`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })

        if (!response.data.isOk) {
            throw response.data
        }

        return response.data

    } catch (err) {
        throw err
    }
}

export async function createSubject(accessToken, subject) {
    try {
        let response = await axios.post(`${applicationUrl}/subjects/create`, subject, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })

        if (!response.data.isOk) {
            throw response.data
        }

        return response.data

    } catch (err) {
        throw err
    }
}
