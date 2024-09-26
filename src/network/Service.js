import * as Constants from "./Constants";

export const getPlatformData = async () => {
  const response = await fetch(`${Constants.getPlatformDataUrl}`);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return response.json();
};
