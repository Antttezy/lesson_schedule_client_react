import axios from "axios"

const applicationUrl = process.env.REACT_APP_APPLICATION_URL

export async function accountData(accessToken) {

    try {
        let response = await axios.get(`${applicationUrl}/students/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        response = response.data

        if (!response.isOk) {
            throw response.errors
        }
        else {
            return response
        }
    } catch (error) {
        throw error
    }
}

export async function listStudents(accessToken, page, searchPattern) {
    let request = `${applicationUrl}/students?`

    if (page) {
        request += `page=${page}&`
    }

    if (searchPattern) {
        request += `searchPattern=${searchPattern}`
    }

    try {
        let response = await axios.get(request, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        response = response.data

        if (!response.isOk) {
            throw response.errors
        } else {
            return response
        }

    } catch (error) {
        throw error
    }
}