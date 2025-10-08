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
        environment: ensureArrayAndFilter(allSelectedValues.environmentInput),
        cloud_technologies: ensureArrayAndFilter(allSelectedValues.cloudTechnologies),
        cybersecurity_technologies: ensureArrayAndFilter(allSelectedValues.cybersecurityTechnologies),
        containerization_orchestration: ensureArrayAndFilter(allSelectedValues.containerizationOrchestration),
        serverless_computing: ensureArrayAndFilter(allSelectedValues.serverlessComputing),
        headless_cms: ensureArrayAndFilter(allSelectedValues.headlessCms),
        architecture_methodology: ensureArrayAndFilter(allSelectedValues.architectureMethodology),
        design_patterns: ensureArrayAndFilter(allSelectedValues.designPatterns),
        development_maturity_assessment: ensureArrayAndFilter(allSelectedValues.developmentMaturityAssessment),
        software_composition_analysis: ensureArrayAndFilter(allSelectedValues.softwareCompositionAnalysis),
        api_testing_tools: ensureArrayAndFilter(allSelectedValues.apiTestingTools),
        behavioral_testing_tools: ensureArrayAndFilter(allSelectedValues.behavioralTestingTools),
        deployment_methodologies: ensureArrayAndFilter(allSelectedValues.deploymentMethodologies),
        cicd_tools: ensureArrayAndFilter(allSelectedValues.cicdTools),
        alerting_tools: ensureArrayAndFilter(allSelectedValues.alertingTools),
        dependency_analysis: ensureArrayAndFilter(allSelectedValues.dependencyAnalysis),
        data_engineering_etl_mdm_tools: ensureArrayAndFilter(allSelectedValues.etlAndMdmTools),
        mobile_cloud_computing: ensureArrayAndFilter(allSelectedValues.mobileCloudComputing),
        edge_computing: ensureArrayAndFilter(allSelectedValues.edgeComputing),
        enterprise_platforms: ensureArrayAndFilter(allSelectedValues.enterprisePlatforms),
        cms_applications: ensureArrayAndFilter(allSelectedValues.cmsApp),
        relational_databases_sql: ensureArrayAndFilter(allSelectedValues.relationalDb),
        nosql_databases: ensureArrayAndFilter(allSelectedValues.nosqlDb),
        in_memory_databases: ensureArrayAndFilter(allSelectedValues.inMemoryDbs),
        system_monitoring_performance_tools: ensureArrayAndFilter(allSelectedValues.systemMonitoringAndPerformance),
        ides: ensureArrayAndFilter(allSelectedValues.ides),
        version_control_system_vcs: ensureArrayAndFilter(allSelectedValues.vcs),
        frontend_development: ensureArrayAndFilter(allSelectedValues.frontendDevelopment),
        server_side_backend_frameworks: ensureArrayAndFilter(allSelectedValues.serverSide),
        mobile_development: ensureArrayAndFilter(allSelectedValues.mobileDevelopment),
        full_stack_development: ensureArrayAndFilter(allSelectedValues.fullStack),
        programming_languages: ensureArrayAndFilter(allSelectedValues.programmingLanguages),
        api_development_data_access_technologies: ensureArrayAndFilter(allSelectedValues.apiDevelopment),
        application_integration_tools: ensureArrayAndFilter(allSelectedValues.applicationIntegrationTools),
        test_coverage: ensureArrayAndFilter(allSelectedValues.testCoverage),
        productivity_measurement: ensureArrayAndFilter(allSelectedValues.productivityMeasurement),
        tracing: ensureArrayAndFilter(allSelectedValues.tracing),
        unit_testing_frameworks: ensureArrayAndFilter(allSelectedValues.unitTestingFrameworks),
        functional_integration_testing: ensureArrayAndFilter(allSelectedValuesFour.FunctionalandIntegration),
        performance_load_testing_tools: ensureArrayAndFilter(allSelectedValuesFour.PerformanceandLoadTest),
        manual_testing_management_tools: ensureArrayAndFilter(allSelectedValuesFour.SelectManualTestingMgmt),
        application_security_testing_tools: ensureArrayAndFilter(allSelectedValuesFour.ApplicationSecurityTesting),
        devops_infrastructure_as_code_iac: ensureArrayAndFilter(allSelectedValuesFour.devopsInfrastructureAsCodeIac),
        directory_services_identity_management: ensureArrayAndFilter(allSelectedValues.directoryServices),
        code_quality_tools: ensureArrayAndFilter(allSelectedValues.codeQualityTools),
        ipaas_integration_platform_as_a_service: ensureArrayAndFilter(allSelectedValues.iPaas),
        ai_machine_learning_technologies: ensureArrayAndFilter(allSelectedValuesSix.aiAndMachineLearningTechnologies),
        user_feedback_analytics_tools: ensureArrayAndFilter(allSelectedValuesFive.SelectUserFeedbackandAnalytics),
        low_code_environments: ensureArrayAndFilter(allSelectedValues.lowCodeEnv),
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
    checked
) => {
    const date = new Date();
    const formattedDateTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T` +
        `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

    // Handle domains and application_class properly
    const domains = updatedValuesTwo?.domainInput ? 
        Array.isArray(updatedValuesTwo.domainInput) ? 
            updatedValuesTwo.domainInput : 
            [updatedValuesTwo.domainInput] 
        : [];

    const applicationClass = updatedValuesTwo?.applicationInput ? 
        Array.isArray(updatedValuesTwo.applicationInput) ? 
            updatedValuesTwo.applicationInput : 
            [updatedValuesTwo.applicationInput] 
        : [];

    const ensureArray = (value) => {
        if (!value) return [];
        return Array.isArray(value) ? value : [value];
    };
    const formatArray = (value) => {
        if (!value) return [];
        if (Array.isArray(value)) return value.filter(Boolean);
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
        // domains: ensureArray(updatedValuesTwo?.domainInput),
        // application_class: ensureArray(updatedValuesTwo?.applicationInput),
        domains: formatArray(updatedValuesTwo?.domainInput || updatedValuesTwo?.domains),
        application_class: formatArray(updatedValuesTwo?.applicationInput || updatedValuesTwo?.application_class),
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
        ai_machine_learning_technologies: ensureArray(updatedValuesSix?.aiAndMachineLearningTechnologies),
        user_feedback_analytics_tools: ensureArray(updatedValuesFive?.SelectUserFeedbackandAnalytics),
        low_code_environments: ensureArray(updatedValuesThree?.lowCodeEnv),
        status: checked === true ? "Active" : "Inactive"
    };

    try {
        if (!domains.length || !applicationClass.length) {
            throw new Error('Domains and Application Class are required');
        }

        const response = await createUpdateRecord(null, url, data, "PUT");
        return response;
    } catch (error) {
        console.error("Error updating project:", error);
        throw error; // Re-throw to handle in the component
    }
};


// export const updateProject = async (projectId, ...args) => {
//   try {
//     const [
//       pmoUser,
//       accountName,
//       projectName,
//       buhName,
//       ddName,
//       domains,
//       applicationClass,
//       sectionThree,
//       sectionFour,
//       sectionFive,
//       sectionSix,
//       status
//     ] = args;

//     const response = await fetch(`${apiUrl}/update_project/${projectId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         submitter_email_id: pmoUser,
//         account_name: accountName,
//         project_name: projectName,
//         buh_name: buhName,
//         dd_name: ddName,
//         domains,
//         application_class: applicationClass,
//         ...sectionThree,
//         ...sectionFour,
//         ...sectionFive,
//         ...sectionSix,
//         status
//       })
//     });

//     if (!response.ok) {
//       throw new Error('Update failed');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error in updateProject:', error);
//     throw error;
//   }
// };

// export const updateProject = async (
//     id,
//     pmoUser,
//     accountName,
//     projectName,
//     buhName,
//     ddName,
//     updatedValuesTwo, updatedValuesFour, updatedValuesThree, updatedValuesFive, updatedValuesSix, checked

// ) => {
//     const date = new Date();
//     const formattedDateTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T` +
//         `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
//     const url = `update_project/${id}`;
//     const data = {
//         submitter_email_id: pmoUser["mail"],
//         submitting_time: formattedDateTime,
//         account_name: accountName || "",
//         project_name: projectName || "",
//         buh_name: buhName || "",
//         dd_name: ddName || "",
//         domains: [updatedValuesTwo.domainInput ? updatedValuesTwo.domainInput : ""] || "",
//         application_class: [updatedValuesTwo.applicationInput ? updatedValuesTwo.applicationInput : ""] || "",
//         analytics_reporting: [updatedValuesFive.AnalyticsReporting].filter(Boolean),
//         environment: [updatedValuesThree.environmentInput].filter(Boolean),
//         cloud_technologies: [updatedValuesThree.cloudTechnologies].filter(Boolean),
//         cybersecurity_technologies: [updatedValuesThree.cybersecurityTechnologies].filter(Boolean),
//         containerization_orchestration: [updatedValuesThree.containerizationOrchestration].filter(Boolean),
//         serverless_computing: [updatedValuesThree.serverlessComputing].filter(Boolean),
//         headless_cms: [updatedValuesThree.headlessCms].filter(Boolean),
//         architecture_methodology: [updatedValuesThree.architectureMethodology].filter(Boolean),
//         design_patterns: [updatedValuesThree.designPatterns].filter(Boolean),
//         development_maturity_assessment: [updatedValuesThree.developmentMaturityAssessment].filter(Boolean),
//         software_composition_analysis: [updatedValuesThree.softwareCompositionAnalysis].filter(Boolean),
//         api_testing_tools: [updatedValuesThree.apiTestingTools].filter(Boolean),
//         behavioral_testing_tools: [updatedValuesThree.behavioralTestingTools].filter(Boolean),
//         deployment_methodologies: [updatedValuesThree.deploymentMethodologies].filter(Boolean),
//         cicd_tools: [updatedValuesThree.cicdTools].filter(Boolean),
//         alerting_tools: [updatedValuesThree.alertingTools].filter(Boolean),
//         dependency_analysis: [updatedValuesThree.dependencyAnalysis].filter(Boolean),
//         data_engineering_etl_mdm_tools: [updatedValuesThree.etlAndMdmTools].filter(Boolean),
//         mobile_cloud_computing: [updatedValuesThree.mobileCloudComputing].filter(Boolean),
//         edge_computing: [updatedValuesThree.edgeComputing].filter(Boolean),
//         enterprise_platforms: [updatedValuesThree.enterprisePlatforms].filter(Boolean),
//         cms_applications: [updatedValuesThree.cmsApp].filter(Boolean),
//         relational_databases_sql: [updatedValuesThree.relationalDb].filter(Boolean),
//         nosql_databases: [updatedValuesThree.nosqlDb].filter(Boolean),
//         in_memory_databases: [updatedValuesThree.inMemoryDbs].filter(Boolean),
//         system_monitoring_performance_tools: [updatedValuesThree.systemMonitoringAndPerformance].filter(Boolean),
//         ides: [updatedValuesThree.ides].filter(Boolean),
//         version_control_system_vcs: [updatedValuesThree.vcs].filter(Boolean),
//         frontend_development: [updatedValuesThree.frontendDevelopment].filter(Boolean),
//         server_side_backend_frameworks: [updatedValuesThree.serverSide].filter(Boolean),
//         mobile_development: [updatedValuesThree.mobileDevelopment].filter(Boolean),
//         full_stack_development: [updatedValuesThree.fullStack].filter(Boolean),
//         programming_languages: [updatedValuesThree.programmingLanguages].filter(Boolean),
//         api_development_data_access_technologies: [updatedValuesThree.apiDevelopment].filter(Boolean),
//         application_integration_tools: [updatedValuesThree.applicationIntegrationTools].filter(Boolean),
//         test_coverage: [updatedValuesThree.testCoverage].filter(Boolean),
//         productivity_measurement: [updatedValuesThree.productivityMeasurement].filter(Boolean),
//         tracing: [updatedValuesThree.tracing].filter(Boolean),
//         unit_testing_frameworks: [updatedValuesThree.unitTestingFrameworks].filter(Boolean),
//         functional_integration_testing: [updatedValuesFour.FunctionalandIntegration].filter(Boolean) || "",
//         performance_load_testing_tools: [updatedValuesFour.PerformanceandLoadTest].filter(Boolean),
//         manual_testing_management_tools: [updatedValuesFour.SelectManualTestingMgmt].filter(Boolean),
//         application_security_testing_tools: [updatedValuesFour.ApplicationSecurityTesting].filter(Boolean),
//         devops_infrastructure_as_code_iac: [updatedValuesFour.devopsInfrastructureAsCodeIac].filter(Boolean),
//         directory_services_identity_management: [updatedValuesThree.directoryServices].filter(Boolean),
//         code_quality_tools: [updatedValuesThree.codeQualityTools].filter(Boolean),
//         ipaas_integration_platform_as_a_service: [updatedValuesThree.iPaas].filter(Boolean),
//         ai_machine_learning_technologies: [updatedValuesSix.aiAndMachineLearningTechnologies].filter(Boolean),
//         user_feedback_analytics_tools: [updatedValuesFive.SelectUserFeedbackandAnalytics].filter(Boolean),
//         low_code_environments: [updatedValuesThree.lowCodeEnv].filter(Boolean),
//         status: checked === true ? "Active" : "Inactive"
//     };

//     try {
//         const response = await createUpdateRecord(null, url, data, "PUT");
//         return response;
//     } catch (error) {
//         console.error("Error adding new project:", error);
//     }
// };

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
