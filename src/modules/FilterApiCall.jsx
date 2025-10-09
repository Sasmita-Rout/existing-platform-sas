import { fetchRecords, createUpdateRecord } from "../components/apiServices";

export const fetchFilterData = async (apiUrl, typeOfDropdown, setValue) => {

    try {
        const promises = typeOfDropdown.map(async (filterName) => {
            const url = `${apiUrl}/platform_data/dropdown?dropdown_type=${filterName}`;

            const response = await fetchRecords(url, false, false, false);

            return { filterName, response: response !== null ? response : "" };
        });

        const results = await Promise.all(promises);

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

    } catch (error) {
        console.error("Error fetching data:", error);
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

export const fetchAllColumnDropdowns = async (apiUrl) => {
    const url = `${apiUrl}/platform_data/column_dropdown`;
    const response = await fetchRecords(
        url,
        false,
        false,
        false
    );
    return response || {};
}

export const addNewProject = async (
    pmoUser,
    accountName,
    projectName,
    buhName,
    ddName,
    allSelectedValuesTwo, allSelectedValues, allSelectedValuesFour, allSelectedValuesFive, allSelectedValuesSix, checked,
    sowFilePath

) => {
    console.log("\n" + "=".repeat(80));
    console.log("📡 addNewProject API FUNCTION");
    console.log("=".repeat(80));

    console.log("\n📥 Received Parameters:");
    console.log("  - pmoUser:", pmoUser?.mail);
    console.log("  - accountName:", accountName);
    console.log("  - projectName:", projectName);
    console.log("  - buhName:", buhName);
    console.log("  - ddName:", ddName);
    console.log("  - checked:", checked);
    console.log("  - sowFilePath:", sowFilePath);

    console.log("\n📦 Section Values Received:");
    console.log("  📘 allSelectedValuesTwo:", JSON.stringify(allSelectedValuesTwo, null, 2));
    console.log("  📗 allSelectedValues:", JSON.stringify(allSelectedValues, null, 2));
    console.log("  📙 allSelectedValuesFour:", JSON.stringify(allSelectedValuesFour, null, 2));
    console.log("  📕 allSelectedValuesFive:", JSON.stringify(allSelectedValuesFive, null, 2));
    console.log("  📓 allSelectedValuesSix:", JSON.stringify(allSelectedValuesSix, null, 2));

    const date = new Date();

    const formattedDateTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T` +
        `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    const url = `platform_data/create_project/`;
    // Helper to ensure array and filter
    const ensureArrayAndFilter = (value) => {
        if (!value) return [];
        if (Array.isArray(value)) {
            return [...new Set(value)].filter(Boolean);
        }
        // If it's a string, return as single-item array
        return [value].filter(Boolean);
    };

    // Convert to arrays first
    const domainsArray = ensureArrayAndFilter(allSelectedValuesTwo?.domainInput);
    const applicationClassArray = ensureArrayAndFilter(allSelectedValuesTwo?.applicationInput);

    // Backend expects comma-separated strings, not arrays
    const domainsString = domainsArray.join(', ');
    const applicationClassString = applicationClassArray.join(', ');

    console.log("\n🔍 Domain/Application Processing:");
    console.log("  - Raw domainInput:", allSelectedValuesTwo?.domainInput);
    console.log("  - Raw applicationInput:", allSelectedValuesTwo?.applicationInput);
    console.log("  - After ensureArrayAndFilter domains:", domainsArray);
    console.log("  - After ensureArrayAndFilter application_class:", applicationClassArray);
    console.log("  - Final domains (string):", domainsString);
    console.log("  - Final application_class (string):", applicationClassString);

    const data = {
        submitter_email_id: pmoUser["mail"],
        submitting_time: formattedDateTime,
        account_name: accountName || "",
        project_name: projectName || "",
        buh_name: buhName || "",
        dd_name: ddName || "",
        domains: domainsString,
        application_class: applicationClassString,
        analytics_reporting: ensureArrayAndFilter(allSelectedValuesFive.AnalyticsReporting),
        environment: ensureArrayAndFilter(allSelectedValues.environment || allSelectedValues.environmentInput),
        cloud_technologies: ensureArrayAndFilter(allSelectedValues.cloud_technologies || allSelectedValues.cloudTechnologies),
        cybersecurity_technologies: ensureArrayAndFilter(allSelectedValues.cybersecurity_technologies || allSelectedValues.cybersecurityTechnologies),
        containerization_orchestration: ensureArrayAndFilter(allSelectedValues.containerization_orchestration || allSelectedValues.containerizationOrchestration),
        serverless_computing: ensureArrayAndFilter(allSelectedValues.serverless_computing || allSelectedValues.serverlessComputing),
        headless_cms: ensureArrayAndFilter(allSelectedValues.headless_cms || allSelectedValues.headlessCms),
        architecture_methodology: ensureArrayAndFilter(allSelectedValues.architecture_methodology || allSelectedValues.architectureMethodology),
        design_patterns: ensureArrayAndFilter(allSelectedValues.design_patterns || allSelectedValues.designPatterns),
        development_maturity_assessment: ensureArrayAndFilter(allSelectedValues.development_maturity_assessment || allSelectedValues.developmentMaturityAssessment),
        software_composition_analysis: ensureArrayAndFilter(allSelectedValues.software_composition_analysis || allSelectedValues.softwareCompositionAnalysis),
        api_testing_tools: ensureArrayAndFilter(allSelectedValues.api_testing_tools || allSelectedValues.apiTestingTools),
        behavioral_testing_tools: ensureArrayAndFilter(allSelectedValues.behavioral_testing_tools || allSelectedValues.behavioralTestingTools),
        deployment_methodologies: ensureArrayAndFilter(allSelectedValues.deployment_methodologies || allSelectedValues.deploymentMethodologies),
        cicd_tools: ensureArrayAndFilter(allSelectedValues.cicd_tools || allSelectedValues.cicdTools),
        alerting_tools: ensureArrayAndFilter(allSelectedValues.alerting_tools || allSelectedValues.alertingTools),
        dependency_analysis: ensureArrayAndFilter(allSelectedValues.dependency_analysis || allSelectedValues.dependencyAnalysis),
        data_engineering_etl_mdm_tools: ensureArrayAndFilter(allSelectedValues.data_engineering_etl_mdm_tools || allSelectedValues.etlAndMdmTools),
        mobile_cloud_computing: ensureArrayAndFilter(allSelectedValues.mobile_cloud_computing || allSelectedValues.mobileCloudComputing),
        edge_computing: ensureArrayAndFilter(allSelectedValues.edge_computing || allSelectedValues.edgeComputing),
        enterprise_platforms: ensureArrayAndFilter(allSelectedValues.enterprise_platforms || allSelectedValues.enterprisePlatforms),
        cms_applications: ensureArrayAndFilter(allSelectedValues.cms_applications || allSelectedValues.cmsApp),
        relational_databases_sql: ensureArrayAndFilter(allSelectedValues.relational_databases_sql || allSelectedValues.relationalDb),
        nosql_databases: ensureArrayAndFilter(allSelectedValues.nosql_databases || allSelectedValues.nosqlDb),
        in_memory_databases: ensureArrayAndFilter(allSelectedValues.in_memory_databases || allSelectedValues.inMemoryDbs),
        system_monitoring_performance_tools: ensureArrayAndFilter(allSelectedValues.system_monitoring_performance_tools || allSelectedValues.systemMonitoringAndPerformance),
        ides: ensureArrayAndFilter(allSelectedValues.ides),
        version_control_system_vcs: ensureArrayAndFilter(allSelectedValues.version_control_system_vcs || allSelectedValues.vcs),
        frontend_development: ensureArrayAndFilter(allSelectedValues.frontend_development || allSelectedValues.frontendDevelopment),
        server_side_backend_frameworks: ensureArrayAndFilter(allSelectedValues.server_side_backend_frameworks || allSelectedValues.serverSide),
        mobile_development: ensureArrayAndFilter(allSelectedValues.mobile_development || allSelectedValues.mobileDevelopment),
        full_stack_development: ensureArrayAndFilter(allSelectedValues.full_stack_development || allSelectedValues.fullStack),
        programming_languages: ensureArrayAndFilter(allSelectedValues.programming_languages || allSelectedValues.programmingLanguages),
        api_development_data_access_technologies: ensureArrayAndFilter(allSelectedValues.api_development_data_access_technologies || allSelectedValues.apiDevelopment),
        application_integration_tools: ensureArrayAndFilter(allSelectedValues.application_integration_tools || allSelectedValues.applicationIntegrationTools),
        test_coverage: ensureArrayAndFilter(allSelectedValues.test_coverage || allSelectedValues.testCoverage),
        productivity_measurement: ensureArrayAndFilter(allSelectedValues.productivity_measurement || allSelectedValues.productivityMeasurement),
        tracing: ensureArrayAndFilter(allSelectedValues.tracing),
        unit_testing_frameworks: ensureArrayAndFilter(allSelectedValues.unit_testing_frameworks || allSelectedValues.unitTestingFrameworks),
        functional_integration_testing: ensureArrayAndFilter(allSelectedValuesFour.FunctionalandIntegration || allSelectedValuesFour.functional_integration_testing),
        performance_load_testing_tools: ensureArrayAndFilter(allSelectedValuesFour.PerformanceandLoadTest || allSelectedValuesFour.performance_load_testing_tools),
        manual_testing_management_tools: ensureArrayAndFilter(allSelectedValuesFour.SelectManualTestingMgmt || allSelectedValuesFour.manual_testing_management_tools),
        application_security_testing_tools: ensureArrayAndFilter(allSelectedValuesFour.ApplicationSecurityTesting || allSelectedValuesFour.application_security_testing_tools),
        devops_infrastructure_as_code_iac: ensureArrayAndFilter(allSelectedValuesFour.devopsInfrastructureAsCodeIac || allSelectedValuesFour.devops_infrastructure_as_code_iac),
        directory_services_identity_management: ensureArrayAndFilter(allSelectedValues.directory_services_identity_management || allSelectedValues.directoryServices),
        code_quality_tools: ensureArrayAndFilter(allSelectedValues.code_quality_tools || allSelectedValues.codeQualityTools),
        ipaas_integration_platform_as_a_service: ensureArrayAndFilter(allSelectedValues.ipaas_integration_platform_as_a_service || allSelectedValues.iPaas),
        ai_machine_learning_technologies: ensureArrayAndFilter(allSelectedValuesSix.aiAndMachineLearningTechnologies || allSelectedValuesSix.ai_machine_learning_technologies),
        sdlc_improvement: ensureArrayAndFilter(allSelectedValuesSix.sdlc_improvement),
        agentic_ai_platforms: ensureArrayAndFilter(allSelectedValuesSix.agentic_ai_platforms),
        workflow_automation_tools: ensureArrayAndFilter(allSelectedValuesSix.workflow_automation_tools),
        enterprise_genai_platforms: ensureArrayAndFilter(allSelectedValuesSix.enterprise_genai_platforms),
        user_feedback_analytics_tools: ensureArrayAndFilter(allSelectedValuesFive.SelectUserFeedbackandAnalytics || allSelectedValuesFive.user_feedback_analytics_tools),
        low_code_environments: ensureArrayAndFilter(allSelectedValues.low_code_environments || allSelectedValues.lowCodeEnv),
        sow_file_path: sowFilePath || "",
        status: checked === true ? "Active" : "Inactive"
    };

    console.log("\n📤 Final Payload to be sent:");
    console.log(JSON.stringify(data, null, 2));
    console.log("\n🌐 API Endpoint:", url);

    try {
        console.log("\n🔄 Sending POST request...");
        const response = await createUpdateRecord(null, url, data, "POST");
        console.log("\n✅ Response received:", response);
        console.log("=".repeat(80));
        return response;
    } catch (error) {
        console.error("\n❌ Error adding new project:", error);
        console.log("=".repeat(80));
        throw error;
    }
};


export const updateProject = async (
    id,
    pmoUser,
    accountName,
    projectName,
    buhName,
    ddName,
    updatedValuesTwo,
    updatedValuesFour,
    updatedValuesThree,
    updatedValuesFive,
    updatedValuesSix,
    checked,
    sowFilePath
) => {
    console.log("\n" + "=".repeat(80));
    console.log("📡 updateProject API FUNCTION");
    console.log("=".repeat(80));

    console.log("\n📥 Received Parameters:");
    console.log("  - id:", id);
    console.log("  - pmoUser:", pmoUser?.mail);
    console.log("  - accountName:", accountName);
    console.log("  - projectName:", projectName);

    console.log("\n📦 Section Values Received:");
    console.log("  📘 updatedValuesTwo:", JSON.stringify(updatedValuesTwo, null, 2));

    const date = new Date();
    const formattedDateTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T` +
        `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

    const ensureArray = (value) => {
        if (!value) return [];
        return Array.isArray(value) ? value : [value];
    };
    const formatArray = (value) => {
        if (!value) return [];
        if (Array.isArray(value)) {
            // Remove duplicates and filter out empty values
            return [...new Set(value)].filter(Boolean);
        }
        return [value].filter(Boolean);
    };

    // Convert to arrays and remove duplicates
    const domainsFormatted = formatArray(updatedValuesTwo?.domainInput);
    const applicationClassFormatted = formatArray(updatedValuesTwo?.applicationInput);

    // Backend expects comma-separated strings, not arrays
    const domainsString = domainsFormatted.join(', ');
    const applicationClassString = applicationClassFormatted.join(', ');

    console.log("\n🔍 Domain/Application Processing (UPDATE):");
    console.log("  - Raw domainInput:", updatedValuesTwo?.domainInput);
    console.log("  - Raw applicationInput:", updatedValuesTwo?.applicationInput);
    console.log("  - After formatArray domains:", domainsFormatted);
    console.log("  - After formatArray application_class:", applicationClassFormatted);
    console.log("  - Final domains (string):", domainsString);
    console.log("  - Final application_class (string):", applicationClassString);

    const url = `update_project/${id}`;
    const data = {
        submitter_email_id: pmoUser["mail"],
        submitting_time: formattedDateTime,
        account_name: accountName || "",
        project_name: projectName || "",
        buh_name: buhName || "",
        dd_name: ddName || "",
        domains: domainsString,
        application_class: applicationClassString,
        analytics_reporting: ensureArray(updatedValuesFive?.AnalyticsReporting || updatedValuesFive?.analytics_reporting),
        environment: ensureArray(updatedValuesThree?.environment || updatedValuesThree?.environmentInput),
        cloud_technologies: ensureArray(updatedValuesThree?.cloud_technologies || updatedValuesThree?.cloudTechnologies),
        cybersecurity_technologies: ensureArray(updatedValuesThree?.cybersecurity_technologies || updatedValuesThree?.cybersecurityTechnologies),
        containerization_orchestration: ensureArray(updatedValuesThree?.containerization_orchestration || updatedValuesThree?.containerizationOrchestration),
        serverless_computing: ensureArray(updatedValuesThree?.serverless_computing || updatedValuesThree?.serverlessComputing),
        headless_cms: ensureArray(updatedValuesThree?.headless_cms || updatedValuesThree?.headlessCms),
        architecture_methodology: ensureArray(updatedValuesThree?.architecture_methodology || updatedValuesThree?.architectureMethodology),
        design_patterns: ensureArray(updatedValuesThree?.design_patterns || updatedValuesThree?.designPatterns),
        development_maturity_assessment: ensureArray(updatedValuesThree?.development_maturity_assessment || updatedValuesThree?.developmentMaturityAssessment),
        software_composition_analysis: ensureArray(updatedValuesThree?.software_composition_analysis || updatedValuesThree?.softwareCompositionAnalysis),
        api_testing_tools: ensureArray(updatedValuesThree?.api_testing_tools || updatedValuesThree?.apiTestingTools),
        behavioral_testing_tools: ensureArray(updatedValuesThree?.behavioral_testing_tools || updatedValuesThree?.behavioralTestingTools),
        deployment_methodologies: ensureArray(updatedValuesThree?.deployment_methodologies || updatedValuesThree?.deploymentMethodologies),
        cicd_tools: ensureArray(updatedValuesThree?.cicd_tools || updatedValuesThree?.cicdTools),
        alerting_tools: ensureArray(updatedValuesThree?.alerting_tools || updatedValuesThree?.alertingTools),
        dependency_analysis: ensureArray(updatedValuesThree?.dependency_analysis || updatedValuesThree?.dependencyAnalysis),
        data_engineering_etl_mdm_tools: ensureArray(updatedValuesThree?.data_engineering_etl_mdm_tools || updatedValuesThree?.etlAndMdmTools),
        mobile_cloud_computing: ensureArray(updatedValuesThree?.mobile_cloud_computing || updatedValuesThree?.mobileCloudComputing),
        edge_computing: ensureArray(updatedValuesThree?.edge_computing || updatedValuesThree?.edgeComputing),
        enterprise_platforms: ensureArray(updatedValuesThree?.enterprise_platforms || updatedValuesThree?.enterprisePlatforms),
        cms_applications: ensureArray(updatedValuesThree?.cms_applications || updatedValuesThree?.cmsApp),
        relational_databases_sql: ensureArray(updatedValuesThree?.relational_databases_sql || updatedValuesThree?.relationalDb),
        nosql_databases: ensureArray(updatedValuesThree?.nosql_databases || updatedValuesThree?.nosqlDb),
        in_memory_databases: ensureArray(updatedValuesThree?.in_memory_databases || updatedValuesThree?.inMemoryDbs),
        system_monitoring_performance_tools: ensureArray(updatedValuesThree?.system_monitoring_performance_tools || updatedValuesThree?.systemMonitoringAndPerformance),
        ides: ensureArray(updatedValuesThree?.ides),
        version_control_system_vcs: ensureArray(updatedValuesThree?.version_control_system_vcs || updatedValuesThree?.vcs),
        frontend_development: ensureArray(updatedValuesThree?.frontend_development || updatedValuesThree?.frontendDevelopment),
        server_side_backend_frameworks: ensureArray(updatedValuesThree?.server_side_backend_frameworks || updatedValuesThree?.serverSide),
        mobile_development: ensureArray(updatedValuesThree?.mobile_development || updatedValuesThree?.mobileDevelopment),
        full_stack_development: ensureArray(updatedValuesThree?.full_stack_development || updatedValuesThree?.fullStack),
        programming_languages: ensureArray(updatedValuesThree?.programming_languages || updatedValuesThree?.programmingLanguages),
        api_development_data_access_technologies: ensureArray(updatedValuesThree?.api_development_data_access_technologies || updatedValuesThree?.apiDevelopment),
        application_integration_tools: ensureArray(updatedValuesThree?.application_integration_tools || updatedValuesThree?.applicationIntegrationTools),
        test_coverage: ensureArray(updatedValuesThree?.test_coverage || updatedValuesThree?.testCoverage),
        productivity_measurement: ensureArray(updatedValuesThree?.productivity_measurement || updatedValuesThree?.productivityMeasurement),
        tracing: ensureArray(updatedValuesThree?.tracing),
        unit_testing_frameworks: ensureArray(updatedValuesThree?.unit_testing_frameworks || updatedValuesThree?.unitTestingFrameworks),
        functional_integration_testing: ensureArray(updatedValuesFour?.functional_integration_testing || updatedValuesFour?.FunctionalandIntegration),
        performance_load_testing_tools: ensureArray(updatedValuesFour?.performance_load_testing_tools || updatedValuesFour?.PerformanceandLoadTest),
        manual_testing_management_tools: ensureArray(updatedValuesFour?.manual_testing_management_tools || updatedValuesFour?.SelectManualTestingMgmt),
        application_security_testing_tools: ensureArray(updatedValuesFour?.application_security_testing_tools || updatedValuesFour?.ApplicationSecurityTesting),
        devops_infrastructure_as_code_iac: ensureArray(updatedValuesFour?.devops_infrastructure_as_code_iac || updatedValuesFour?.devopsInfrastructureAsCodeIac),
        directory_services_identity_management: ensureArray(updatedValuesThree?.directory_services_identity_management || updatedValuesThree?.directoryServices),
        code_quality_tools: ensureArray(updatedValuesThree?.code_quality_tools || updatedValuesThree?.codeQualityTools),
        ipaas_integration_platform_as_a_service: ensureArray(updatedValuesThree?.ipaas_integration_platform_as_a_service || updatedValuesThree?.iPaas),
        ai_machine_learning_technologies: ensureArray(updatedValuesSix?.aiAndMachineLearningTechnologies || updatedValuesSix?.ai_machine_learning_technologies),
        sdlc_improvement: ensureArray(updatedValuesSix?.sdlc_improvement),
        agentic_ai_platforms: ensureArray(updatedValuesSix?.agentic_ai_platforms),
        workflow_automation_tools: ensureArray(updatedValuesSix?.workflow_automation_tools),
        enterprise_genai_platforms: ensureArray(updatedValuesSix?.enterprise_genai_platforms),
        user_feedback_analytics_tools: ensureArray(updatedValuesFive?.user_feedback_analytics_tools || updatedValuesFive?.SelectUserFeedbackandAnalytics),
        low_code_environments: ensureArray(updatedValuesThree?.low_code_environments || updatedValuesThree?.lowCodeEnv),
        sow_file_path: sowFilePath || "",
        status: checked === true ? "Active" : "Inactive"
    };

    console.log("\n📤 Final UPDATE Payload:");
    console.log(JSON.stringify(data, null, 2));
    console.log("\n🌐 API Endpoint:", url);

    try {
        console.log("\n🔄 Sending PUT request...");
        const response = await createUpdateRecord(null, url, data, "PUT");
        console.log("\n✅ UPDATE Response received:", response);
        console.log("=".repeat(80));
        return response;
    } catch (error) {
        console.error("\n❌ Error updating project:", error);
        console.log("=".repeat(80));
        throw error; // Re-throw to handle in the component
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
