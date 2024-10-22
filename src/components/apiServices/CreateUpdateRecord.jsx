import { JWT_HEADER, JSON_HEADER } from "../../config/authConfig";
import apiUrlConfig from "../../config/apiUrlConfig";

async function createUpdateRecord(token, endpoint, data, method) {
    const { apiUrl } = apiUrlConfig
    const config = {
        method,
        mode: 'cors',
        headers: token
            ? Object.assign({}, JWT_HEADER(token), JSON_HEADER)
            : Object.assign({}, JSON_HEADER),
        cache: 'default',
        body: data ? JSON.stringify(data) : null,
    };
    // endpoint = { account_name, project_name, buh_name, dd_name, page, page_size };

    // const url = `${apiUrl}platform_data/summary?account_name=${account_name}&project_name=${project_name}&buh_name=${buh_name}&dd_name=${dd_name}&page=${page}&page_size=${page_size}`
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

