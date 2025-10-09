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
    const date = new Date();

    const formattedDateTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T` +
        `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    const url = `platform_data/create_project/`;
    // Helper to ensure array and filter
    const ensureArrayAndFilter = (value) => {
        if (!value) return [];
        const arr = Array.isArray(value) ? value : [value];
        return arr.filter(Boolean);
    };

    const data = {
        submitter_email_id: pmoUser["mail"],
        submitting_time: formattedDateTime,
        account_name: accountName || "",
        project_name: projectName || "",
        buh_name: buhName || "",
        dd_name: ddName || "",
        domains: ensureArrayAndFilter(allSelectedValuesTwo.domainInput),
        application_class: ensureArrayAndFilter(allSelectedValuesTwo.applicationInput),
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
    updatedValuesTwo,
    updatedValuesFour,
    updatedValuesThree,
    updatedValuesFive,
    updatedValuesSix,
    checked,
    sowFilePath
) => {
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

    const url = `update_project/${id}`;
    const data = {
        submitter_email_id: pmoUser["mail"],
        submitting_time: formattedDateTime,
        account_name: accountName || "",
        project_name: projectName || "",
        buh_name: buhName || "",
        dd_name: ddName || "",
        domains: formatArray(updatedValuesTwo?.domainInput),
        application_class: formatArray(updatedValuesTwo?.applicationInput),
        analytics_reporting: ensureArray(updatedValuesFive?.AnalyticsReporting),
        environment: ensureArray(updatedValuesThree?.environmentInput),
        cloud_technologies: ensureArray(updatedValuesThree?.cloudTechnologies),
        cybersecurity_technologies: ensureArray(updatedValuesThree?.cybersecurityTechnologies),
        containerization_orchestration: ensureArray(updatedValuesThree?.containerizationOrchestration),
        serverless_computing: ensureArray(updatedValuesThree?.serverlessComputing),
        headless_cms: ensureArray(updatedValuesThree?.headlessCms),
        architecture_methodology: ensureArray(updatedValuesThree?.architectureMethodology),
        design_patterns: ensureArray(updatedValuesThree?.designPatterns),
        development_maturity_assessment: ensureArray(updatedValuesThree?.developmentMaturityAssessment),
        software_composition_analysis: ensureArray(updatedValuesThree?.softwareCompositionAnalysis),
        api_testing_tools: ensureArray(updatedValuesThree?.apiTestingTools),
        behavioral_testing_tools: ensureArray(updatedValuesThree?.behavioralTestingTools),
        deployment_methodologies: ensureArray(updatedValuesThree?.deploymentMethodologies),
        cicd_tools: ensureArray(updatedValuesThree?.cicdTools),
        alerting_tools: ensureArray(updatedValuesThree?.alertingTools),
        dependency_analysis: ensureArray(updatedValuesThree?.dependencyAnalysis),
        data_engineering_etl_mdm_tools: ensureArray(updatedValuesThree?.etlAndMdmTools),
        mobile_cloud_computing: ensureArray(updatedValuesThree?.mobileCloudComputing),
        edge_computing: ensureArray(updatedValuesThree?.edgeComputing),
        enterprise_platforms: ensureArray(updatedValuesThree?.enterprisePlatforms),
        cms_applications: ensureArray(updatedValuesThree?.cmsApp),
        relational_databases_sql: ensureArray(updatedValuesThree?.relationalDb),
        nosql_databases: ensureArray(updatedValuesThree?.nosqlDb),
        in_memory_databases: ensureArray(updatedValuesThree?.inMemoryDbs),
        system_monitoring_performance_tools: ensureArray(updatedValuesThree?.systemMonitoringAndPerformance),
        ides: ensureArray(updatedValuesThree?.ides),
        version_control_system_vcs: ensureArray(updatedValuesThree?.vcs),
        frontend_development: ensureArray(updatedValuesThree?.frontendDevelopment),
        server_side_backend_frameworks: ensureArray(updatedValuesThree?.serverSide),
        mobile_development: ensureArray(updatedValuesThree?.mobileDevelopment),
        full_stack_development: ensureArray(updatedValuesThree?.fullStack),
        programming_languages: ensureArray(updatedValuesThree?.programmingLanguages),
        api_development_data_access_technologies: ensureArray(updatedValuesThree?.apiDevelopment),
        application_integration_tools: ensureArray(updatedValuesThree?.applicationIntegrationTools),
        test_coverage: ensureArray(updatedValuesThree?.testCoverage),
        productivity_measurement: ensureArray(updatedValuesThree?.productivityMeasurement),
        tracing: ensureArray(updatedValuesThree?.tracing),
        unit_testing_frameworks: ensureArray(updatedValuesThree?.unitTestingFrameworks),
        functional_integration_testing: ensureArray(updatedValuesFour?.FunctionalandIntegration),
        performance_load_testing_tools: ensureArray(updatedValuesFour?.PerformanceandLoadTest),
        manual_testing_management_tools: ensureArray(updatedValuesFour?.SelectManualTestingMgmt),
        application_security_testing_tools: ensureArray(updatedValuesFour?.ApplicationSecurityTesting),
        devops_infrastructure_as_code_iac: ensureArray(updatedValuesFour?.devopsInfrastructureAsCodeIac),
        directory_services_identity_management: ensureArray(updatedValuesThree?.directoryServices),
        code_quality_tools: ensureArray(updatedValuesThree?.codeQualityTools),
        ipaas_integration_platform_as_a_service: ensureArray(updatedValuesThree?.iPaas),
        ai_machine_learning_technologies: ensureArray(updatedValuesSix?.aiAndMachineLearningTechnologies || updatedValuesSix?.ai_machine_learning_technologies),
        sdlc_improvement: ensureArray(updatedValuesSix?.sdlc_improvement),
        agentic_ai_platforms: ensureArray(updatedValuesSix?.agentic_ai_platforms),
        workflow_automation_tools: ensureArray(updatedValuesSix?.workflow_automation_tools),
        enterprise_genai_platforms: ensureArray(updatedValuesSix?.enterprise_genai_platforms),
        user_feedback_analytics_tools: ensureArray(updatedValuesFive?.SelectUserFeedbackandAnalytics),
        low_code_environments: ensureArray(updatedValuesThree?.lowCodeEnv),
        sow_file_path: sowFilePath || "",
        status: checked === true ? "Active" : "Inactive"
    };

    try {
        const response = await createUpdateRecord(null, url, data, "PUT");
        return response;
    } catch (error) {
        console.error("Error updating project:", error);
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
