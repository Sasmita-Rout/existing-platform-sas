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
    allSelectedValuesTwo,
    allSelectedValues,
    allSelectedValuesDevelopment,
    allSelectedValuesTools,
    allSelectedValuesQa,
    allSelectedValuesFour,
    allSelectedValuesFive,
    allSelectedValuesSix,
    checked,
    sowFilePath
) => {
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

    // Convert to arrays first, then to comma-separated strings for backend
    const domainsArray = ensureArrayAndFilter(allSelectedValuesTwo?.domainInput);
    const applicationClassArray = ensureArrayAndFilter(allSelectedValuesTwo?.applicationInput);
    const domainsString = domainsArray.join(', ');
    const applicationClassString = applicationClassArray.join(', ');

    const data = {
        submitter_email_id: pmoUser["mail"],
        submitting_time: formattedDateTime,
        account_name: accountName || "",
        project_name: projectName || "",
        buh_name: buhName || "",
        dd_name: ddName || "",
        domains: domainsString,
        application_class: applicationClassString,

        // Environment Section (allSelectedValues)
        environment: ensureArrayAndFilter(allSelectedValues.environment || allSelectedValues.environmentInput),
        cloud_technologies: ensureArrayAndFilter(allSelectedValues.cloud_technologies || allSelectedValues.cloudTechnologies),
        cybersecurity_technologies: ensureArrayAndFilter(allSelectedValues.cybersecurity_technologies || allSelectedValues.cybersecurityTechnologies),
        serverless_computing: ensureArrayAndFilter(allSelectedValues.serverless_computing || allSelectedValues.serverlessComputing),
        mobile_cloud_computing: ensureArrayAndFilter(allSelectedValues.mobile_cloud_computing || allSelectedValues.mobileCloudComputing),
        edge_computing: ensureArrayAndFilter(allSelectedValues.edge_computing || allSelectedValues.edgeComputing),
        enterprise_platforms: ensureArrayAndFilter(allSelectedValues.enterprise_platforms || allSelectedValues.enterprisePlatforms),
        relational_databases_sql: ensureArrayAndFilter(allSelectedValues.relational_databases_sql || allSelectedValues.relationalDb),
        nosql_databases: ensureArrayAndFilter(allSelectedValues.nosql_databases || allSelectedValues.nosqlDb),
        in_memory_databases: ensureArrayAndFilter(allSelectedValues.in_memory_databases || allSelectedValues.inMemoryDbs),
        system_monitoring_performance_tools: ensureArrayAndFilter(allSelectedValues.system_monitoring_performance_tools || allSelectedValues.systemMonitoringAndPerformance),
        directory_services_identity_management: ensureArrayAndFilter(allSelectedValues.directory_services_identity_management || allSelectedValues.directoryServices),

        // Development Section (allSelectedValuesDevelopment)
        programming_languages: ensureArrayAndFilter(allSelectedValuesDevelopment.programming_languages),
        frontend_development: ensureArrayAndFilter(allSelectedValuesDevelopment.frontend_development),
        server_side_backend_frameworks: ensureArrayAndFilter(allSelectedValuesDevelopment.server_side_backend_frameworks),
        mobile_development: ensureArrayAndFilter(allSelectedValuesDevelopment.mobile_development),
        full_stack_development: ensureArrayAndFilter(allSelectedValuesDevelopment.full_stack_development),
        api_development_data_access_technologies: ensureArrayAndFilter(allSelectedValuesDevelopment.api_development_data_access_technologies),
        ides: ensureArrayAndFilter(allSelectedValuesDevelopment.ides),
        version_control_system_vcs: ensureArrayAndFilter(allSelectedValuesDevelopment.version_control_system_vcs),
        architecture_methodology: ensureArrayAndFilter(allSelectedValuesDevelopment.architecture_methodology),
        design_patterns: ensureArrayAndFilter(allSelectedValuesDevelopment.design_patterns),
        low_code_environments: ensureArrayAndFilter(allSelectedValuesDevelopment.low_code_environments),

        // Tools Section (allSelectedValuesTools)
        data_engineering_etl_mdm_tools: ensureArrayAndFilter(allSelectedValuesTools.data_engineering_etl_mdm_tools),
        cms_applications: ensureArrayAndFilter(allSelectedValuesTools.cms_applications),
        headless_cms: ensureArrayAndFilter(allSelectedValuesTools.headless_cms),
        application_integration_tools: ensureArrayAndFilter(allSelectedValuesTools.application_integration_tools),
        ipaas_integration_platform_as_a_service: ensureArrayAndFilter(allSelectedValuesTools.ipaas_integration_platform_as_a_service),
        code_quality_tools: ensureArrayAndFilter(allSelectedValuesTools.code_quality_tools),
        dependency_analysis: ensureArrayAndFilter(allSelectedValuesTools.dependency_analysis),
        productivity_measurement: ensureArrayAndFilter(allSelectedValuesTools.productivity_measurement),
        tracing: ensureArrayAndFilter(allSelectedValuesTools.tracing),
        alerting_tools: ensureArrayAndFilter(allSelectedValuesTools.alerting_tools),
        cybersecurity_technologies: ensureArrayAndFilter(allSelectedValuesTools.cybersecurity_technologies),
        ai_machine_learning_technologies: ensureArrayAndFilter(allSelectedValuesTools.ai_machine_learning_technologies),

        // QA Section (allSelectedValuesQa)
        unit_testing_frameworks: ensureArrayAndFilter(allSelectedValuesQa.unit_testing_frameworks),
        functional_integration_testing: ensureArrayAndFilter(allSelectedValuesQa.functional_integration_testing),
        performance_load_testing_tools: ensureArrayAndFilter(allSelectedValuesQa.performance_load_testing_tools),
        api_testing_tools: ensureArrayAndFilter(allSelectedValuesQa.api_testing_tools),
        behavioral_testing_tools: ensureArrayAndFilter(allSelectedValuesQa.behavioral_testing_tools),
        manual_testing_management_tools: ensureArrayAndFilter(allSelectedValuesQa.manual_testing_management_tools),
        application_security_testing_tools: ensureArrayAndFilter(allSelectedValuesQa.application_security_testing_tools),
        test_coverage: ensureArrayAndFilter(allSelectedValuesQa.test_coverage),
        development_maturity_assessment: ensureArrayAndFilter(allSelectedValuesQa.development_maturity_assessment),
        software_composition_analysis: ensureArrayAndFilter(allSelectedValuesQa.software_composition_analysis),

        // DevOps Section (allSelectedValuesFour)
        devops_infrastructure_as_code_iac: ensureArrayAndFilter(allSelectedValuesFour.devops_infrastructure_as_code_iac),
        containerization_orchestration: ensureArrayAndFilter(allSelectedValuesFour.containerization_orchestration),
        deployment_methodologies: ensureArrayAndFilter(allSelectedValuesFour.deployment_methodologies),
        cicd_tools: ensureArrayAndFilter(allSelectedValuesFour.cicd_tools),

        // BI Section (allSelectedValuesFive)
        analytics_reporting: ensureArrayAndFilter(allSelectedValuesFive.analytics_reporting || allSelectedValuesFive.AnalyticsReporting),
        user_feedback_analytics_tools: ensureArrayAndFilter(allSelectedValuesFive.user_feedback_analytics_tools || allSelectedValuesFive.SelectUserFeedbackandAnalytics),

        // GenAI Section (allSelectedValuesSix)
        sdlc_improvement: ensureArrayAndFilter(allSelectedValuesSix.sdlc_improvement),
        agentic_ai_platforms: ensureArrayAndFilter(allSelectedValuesSix.agentic_ai_platforms),
        workflow_automation_tools: ensureArrayAndFilter(allSelectedValuesSix.workflow_automation_tools),
        enterprise_genai_platforms: ensureArrayAndFilter(allSelectedValuesSix.enterprise_genai_platforms),

        sow_file_path: sowFilePath || "",
        status: checked === true ? "Active" : "Inactive"
    };

    try {
        const response = await createUpdateRecord(null, url, data, "POST");
        return response;
    } catch (error) {
        console.error("Error adding new project:", error);
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
    updatedValuesThree,
    updatedValuesDevelopment,
    updatedValuesTools,
    updatedValuesQa,
    updatedValuesFour,
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

    // Convert to arrays, remove duplicates, then to comma-separated strings for backend
    const domainsFormatted = formatArray(updatedValuesTwo?.domainInput);
    const applicationClassFormatted = formatArray(updatedValuesTwo?.applicationInput);
    const domainsString = domainsFormatted.join(', ');
    const applicationClassString = applicationClassFormatted.join(', ');

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

        // Environment Section (updatedValuesThree)
        environment: ensureArray(updatedValuesThree?.environment || updatedValuesThree?.environmentInput),
        cloud_technologies: ensureArray(updatedValuesThree?.cloud_technologies || updatedValuesThree?.cloudTechnologies),
        cybersecurity_technologies: ensureArray(updatedValuesThree?.cybersecurity_technologies || updatedValuesThree?.cybersecurityTechnologies),
        serverless_computing: ensureArray(updatedValuesThree?.serverless_computing || updatedValuesThree?.serverlessComputing),
        mobile_cloud_computing: ensureArray(updatedValuesThree?.mobile_cloud_computing || updatedValuesThree?.mobileCloudComputing),
        edge_computing: ensureArray(updatedValuesThree?.edge_computing || updatedValuesThree?.edgeComputing),
        enterprise_platforms: ensureArray(updatedValuesThree?.enterprise_platforms || updatedValuesThree?.enterprisePlatforms),
        relational_databases_sql: ensureArray(updatedValuesThree?.relational_databases_sql || updatedValuesThree?.relationalDb),
        nosql_databases: ensureArray(updatedValuesThree?.nosql_databases || updatedValuesThree?.nosqlDb),
        in_memory_databases: ensureArray(updatedValuesThree?.in_memory_databases || updatedValuesThree?.inMemoryDbs),
        system_monitoring_performance_tools: ensureArray(updatedValuesThree?.system_monitoring_performance_tools || updatedValuesThree?.systemMonitoringAndPerformance),
        directory_services_identity_management: ensureArray(updatedValuesThree?.directory_services_identity_management || updatedValuesThree?.directoryServices),

        // Development Section (updatedValuesDevelopment)
        programming_languages: ensureArray(updatedValuesDevelopment?.programming_languages),
        frontend_development: ensureArray(updatedValuesDevelopment?.frontend_development),
        server_side_backend_frameworks: ensureArray(updatedValuesDevelopment?.server_side_backend_frameworks),
        mobile_development: ensureArray(updatedValuesDevelopment?.mobile_development),
        full_stack_development: ensureArray(updatedValuesDevelopment?.full_stack_development),
        api_development_data_access_technologies: ensureArray(updatedValuesDevelopment?.api_development_data_access_technologies),
        ides: ensureArray(updatedValuesDevelopment?.ides),
        version_control_system_vcs: ensureArray(updatedValuesDevelopment?.version_control_system_vcs),
        architecture_methodology: ensureArray(updatedValuesDevelopment?.architecture_methodology),
        design_patterns: ensureArray(updatedValuesDevelopment?.design_patterns),
        low_code_environments: ensureArray(updatedValuesDevelopment?.low_code_environments),

        // Tools Section (updatedValuesTools)
        data_engineering_etl_mdm_tools: ensureArray(updatedValuesTools?.data_engineering_etl_mdm_tools),
        cms_applications: ensureArray(updatedValuesTools?.cms_applications),
        headless_cms: ensureArray(updatedValuesTools?.headless_cms),
        application_integration_tools: ensureArray(updatedValuesTools?.application_integration_tools),
        ipaas_integration_platform_as_a_service: ensureArray(updatedValuesTools?.ipaas_integration_platform_as_a_service),
        code_quality_tools: ensureArray(updatedValuesTools?.code_quality_tools),
        dependency_analysis: ensureArray(updatedValuesTools?.dependency_analysis),
        productivity_measurement: ensureArray(updatedValuesTools?.productivity_measurement),
        tracing: ensureArray(updatedValuesTools?.tracing),
        alerting_tools: ensureArray(updatedValuesTools?.alerting_tools),
        cybersecurity_technologies: ensureArray(updatedValuesTools?.cybersecurity_technologies),
        ai_machine_learning_technologies: ensureArray(updatedValuesTools?.ai_machine_learning_technologies),

        // QA Section (updatedValuesQa)
        unit_testing_frameworks: ensureArray(updatedValuesQa?.unit_testing_frameworks),
        functional_integration_testing: ensureArray(updatedValuesQa?.functional_integration_testing),
        performance_load_testing_tools: ensureArray(updatedValuesQa?.performance_load_testing_tools),
        api_testing_tools: ensureArray(updatedValuesQa?.api_testing_tools),
        behavioral_testing_tools: ensureArray(updatedValuesQa?.behavioral_testing_tools),
        manual_testing_management_tools: ensureArray(updatedValuesQa?.manual_testing_management_tools),
        application_security_testing_tools: ensureArray(updatedValuesQa?.application_security_testing_tools),
        test_coverage: ensureArray(updatedValuesQa?.test_coverage),
        development_maturity_assessment: ensureArray(updatedValuesQa?.development_maturity_assessment),
        software_composition_analysis: ensureArray(updatedValuesQa?.software_composition_analysis),

        // DevOps Section (updatedValuesFour)
        devops_infrastructure_as_code_iac: ensureArray(updatedValuesFour?.devops_infrastructure_as_code_iac || updatedValuesFour?.devopsInfrastructureAsCodeIac),
        containerization_orchestration: ensureArray(updatedValuesFour?.containerization_orchestration || updatedValuesFour?.containerizationOrchestration),
        deployment_methodologies: ensureArray(updatedValuesFour?.deployment_methodologies || updatedValuesFour?.deploymentMethodologies),
        cicd_tools: ensureArray(updatedValuesFour?.cicd_tools || updatedValuesFour?.cicdTools),

        // BI Section (updatedValuesFive)
        analytics_reporting: ensureArray(updatedValuesFive?.analytics_reporting || updatedValuesFive?.AnalyticsReporting),
        user_feedback_analytics_tools: ensureArray(updatedValuesFive?.user_feedback_analytics_tools || updatedValuesFive?.SelectUserFeedbackandAnalytics),

        // GenAI Section (updatedValuesSix)
        sdlc_improvement: ensureArray(updatedValuesSix?.sdlc_improvement),
        agentic_ai_platforms: ensureArray(updatedValuesSix?.agentic_ai_platforms),
        workflow_automation_tools: ensureArray(updatedValuesSix?.workflow_automation_tools),
        enterprise_genai_platforms: ensureArray(updatedValuesSix?.enterprise_genai_platforms),

        sow_file_path: sowFilePath || "",
        status: checked === true ? "Active" : "Inactive"
    };

    try {
        const response = await createUpdateRecord(null, url, data, "PUT");
        return response;
    } catch (error) {
        console.error("Error updating project:", error);
        throw error;
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
