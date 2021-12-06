import axios from "axios"

const applicationUrl = process.env.REACT_APP_APPLICATION_URL

export async function listWorkloads(accessToken, page) {
    let request = `${applicationUrl}/workloads`

    if (page) {
        request += `/page/${page}`
    }

    try {

        let response = await axios.get(request, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })

        if (!response.data.isOk) {
            throw response
        }

        return response.data

    } catch (err) {
        throw err
    }
}

export async function createWorkload(accessToken, workload) {
    try {
        let response = await axios.post(`${applicationUrl}/workloads/create`, workload, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })

        if (!response.data.isOk) {
            throw response.data
        }

        return response.data

    } catch (e) {
        throw e
    }
}