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

export const addNewProject = async (
    apiUrl,
    accountName,
    projectName,
    buhName,
    ddName,
    domains,
    appClass,
    environment,
    cloudTech,
    containerization,
    serverless,
    dataEngineering,
    mobileComputing,
    edgeComputing,
    enterprisePlatforms,
    cmsApp,
    headlessCms = "string",
    relationalDatabases = "string",
    nosqlDatabases = "string",
    inMemoryDatabases = "string",
    systemMonitoringTools = "string",
    architectureMethodology = "string",
    designPatterns = "string",
    ides = "string",
    versionControlSystem = "string",
    frontendDevelopment = "string",
    backendFrameworks = "string",
    mobileDevelopment = "string",
    fullStackDevelopment = "string",
    programmingLanguages = "string",
    apiTechnologies = "string",
    integrationTools = "string",
    analyticsReporting = "string",
    developmentMaturityAssessment = "string",
    softwareCompositionAnalysis = "string",
    testCoverage = "string",
    productivityMeasurement = "string",
    tracing = "string",
    unitTestingFrameworks = "string",
    integrationTesting = "string",
    loadTestingTools = "string",
    apiTestingTools = "string",
    behavioralTestingTools = "string",
    manualTestingTools = "string",
    securityTestingTools = "string",
    devopsInfrastructure = "string",
    deploymentMethodologies = "string",
    ciCdTools = "string",
    alertingTools = "string",
    identityManagement = "string",
    codeQualityTools = "string",
    dependencyAnalysis = "string",
    iPaaS = "string",
    aiTechnologies = "string",
    cybersecurityTechnologies = "string",
    userFeedbackTools = "string",
    lowCodeEnvironments = "string"
) => {
    const url = `${apiUrl}/platform_data/create_project/`;
    const data = {
        submitter_email_id: "prasanna.s@accionlabs.com",
        submitting_time: "2024-10-28T07:10:21.912Z",
        account_name: accountName,
        project_name: projectName,
        buh_name: buhName,
        dd_name: ddName,
        domains,
        application_class: appClass,
        environment,
        cloud_technologies: cloudTech,
        containerization_and_orchestration: containerization,
        serverless_computing: serverless,
        data_engineering_etl_mdm_tools: dataEngineering,
        mobile_cloud_computing: mobileComputing,
        edge_computing: edgeComputing,
        enterprise_platforms: enterprisePlatforms,
        cms_applications: cmsApp,
        headless_cms: headlessCms,
        relational_databases_sql: relationalDatabases,
        nosql_databases: nosqlDatabases,
        in_memory_databases: inMemoryDatabases,
        system_monitoring_performance_tools: systemMonitoringTools,
        architecture_methodology: architectureMethodology,
        design_patterns: designPatterns,
        ides,
        version_control_system: versionControlSystem,
        frontend_development: frontendDevelopment,
        server_side_back_end_frameworks: backendFrameworks,
        mobile_development: mobileDevelopment,
        full_stack_development: fullStackDevelopment,
        programming_languages: programmingLanguages,
        api_development_data_access_technologies: apiTechnologies,
        application_integration_tools: integrationTools,
        analytics_reporting: analyticsReporting,
        development_maturity_assessment: developmentMaturityAssessment,
        software_composition_analysis: softwareCompositionAnalysis,
        test_coverage: testCoverage,
        productivity_measurement: productivityMeasurement,
        tracing,
        unit_testing_frameworks: unitTestingFrameworks,
        functional_integration_testing: integrationTesting,
        performance_load_testing_tools: loadTestingTools,
        api_testing_tools: apiTestingTools,
        behavioral_testing_tools: behavioralTestingTools,
        manual_testing_management_tools: manualTestingTools,
        application_security_testing_tools: securityTestingTools,
        devops_infrastructure_as_code: devopsInfrastructure,
        deployment_methodologies: deploymentMethodologies,
        ci_cd_tools: ciCdTools,
        alerting_tools: alertingTools,
        directory_services_identity_management: identityManagement,
        code_quality_tools: codeQualityTools,
        dependency_analysis: dependencyAnalysis,
        iPaaS,
        ai_machine_learning_technologies: aiTechnologies,
        cybersecurity_technologies: cybersecurityTechnologies,
        user_feedback_analytics_tools: userFeedbackTools,
        low_code_environments: lowCodeEnvironments
    };

    try {
        const response = await createUpdateRecord(null, url, data);
        console.log(response,"Resp")
        return response;
    } catch (error) {
        console.error("Error adding new project:", error);
    }
};
