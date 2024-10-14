import { JWT_HEADER, JSON_HEADER } from "../../config/authConfig";
import apiUrlConfig from "../../config/apiUrlConfig";

async function fetchRecords(endpoint, token, fetchAsTxt, fetchAsBlob) {
  const { apiUrl } = apiUrlConfig
  const config = {
    method: 'GET',
    mode: 'cors',
    headers: token
      ? Object.assign({}, JWT_HEADER(token), JSON_HEADER)
      : Object.assign({}, JSON_HEADER),
    cache: 'default',
  };
  if (!token) {
    delete config["headers"]
  }
  const url = `${apiUrl}/platform_data/dropdown?dropdown_type=${endpoint}`

  try {
    const response = await fetch(url, config);

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
    throw error;
  }
}

export default fetchRecords
