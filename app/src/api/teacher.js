import axios from "axios";

const applicationUrl = process.env.REACT_APP_APPLICATION_URL

export async function accountData(accessToken) {
    let response

    try {
        response = await axios.get(`${applicationUrl}/teachers/me`, {
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