import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EmergencyIcon from "@mui/icons-material/Emergency";
import { DropdownCustom } from "../../components/atoms/DropdownCustom";

export default function SectionTwo({ onSelectedValuesChange, onSelectedViewValuesChange,
    row,
    viewProject, ...props }) {

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

    const handleFilterSelect = (key, newValue) => {
        viewProject ? handleViewSelect(key, newValue) : handleSelect(key, newValue);
    };

    useEffect(() => {
        if (viewProject && row) {
            const parseValue = (value) => {
                if (!value || value === '') return [];
                if (Array.isArray(value)) {
                    // Remove duplicates from array
                    return [...new Set(value)].filter(item => item && item !== '');
                }
                // Split by comma, trim, filter empty, and remove duplicates
                const items = value.split(',').map(item => item.trim()).filter(item => item !== '');
                return [...new Set(items)];
            };

            const viewVals = {
                domainInput: parseValue(row["domains"]),
                applicationInput: parseValue(row["application_class"]),
            };
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
