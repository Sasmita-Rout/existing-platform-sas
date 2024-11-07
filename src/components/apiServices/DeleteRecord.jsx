import { JWT_HEADER, JSON_HEADER } from "../../config/authConfig";
import { isEmpty, isObject } from 'lodash';

async function deleteRecord(token, endpoint, bodyData) {
    const config = {
        method: 'DELETE',
        mode: 'cors',
        headers: token
            ? Object.assign({}, JWT_HEADER(token), JSON_HEADER)
            : Object.assign({}, JSON_HEADER),
        cache: 'default',
    };

    // If bodyData is provided and is a non-empty object, include it in the request
    if (bodyData && isObject(bodyData) && !isEmpty(bodyData)) {
        config['body'] = JSON.stringify(bodyData);
    }

    try {
        const response = await fetch(endpoint, config);

        // Check if the response is OK (status 200–299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Propagate the error to be handled by the calling code
    }
}

export default deleteRecord;
