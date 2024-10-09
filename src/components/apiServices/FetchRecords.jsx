import { JWT_HEADER, JSON_HEADER } from "../../config/authConfig";

async function fetchRecords(endpoint, token, removeHeader, fetchAsTxt, fetchAsBlob) {
    const config = {
      method: 'GET',
      mode: 'cors',
      headers: token
        ? Object.assign({}, JWT_HEADER(token), JSON_HEADER)
        : Object.assign({}, JSON_HEADER),
      cache: 'default',
    };
  
    // Remove headers if no token is provided and removeHeader is true
    if (!token && removeHeader) {
      delete config.headers;
    }
  
    try {
      const response = await fetch(endpoint, config);
  
      // Check if the response is OK (status 200–299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Handle the response based on the specified format
      if (fetchAsBlob) {
        return await response.blob();
      } else if (fetchAsTxt) {
        return await response.text();
      } else {
        return await response.json();
      }
    } catch (error) {
      console.error('Error:', error);
      throw error; // Propagate the error to be handled by the calling code
    }
  }

  export default fetchRecords
  