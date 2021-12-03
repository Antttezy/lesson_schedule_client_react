import axios from "axios";

const applicationUrl = process.env.REACT_APP_APPLICATION_URL

export async function getMyLessons(accessToken, beginTime, endTime) {
    try {
        let request = `${applicationUrl}/lessons/my`
        console.log({
            beginTime,
            endTime
        })
        if (beginTime > 0 && endTime > 0) {
            request = `${request}?timestampStart=${beginTime}&timestampEnd=${endTime}`
        }

        let response = await axios.get(request, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })

        response = response.data

        if (!response.isOk) {
            throw response.errors
        }
        else {
            return response
        }

    } catch (error) {
        throw error;
    }
}