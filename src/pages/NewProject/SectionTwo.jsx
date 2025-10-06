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

    useEffect(() => {
        if (Object.keys(viewValues).length > 0) {
            onSelectedValuesChange(viewValues);
        }
    }, [viewValues]);


    const handleFilterSelect = (key, newValue) => {
        viewProject ? handleViewSelect(key, newValue) : handleSelect(key, newValue);
    };
    useEffect(() => {
        if (viewProject) {
            setViewValues({
                domainInput: row["domains"],
                applicationInput: row["application_class"],
            });
        }
    }, [viewProject, row]);

    const inputs = [
        { key: 'domainInput', labels: 'Select Domain' },
        { key: 'applicationInput', labels: 'Application Class' },
    ];

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: "15px" }}>
            <Box sx={{ display: 'flex', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                {inputs.map(({ key, labels }) => (
                    <Box sx={{ marginRight: 2, marginTop: 2 }} key={key}>
                        <Typography variant="subtitle1" sx={{ fontSize: 14 }} gutterBottom>
                            {labels}
                            <EmergencyIcon style={{ fontSize: "small", color: "red" }} />
                        </Typography>
                        <DropdownCustom
                            input={props[key] || []}
                            row={row}
                            placeholder={labels}
                            onFocus="Select..."
                            onBlur={labels}
                            handleSelect={(newValue) =>
                                handleFilterSelect(key, newValue)
                            }
                            selectedValues={
                                viewProject ? viewValues[key] : selectedValues[key]
                            }
                            onSelectedValuesChange={onSelectedValuesChange}
                            props={props}
                        />
                    </Box>
                ))}
            </Box>
        </div>
    );
}
