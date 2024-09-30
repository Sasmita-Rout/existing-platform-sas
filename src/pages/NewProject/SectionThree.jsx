import React from 'react';
import { Filter } from "../../components/molecules/index";
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import EmergencyIcon from '@mui/icons-material/Emergency';

export default function SectionThree(props) {
    const [selectedValues, setSelectedValues] = React.useState({});

    const handleSelect = (key, newValue) => {
        setSelectedValues((prevState) => ({
            ...prevState,
            [key]: newValue
        }));
    };

    const inputs = [
        { key: 'environmentInput', labels: 'Select Domain' },
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
            <Box sx={{ display: 'flex', borderRadius: '5px', border: `1px solid ${grey[500]}`, padding: '10px', gap: 1, width: "100%", backgroundColor: `${grey[200]}` }}>
                <Avatar sx={{ bgcolor: 'grey', width: 30, height: 30 }}>
                    <Typography variant="body2" color="white">3</Typography>
                </Avatar>
                <Typography variant="subtitle1" gutterBottom>
                    <EmergencyIcon style={{ fontSize: "small", color: "red" }} />Environment, Infrastructure, System Related Info
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                {inputs.map(({ key, labels }) => (
                    <Box sx={{ marginRight: 2, marginTop: 2 }} key={key}>
                        <Filter
                            input={props[key] || []}
                            onFocus="Select..." 
                            onBlur={labels}
                            handleOnSelect={(event, newValue) => handleSelect(key, newValue)}
                            selectedValues={selectedValues[key]}
                            isMultiSelect={false}
                            placeholder={labels}
                            showIcon={false}
                        />
                    </Box>
                ))}
            </Box>
        </div>
    );
}
