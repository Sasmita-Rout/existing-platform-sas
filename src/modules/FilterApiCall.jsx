import { fetchRecords } from "../components/apiServices";

export const fetchFilterData = async (apiUrl, typeOfDropdown, setLoader, setAccountName, setDdName, setProjectName, setBuhName) => {
    setLoader(true);

    try {
        const promises = typeOfDropdown.map(async (filterName) => {
            const url = `${apiUrl}/platform_data/dropdown?dropdown_type=${filterName}`;

            const response = await fetchRecords(url, false, false, false);

            return { filterName, response: response !== null ? response : "" };
        });

        const results = await Promise.all(promises);

        // Process each result and set the corresponding state
        results.forEach(({ filterName, response }) => {

            if (filterName === "account_name") {
                setAccountName(response.values);
            } else if (filterName === "project_name") {
                setProjectName(response.values);
            } else if (filterName === "buh_name") {
                setBuhName(response.values);
            } else if (filterName === "dd_name") {
                setDdName(response.values);
            }
        });

        setLoader(false);
    } catch (error) {
        console.error("Error fetching data:", error);
        setLoader(false);
    }
};


export const fetchColumnData = async (apiUrl, setTechnologyData, setLoader) => {
    try {
        const url = `${apiUrl}/platform_data/columns`;
        const result = await fetchRecords(url, false, false, false);
        const technologyData = result !== null && result["columns"] ?
            setTechnologyData(result["columns"])
            : null
        setLoader(false);
        console.log(technologyData, "DATA")
        return technologyData;
    } catch (error) {
        console.error("Error fetching data:", error);
        setLoader(false);
    }
};

export const columnValues = async (apiUrl, value) => {
    const url = `${apiUrl}/platform_data/column_dropdown?dropdown_type=${value}`;
    const response = await fetchRecords(
        url,
        false,
        false,
        false
    );
    return (response && response["values"] ? response["values"] : [])
}