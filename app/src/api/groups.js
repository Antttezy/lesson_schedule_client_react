import axios from "axios";

const applicationUrl = process.env.REACT_APP_APPLICATION_URL

export async function getGroups(accessToken) {
    try {
        let response = await axios.get(`${applicationUrl}/groups`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })

        response = response.data

        if (!response.isOk) {
            throw response
        } else {
            return response
        }

    } catch (error) {
        throw error
    }
}

export async function getGroupInfo(accessToken, id) {
    try {
        let response = await axios.get(`${applicationUrl}/groups/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        if (!response.data.isOk) {
            throw response
        }

        return response.data

    } catch (e) {
        throw e
    }
}

export async function createGroup(accessToken, group) {
    try {
        let response = await axios.post(`${applicationUrl}/groups/create`, group, {
            headers : {
                authorization: `Bearer ${accessToken}`
            }
        })

        if (!response.data.isOk) {
            throw response
        }

        return response

    } catch(err) {

        if (err.data) {
            throw err
        }

        throw {
            unauthorized: true
        }
    }
}