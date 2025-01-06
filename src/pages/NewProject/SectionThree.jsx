import React, { useEffect } from 'react';
import { Filter } from "../../components/molecules/index";
import { Box, Typography } from "@mui/material";

export default function SectionThree({ row, viewProject, disableButton, onSelectedValuesChange, ...props }) {
    const [selectedValues, setSelectedValues] = React.useState({});
    const [viewValues, setViewValues] = React.useState({});

    const handleSelect = (key, newValue) => {
        setSelectedValues((prevValues) => {
            const updatedValues = { ...prevValues, [key]: newValue };
            if (onSelectedValuesChange) {
                onSelectedValuesChange(updatedValues);
            }
            return updatedValues;
        });
    };

    const handleViewSelect = (key, newValue) => {
        setViewValues((prevValues) => ({
            ...prevValues,
            [key]: newValue,
        }));
    };

    useEffect(() => {
        onSelectedValuesChange(viewValues);
    }, [viewValues])

    const handleFilterSelect = (key, newValue) => {
        if (viewProject) {
            handleViewSelect(key, newValue);
        } else {
            handleSelect(key, newValue);
        }
    };

    useEffect(() => {
        if (viewProject) {
            const updatedValues = {
                environmentInput: row["environment"], cloudTechnologies: row["cloud_technologies"],
                enterprisePlatforms: row["enterprise_platforms"], etlAndMdmTools: row["data_engineering_etl_mdm_tools"], devops: row["devops_infrastructure_as_code_iac"],
                lowCodeEnv: row["low_code_environments"], vcs: row["version_control_system_vcs"], edgeComputing: row["edge_computing"], relationalDb: row["relational_databases_sql"],
                nosqlDb: row["nosql_databases"], inMemoryDbs: row["in_memory_databases"], mobileCloudComputing: row["mobile_cloud_computing"], systemMonitoringAndPerformance: row["system_monitoring_performance_tools"],
                directoryServices: row["directory_services_identity_management"], ides: row["ides"], cmsApp: row["cms_applications"],
                iPaas: row["ipaas_integration_platform_as_a_service"], frontendDevelopment: row["frontend_development"], serverSide: row["server_side_backend_frameworks"], fullStack: row["full_stack_development"],
                mobileDevelopment: row["mobile_development"], apiDevelopment: row["api_development_data_access_technologies"],
                applicationIntegrationTools: row["application_integration_tools"], unitTestingFrameworks: row["unit_testing_frameworks"], programmingLanguages: row["programming_languages"], codeQualityTools: row["code_quality_tools"],
                testCoverage: row["test_coverage"], productivityMeasurement: row["productivity_measurement"],
                tracing: row["tracing"]
            };
            setViewValues(updatedValues);
        }
    }, [viewProject])

    const inputs = [
        { key: 'environmentInput', labels: 'Select Environment' },
        { key: 'cloudTechnologies', labels: 'Select Cloud Technologies' },
        { key: 'enterprisePlatforms', labels: 'Select Enterprise Platforms' },
        { key: 'etlAndMdmTools', labels: 'Select Data Engg-ETL & MDM Tools' },
        { key: 'devops', labels: 'Select Devops' },
        { key: 'lowCodeEnv', labels: 'Select Low Code Environments' },
        { key: 'vcs', labels: 'Select VCS' },
        { key: 'edgeComputing', labels: 'Select Edge Computing' },
        { key: 'relationalDb', labels: 'Select Relational Databases(SQL)' },
        { key: 'nosqlDb', labels: 'Select NOSQL databases' },
        { key: 'inMemoryDbs', labels: 'Select In-Memory databases' },
        { key: 'mobileCloudComputing', labels: 'Select Mobile Cloud Computing' },
        { key: 'systemMonitoringAndPerformance', labels: 'Select System Monitoring & Performance' },
        { key: 'directoryServices', labels: 'Select Directory Services' },
        { key: 'ides', labels: 'Select IDEs' },
        { key: 'cmsApp', labels: 'Select CMS Applications' },
        { key: 'iPaas', labels: 'Select IPaas' },
        { key: 'frontendDevelopment', labels: 'Select Frontend Development' },
        { key: 'serverSide', labels: 'Select Server-Side & Back-end' },
        { key: 'fullStack', labels: 'Select Full-Stack Development' },
        { key: 'mobileDevelopment', labels: 'Select Mobile Development' },
        { key: 'apiDevelopment', labels: 'Select Api Development and Data Analytics' },
        { key: 'applicationIntegrationTools', labels: 'Select Application Integration Tools' },
        { key: 'unitTestingFrameworks', labels: 'Select Unit Testing Frameworks' },
        { key: 'programmingLanguages', labels: 'Select Programming Languages' },
        { key: 'codeQualityTools', labels: 'Select Code Quality Tools' },
        { key: 'testCoverage', labels: 'Select Test Coverage' },
        { key: 'productivityMeasurement', labels: 'Select Productive Measurement' },
        { key: 'tracing', labels: 'Select Tracing' },
    ];

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: "15px" }}>
            <Box sx={{ display: 'flex', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                {inputs.map(({ key, labels }) => (
                    <Box sx={{ marginRight: 2, marginTop: 2 }} key={key}>
                        <Typography variant="subtitle1" sx={{ fontSize: 14 }} gutterBottom>
                            {labels}
                        </Typography>
                        <Filter
                            input={props[key] || []}
                            handleOnSelect={(event, newValue) => handleFilterSelect(key, newValue)}
                            selectedValues={viewProject ? viewValues[key] : selectedValues[key]}
                            isMultiSelect={false}
                            placeholder={labels}
                            showIcon={false}
                        // disabled={!disableButton}
                        />
                    </Box>
                ))}
            </Box>
        </div>
    );
}
