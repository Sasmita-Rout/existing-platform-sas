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
        if (result && result["columns"]) {
            const data = result["columns"].sort();
            setTechnologyData(data);
            return data;
        } else {
            return null;
        }
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
    return (response && response["values"] ? response["values"].sort() : [])
}

export const addNewProject = async (
    pmoUser,
    accountName,
    projectName,
    buhName,
    ddName,
    domainValue, applicationValue, allSelectedValues, allSelectedValuesFour, allSelectedValuesFive, allSelectedValuesSix

) => {
    const date = new Date();

    const formattedDateTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T` +
        `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    const url = `platform_data/create_project/`;
    const data = {
        submitter_email_id: pmoUser["email"],
        submitting_time: formattedDateTime,
        account_name: accountName || "",
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
