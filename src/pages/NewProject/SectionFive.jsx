import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  ListSubheader,
  CircularProgress,
  TextField,
  Divider,
} from "@mui/material";

const SectionFive = ({ row, viewProject, onSelectedValuesChange, onSelectedViewValuesChange }) => {
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedValues, setSelectedValues] = useState({});
  const [viewValues, setViewValues] = useState({});

  const inputs = [
    { key: 'analytics_reporting', labels: 'Select Analytics & Reporting' },
    { key: 'user_feedback_analytics_tools', labels: 'Select User Feedback and Analytics' },
  ];

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.all(
          inputs.map((input) =>
            fetch(
              `https://intranet.accionlabs.com/pmoreporting/platform_data/column_dropdown?dropdown_type=${input.key}`
            ).then((r) => r.json())
          )
        );
        const dataObj = {};
        inputs.forEach((input, idx) => {
          dataObj[input.key] = results[idx]?.values || [];
        });
        setOptions(dataObj);
      } catch (err) {
        console.error("Error fetching dropdowns:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (viewProject) {
      setViewValues({
        analytics_reporting: row["analytics_reporting"] || [],
        user_feedback_analytics_tools: row["user_feedback_analytics_tools"] || [],
      });
    }
  }, [viewProject, row]);

  useEffect(() => {
    if (viewProject) {
      onSelectedViewValuesChange?.(viewValues);
    } else {
      onSelectedValuesChange?.(selectedValues);
    }
  }, [viewValues, selectedValues, viewProject]);

  const handleToggle = (key, item) => {
    if (viewProject) {
      setViewValues((prev) => {
        const oldArr = prev[key] || [];
        const newArr = oldArr.includes(item)
          ? oldArr.filter((v) => v !== item)
          : [...oldArr, item];
        const updated = { ...prev, [key]: newArr };
        onSelectedViewValuesChange?.(updated);
        return updated;
      });
    } else {
      setSelectedValues((prev) => {
        const oldArr = prev[key] || [];
        const newArr = oldArr.includes(item)
          ? oldArr.filter((v) => v !== item)
          : [...oldArr, item];
        const updated = { ...prev, [key]: newArr };
        onSelectedValuesChange?.(updated);
        return updated;
      });
    }
  };

  const filterItems = (arr) =>
    arr.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const allSelected = [
    ...new Set([
      ...(selectedValues.analytics_reporting || []),
      ...(selectedValues.user_feedback_analytics_tools || []),
      ...(viewValues.analytics_reporting || []),
      ...(viewValues.user_feedback_analytics_tools || []),
    ]),
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: "15px" }}>
      <Box sx={{ display: 'flex', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        <Box sx={{ width: 625 }}>
          <FormControl fullWidth>
            <InputLabel>BI and Marketing</InputLabel>

            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Select
                multiple
                value={allSelected}
                renderValue={(selectedVals) => selectedVals.join(", ")}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 400,
                      width: 400,
                    },
                  },
                }}
                onClose={(event) => {
                  if (event?.target?.tagName === 'INPUT') event.stopPropagation();
                }}
              >
                <MenuItem
                  disableRipple
                  disableTouchRipple
                  style={{ cursor: "default" }}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </MenuItem>

                <Divider />

                {inputs.map((input) => {
                  const filteredItems = filterItems(options[input.key] || []);
                  const currentValues = viewProject
                    ? viewValues[input.key] || []
                    : selectedValues[input.key] || [];

                  return (
                    <React.Fragment key={input.key}>
                      <ListSubheader sx={{ bgcolor: "#f5f5f5" }}>
                        {input.labels}
                      </ListSubheader>

                      {filteredItems.length === 0 && (
                        <MenuItem disabled>
                          <em>No matches</em>
                        </MenuItem>
                      )}

                      {filteredItems.map((item) => {
                        const checked = currentValues.includes(item);
                        return (
                          <MenuItem
                            key={`${input.key}:${item}`}
                            value={item}
                            onClick={() => handleToggle(input.key, item)}
                          >
                            <Checkbox checked={checked} />
                            <ListItemText primary={item} />
                          </MenuItem>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </Select>
            )}
          </FormControl>
        </Box>
      </Box>
    </div>
  );
};

export default SectionFive;