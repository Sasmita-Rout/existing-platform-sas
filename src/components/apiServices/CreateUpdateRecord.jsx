import { JWT_HEADER, JSON_HEADER } from "../../config/authConfig";
import apiUrlConfig from "../../config/apiUrlConfig";

async function createUpdateRecord(token, endpoint, data, method) {
    const { apiUrl } = apiUrlConfig
    const config = {
        method,
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        cache: 'default',
        body: data ? JSON.stringify(data) : null,
    };
    if (method === "GET") {
        delete config["body"]
    }
    const url = `${apiUrl}/${endpoint}`

    try {
        const response = await fetch(url, config);

        // Check if the response is OK (status 200–299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Propagate the error to be handled elsewhere if needed
    }
}

export default createUpdateRecord;

