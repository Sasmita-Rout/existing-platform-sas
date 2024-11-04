import { fetchRecords, createUpdateRecord } from "../components/apiServices";

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
        const data = result !== null && result["columns"] ?
            setTechnologyData(result["columns"])
            : null
        setLoader(false);
        return data;
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

export const addNewProject = async (
    apiUrl,
    accountName,
    projectName,
    buhName,
    ddName,
    domainValue, applicationValue, allSelectedValues, allSelectedValuesFour, allSelectedValuesFive, allSelectedValuesSix

) => {
    const url = `${apiUrl}/platform_data/create_project/`;
    const data = {
        submitter_email_id: "example@example.com", // Consider passing this as a parameter for flexibility
        submitting_time: "2024-10-15T12:34:56", // Get the current timestamp in ISO format
        account_name: accountName || "", // Default to an empty string if not provided
        project_name: projectName || "",
        buh_name: buhName || "",
        dd_name: ddName || "",
        domains: [domainValue] || [], // Ensure it's an array
        application_class: [applicationValue] || [],
        environment: [allSelectedValues.environmentInput].filter(Boolean), // Filter out falsy values
        cloud_technologies: [allSelectedValues.cloudTechnologies].filter(Boolean),
        data_engineering_etl_mdm_tools: [allSelectedValues.etlAndMdmTools].filter(Boolean),
        mobile_cloud_computing: [allSelectedValues.mobileCloudComputing].filter(Boolean),
        edge_computing: [allSelectedValues.edgeComputing].filter(Boolean),
        enterprise_platforms: [allSelectedValues.enterprisePlatforms].filter(Boolean),
        cms_applications: [allSelectedValues.cmsApp].filter(Boolean),
        relational_databases_sql: [allSelectedValues.relationalDb].filter(Boolean),
        nosql_databases: [allSelectedValues.nosqlDb].filter(Boolean),
        in_memory_databases: [allSelectedValues.inMemoryDbs].filter(Boolean),
        system_monitoring_performance_tools: [allSelectedValues.systemMonitoringAndPerformance].filter(Boolean),
        ides: [allSelectedValues.ides].filter(Boolean),
        version_control_system_vcs: [allSelectedValues.vcs].filter(Boolean),
        frontend_development: [allSelectedValues.frontendDevelopment].filter(Boolean),
        server_side_backend_frameworks: [allSelectedValues.serverSide].filter(Boolean),
        mobile_development: [allSelectedValues.mobileDevelopment].filter(Boolean),
        full_stack_development: [allSelectedValues.fullStack].filter(Boolean),
        programming_languages: [allSelectedValues.programmingLanguages].filter(Boolean),
        api_development_data_access_technologies: [allSelectedValues.apiDevelopment].filter(Boolean),
        application_integration_tools: [allSelectedValues.applicationIntegrationTools].filter(Boolean),
        test_coverage: [allSelectedValues.testCoverage].filter(Boolean),
        productivity_measurement: [allSelectedValues.productivityMeasurement].filter(Boolean),
        tracing: [allSelectedValues.tracing].filter(Boolean),
        unit_testing_frameworks: [allSelectedValues.unitTestingFrameworks].filter(Boolean),
        functional_integration_testing: [allSelectedValuesFour.FunctionalandIntegration].filter(Boolean),
        performance_load_testing_tools: [allSelectedValuesFour.PerformanceandLoadTest].filter(Boolean),
        manual_testing_management_tools: [allSelectedValuesFour.SelectManualTestingMgmt].filter(Boolean),
        application_security_testing_tools: [allSelectedValuesFour.ApplicationSecurityTesting].filter(Boolean),
        devops_infrastructure_as_code_iac: [allSelectedValuesFour.devopsInfrastructureAsCodeIac].filter(Boolean),
        directory_services_identity_management: [allSelectedValues.directoryServices].filter(Boolean),
        code_quality_tools: [allSelectedValues.codeQualityTools].filter(Boolean),
        ipaas_integration_platform_as_a_service: [allSelectedValues.iPaas].filter(Boolean),
        ai_machine_learning_technologies: [allSelectedValuesSix.aiAndMachineLearningTechnologies].filter(Boolean),
        user_feedback_analytics_tools: [allSelectedValuesFive.SelectUserFeedbackandAnalytics].filter(Boolean),
        low_code_environments: [allSelectedValues.lowCodeEnv].filter(Boolean),
        status: "Active" // Set the status to Active by default
    };

    try {
        const response = await createUpdateRecord(null, url, data, "POST");
        return response;
    } catch (error) {
        console.error("Error adding new project:", error);
    }
};
