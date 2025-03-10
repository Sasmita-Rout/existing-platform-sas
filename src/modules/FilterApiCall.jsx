import { fetchRecords, createUpdateRecord } from "../components/apiServices";

export const fetchFilterData = async (apiUrl, typeOfDropdown, setValue) => {
    // setLoader(true);

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
                setValue("accountName", response.values);
            } else if (filterName === "project_name") {
                setValue("projectName", response.values);
            } else if (filterName === "buh_name") {
                setValue("buhName", response.values);
            } else if (filterName === "dd_name") {
                setValue("ddName", response.values);
            }
        });

        // setLoader(false);
    } catch (error) {
        console.error("Error fetching data:", error);
        // setLoader(false);
    }
};

export const fetchColumnData = async (apiUrl, setValue) => {
    try {
        const url = `${apiUrl}/platform_data/columns`;
        const result = await fetchRecords(url, false, false, false);
        if (result && result["columns"]) {
            const data = result["columns"].sort();
            setValue("technologyData", data);
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        // setValue("loader",false);
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
    allSelectedValuesTwo, allSelectedValues, allSelectedValuesFour, allSelectedValuesFive, allSelectedValuesSix, checked

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
        domains: [allSelectedValuesTwo.domainInput] || [], // Ensure it's an array
        application_class: [allSelectedValuesTwo.applicationInput] || [],
        analytics_reporting: [allSelectedValuesFive.AnalyticsReporting].filter(Boolean),
        environment: [allSelectedValues.environmentInput].filter(Boolean), // Filter out falsy values
        cloud_technologies: [allSelectedValues.cloudTechnologies].filter(Boolean),
        cybersecurity_technologies: [allSelectedValues.cybersecurityTechnologies].filter(Boolean),
        containerization_orchestration: [allSelectedValues.containerizationOrchestration].filter(Boolean),
        serverless_computing: [allSelectedValues.serverlessComputing].filter(Boolean),
        headless_cms: [allSelectedValues.headlessCms].filter(Boolean),
        architecture_methodology: [allSelectedValues.architectureMethodology].filter(Boolean),
        design_patterns: [allSelectedValues.designPatterns].filter(Boolean),
        development_maturity_assessment: [allSelectedValues.developmentMaturityAssessment].filter(Boolean),
        software_composition_analysis: [allSelectedValues.softwareCompositionAnalysis].filter(Boolean),
        api_testing_tools: [allSelectedValues.apiTestingTools].filter(Boolean),
        behavioral_testing_tools: [allSelectedValues.behavioralTestingTools].filter(Boolean),
        deployment_methodologies: [allSelectedValues.deploymentMethodologies].filter(Boolean),
        cicd_tools: [allSelectedValues.cicdTools].filter(Boolean),
        alerting_tools: [allSelectedValues.alertingTools].filter(Boolean),
        dependency_analysis: [allSelectedValues.dependencyAnalysis].filter(Boolean),
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
        status: checked === true ? "Active" : "Inactive" // Set the status to Active by default
    };

    try {
        const response = await createUpdateRecord(null, url, data, "POST");
        return response;
    } catch (error) {
        console.error("Error adding new project:", error);
    }
};

export const updateProject = async (
    id,
    pmoUser,
    accountName,
    projectName,
    buhName,
    ddName,
    updatedValuesTwo, updatedValuesFour, updatedValuesThree, updatedValuesFive, updatedValuesSix, checked

) => {
    const date = new Date();
    const formattedDateTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T` +
        `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    const url = `update_project/${id}`;
    const data = {
        submitter_email_id: pmoUser["email"],
        submitting_time: formattedDateTime,
        account_name: accountName || "",
        project_name: projectName || "",
        buh_name: buhName || "",
        dd_name: ddName || "",
        domains: [updatedValuesTwo.domainInput ? updatedValuesTwo.domainInput : ""] || "", // Ensure it's an array
        application_class: [updatedValuesTwo.applicationInput ? updatedValuesTwo.applicationInput : ""] || "", // Ensure it's an array
        analytics_reporting: [updatedValuesFive.AnalyticsReporting].filter(Boolean),
        environment: [updatedValuesThree.environmentInput].filter(Boolean), // Filter out falsy values
        cloud_technologies: [updatedValuesThree.cloudTechnologies].filter(Boolean),
        cybersecurity_technologies: [updatedValuesThree.cybersecurityTechnologies].filter(Boolean),
        containerization_orchestration: [updatedValuesThree.containerizationOrchestration].filter(Boolean),
        serverless_computing: [updatedValuesThree.serverlessComputing].filter(Boolean),
        headless_cms: [updatedValuesThree.headlessCms].filter(Boolean),
        architecture_methodology: [updatedValuesThree.architectureMethodology].filter(Boolean),
        design_patterns: [updatedValuesThree.designPatterns].filter(Boolean),
        development_maturity_assessment: [updatedValuesThree.developmentMaturityAssessment].filter(Boolean),
        software_composition_analysis: [updatedValuesThree.softwareCompositionAnalysis].filter(Boolean),
        api_testing_tools: [updatedValuesThree.apiTestingTools].filter(Boolean),
        behavioral_testing_tools: [updatedValuesThree.behavioralTestingTools].filter(Boolean),
        deployment_methodologies: [updatedValuesThree.deploymentMethodologies].filter(Boolean),
        cicd_tools: [updatedValuesThree.cicdTools].filter(Boolean),
        alerting_tools: [updatedValuesThree.alertingTools].filter(Boolean),
        dependency_analysis: [updatedValuesThree.dependencyAnalysis].filter(Boolean),
        data_engineering_etl_mdm_tools: [updatedValuesThree.etlAndMdmTools].filter(Boolean),
        mobile_cloud_computing: [updatedValuesThree.mobileCloudComputing].filter(Boolean),
        edge_computing: [updatedValuesThree.edgeComputing].filter(Boolean),
        enterprise_platforms: [updatedValuesThree.enterprisePlatforms].filter(Boolean),
        cms_applications: [updatedValuesThree.cmsApp].filter(Boolean),
        relational_databases_sql: [updatedValuesThree.relationalDb].filter(Boolean),
        nosql_databases: [updatedValuesThree.nosqlDb].filter(Boolean),
        in_memory_databases: [updatedValuesThree.inMemoryDbs].filter(Boolean),
        system_monitoring_performance_tools: [updatedValuesThree.systemMonitoringAndPerformance].filter(Boolean),
        ides: [updatedValuesThree.ides].filter(Boolean),
        version_control_system_vcs: [updatedValuesThree.vcs].filter(Boolean),
        frontend_development: [updatedValuesThree.frontendDevelopment].filter(Boolean),
        server_side_backend_frameworks: [updatedValuesThree.serverSide].filter(Boolean),
        mobile_development: [updatedValuesThree.mobileDevelopment].filter(Boolean),
        full_stack_development: [updatedValuesThree.fullStack].filter(Boolean),
        programming_languages: [updatedValuesThree.programmingLanguages].filter(Boolean),
        api_development_data_access_technologies: [updatedValuesThree.apiDevelopment].filter(Boolean),
        application_integration_tools: [updatedValuesThree.applicationIntegrationTools].filter(Boolean),
        test_coverage: [updatedValuesThree.testCoverage].filter(Boolean),
        productivity_measurement: [updatedValuesThree.productivityMeasurement].filter(Boolean),
        tracing: [updatedValuesThree.tracing].filter(Boolean),
        unit_testing_frameworks: [updatedValuesThree.unitTestingFrameworks].filter(Boolean),
        functional_integration_testing: [updatedValuesFour.FunctionalandIntegration].filter(Boolean) || "",
        performance_load_testing_tools: [updatedValuesFour.PerformanceandLoadTest].filter(Boolean),
        manual_testing_management_tools: [updatedValuesFour.SelectManualTestingMgmt].filter(Boolean),
        application_security_testing_tools: [updatedValuesFour.ApplicationSecurityTesting].filter(Boolean),
        devops_infrastructure_as_code_iac: [updatedValuesFour.devopsInfrastructureAsCodeIac].filter(Boolean),
        directory_services_identity_management: [updatedValuesThree.directoryServices].filter(Boolean),
        code_quality_tools: [updatedValuesThree.codeQualityTools].filter(Boolean),
        ipaas_integration_platform_as_a_service: [updatedValuesThree.iPaas].filter(Boolean),
        ai_machine_learning_technologies: [updatedValuesSix.aiAndMachineLearningTechnologies].filter(Boolean),
        user_feedback_analytics_tools: [updatedValuesFive.SelectUserFeedbackandAnalytics].filter(Boolean),
        low_code_environments: [updatedValuesThree.lowCodeEnv].filter(Boolean),
        status: checked === true ? "Active" : "Inactive" // Set the status to Active by default
    };

    try {
        const response = await createUpdateRecord(null, url, data, "PUT");
        return response;
    } catch (error) {
        console.error("Error adding new project:", error);
    }
};

export const getUploadSowFileDetails = async (apiUrl) => {
    const url = `${apiUrl}/get_files`;

    try {
        const response = await fetchRecords(url, false, false, false)
        return response
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}

export const downloadSowFile = async (apiUrl, fileName) => {

    const url = `${apiUrl}/download/${fileName}`

    try {
        const response = await fetchRecords(url, false, false, true)
        return response
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}
