import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EmergencyIcon from "@mui/icons-material/Emergency";
import { DropdownCustom } from "../../components/atoms/DropdownCustom";

export default function SectionTwo({ onSelectedValuesChange, onSelectedViewValuesChange,
    row,
    viewProject, ...props }) {

    console.log('SectionTwo RENDER - viewProject:', viewProject);
    console.log('SectionTwo RENDER - props.domainInput:', props.domainInput);
    console.log('SectionTwo RENDER - props.applicationInput:', props.applicationInput);
    console.log('SectionTwo RENDER - row:', row);

    const [selectedValues, setSelectedValues] = useState({});
    const [viewValues, setViewValues] = useState({});
    const [updateValues, setUpdateValues] = useState({})

    const handleSelect = (key, newValue) => {
        setSelectedValues((prevValues) => {
            const updatedValues = { ...prevValues, [key]: newValue };
            onSelectedValuesChange?.(updatedValues);
            return updatedValues;
        });
    };
    const handleViewSelect = (key, newValue) => {
        setUpdateValues((prevValues) => {
            const updatedValues = { ...prevValues, [key]: newValue };
            onSelectedViewValuesChange?.(updatedValues);
            return updatedValues;
        });
    };

    useEffect(() => {
        if (Object.keys(viewValues).length > 0) {
            onSelectedValuesChange(viewValues);
        }
    }, [viewValues]);


    const handleFilterSelect = (key, newValue) => {
        viewProject ? handleViewSelect(key, newValue) : handleSelect(key, newValue);
    };
    useEffect(() => {
        console.log('SectionTwo useEffect - viewProject:', viewProject, 'row:', row);
        if (viewProject && row) {
            console.log('SectionTwo useEffect - row.domains:', row["domains"]);
            console.log('SectionTwo useEffect - row.application_class:', row["application_class"]);

            const parseValue = (value) => {
                console.log('SectionTwo parseValue - input:', value, 'type:', typeof value);
                if (!value || value === '') return [];
                if (Array.isArray(value)) return value;
                // Split by comma and trim whitespace
                return value.split(',').map(item => item.trim()).filter(item => item !== '');
            };

            const viewVals = {
                domainInput: parseValue(row["domains"]),
                applicationInput: parseValue(row["application_class"]),
            };
            console.log('SectionTwo useEffect - setting viewVals:', viewVals);
            setViewValues(viewVals);
        }
    }, [viewProject, row]);

    const inputs = [
        { key: 'domainInput', labels: 'Select Domain' },
        { key: 'applicationInput', labels: 'Application Class' },
    ];

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: "15px" }}>
            <Box sx={{ display: 'flex', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                {inputs.map(({ key, labels }) => {
                    const inputValue = props[key] || [];
                    const selectedValue = viewProject ? viewValues[key] : selectedValues[key];
                    console.log(`SectionTwo RENDER ${key} - input:`, inputValue, 'selected:', selectedValue);

                    // Convert array to single value for DropdownCustom
                    const singleSelectedValue = Array.isArray(selectedValue)
                        ? (selectedValue.length > 0 ? selectedValue[0] : null)
                        : selectedValue;

                    return (
                        <Box sx={{ marginRight: 2, marginTop: 2 }} key={key}>
                            <Typography variant="subtitle1" sx={{ fontSize: 14 }} gutterBottom>
                                {labels}
                                <EmergencyIcon style={{ fontSize: "small", color: "red" }} />
                            </Typography>
                            <DropdownCustom
                                input={inputValue}
                                row={row}
                                placeholder={labels}
                                onFocus="Select..."
                                onBlur={labels}
                                handleSelect={(newValue) =>
                                    handleFilterSelect(key, newValue)
                                }
                                selectedValues={singleSelectedValue}
                                onSelectedValuesChange={onSelectedValuesChange}
                                props={props}
                            />
                        </Box>
                    );
                })}
            </Box>
        </div>
    );
}
