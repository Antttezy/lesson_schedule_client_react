import axios from "axios"

const applicationUrl = process.env.REACT_APP_APPLICATION_URL

export async function listWorkloads(accessToken, page) {
    let request = `${applicationUrl}/workloads`

    if (page) {
        request += `?page=${page}`
    }

    try {

        let response = await axios.get(request, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })

        console.log(response.data)

        if (!response.data.isOk) {
            throw response
        }

        return response.data

    } catch (err) {
        throw err
    }
}