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
  Button,
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const MAX_CHECKBOX_ITEMS = 5;

const CustomInputMenuItem = React.forwardRef(({ children, ...props }, ref) => (
  <MenuItem
    {...props}
    ref={ref}
    disableRipple
    disableTouchRipple
    style={{ cursor: 'default' }}
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </MenuItem>
));
const ensureArray = (value) => {
  if (!value || value === '') return [];
  if (Array.isArray(value)) {
    // Remove duplicates and filter out empty values
    return [...new Set(value)].filter(item => item && item !== '');
  }
  // Split by comma and trim whitespace for comma-separated strings
  if (typeof value === 'string' && value.includes(',')) {
    const items = value.split(',').map(item => item.trim()).filter(item => item !== '');
    // Remove duplicates
    return [...new Set(items)];
  }
  return [value];
};

const SectionFive = ({ row, viewProject, onSelectedValuesChange, onSelectedViewValuesChange, AnalyticsReporting = [] , SelectUserFeedbackandAnalytics = [] }) => {
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedValues, setSelectedValues] = useState({});
  const [viewValues, setViewValues] = useState({});
  const [newTechnology, setNewTechnology] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});

  // Add handleAddCustomTechnology function
  const handleAddCustomTechnology = (key) => {
    if (!newTechnology.trim()) return;

    if (viewProject) {
      setViewValues((prev) => {
        const arr = prev[key] || [];
        const updated = { ...prev, [key]: [...arr, newTechnology.trim()] };
        onSelectedViewValuesChange?.(updated);
        return updated;
      });
    } else {
      setSelectedValues((prev) => {
        const arr = prev[key] || [];
        const updated = { ...prev, [key]: [...arr, newTechnology.trim()] };
        onSelectedValuesChange?.(updated);
        return updated;
      });
    }
    setNewTechnology("");
    setActiveCategory("");
  };

  const inputs = [
    { key: 'analytics_reporting', labels: 'Select Analytics & Reporting' },
    { key: 'user_feedback_analytics_tools', labels: 'Select User Feedback and Analytics' },
  ];

  useEffect(() => {
    const fetchAll = async () => {
      try {
        console.log('SectionFive - Starting fetch...');
        const response = await fetch(
          `https://intranet.accionlabs.com/pmoreporting/platform_data/column_dropdown`
        ).then((r) => r.json());

        console.log('SectionFive - API Response:', response);

        // Handle both response formats: {values: {...}} or direct object
        const result = response.values || response;
        console.log('SectionFive - Normalized result:', result);

        const dataObj = {};
        inputs.forEach((input) => {
          const apiValues = result[input.key];
          dataObj[input.key] = apiValues && apiValues.length > 0 ? apiValues : [];
          console.log(`SectionFive - ${input.key}:`, dataObj[input.key]?.length, 'items');
        });
        console.log('SectionFive - Fetched options:', dataObj);
        setOptions(dataObj);
      } catch (err) {
        console.error("SectionFive - Error fetching dropdowns:", err);
        setOptions({});
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (viewProject && row) {
      console.log('SectionFive - viewProject and row detected');
      const initial = {};
      inputs.forEach(({ key }) => {
        const value = row[key];
        console.log(`SectionFive - row[${key}]:`, value, 'type:', typeof value);
        if (Array.isArray(value)) {
          initial[key] = value;
        } else if (value) {
          initial[key] = ensureArray(value);
        } else {
          initial[key] = [];
        }
        console.log(`SectionFive - initial[${key}]:`, initial[key]);
      });
      console.log('SectionFive - Setting viewValues:', initial);
      setViewValues(initial);
    }
  }, [viewProject, row]);

  // Safe getter for current values
  const getCurrentValues = (key) => {
    if (viewProject) {
      return ensureArray(viewValues[key]);
    }
    return ensureArray(selectedValues[key]);
  };
  // Modified allSelected to use ensureArray
  const allSelected = [
    ...new Set([
      ...ensureArray(selectedValues.analytics_reporting),
      ...ensureArray(selectedValues.user_feedback_analytics_tools),
      ...ensureArray(viewValues.analytics_reporting),
      ...ensureArray(viewValues.user_feedback_analytics_tools),
    ]),
  ];

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

  const toggleExpanded = (key) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };



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
                onClose={() => setSearchTerm("")}
                MenuProps={{
                  PaperProps: {
                    style: { maxHeight: 400, width: 400 },
                  },
                }}
              >
                <CustomInputMenuItem>
                  <TextField
                    size="small"
                    fullWidth
                    autoFocus
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                      e.stopPropagation();
                      setSearchTerm(e.target.value);
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  />
                </CustomInputMenuItem>

                <Divider />

                {inputs.map((input) => {
                  const filteredItems = filterItems(options[input.key] || []);
                  const currentValues = getCurrentValues(input.key);

                  return (
                    <React.Fragment key={input.key}>
                      <ListSubheader sx={{ bgcolor: "#f5f5f5" }}>
                        {input.labels}
                      </ListSubheader>

                      {/* Custom Input Field */}
                      <CustomInputMenuItem>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          width: '100%',
                          px: 1
                        }}>
                          <TextField
                            size="small"
                            fullWidth
                            placeholder="Add custom technology..."
                            value={activeCategory === input.key ? newTechnology : ''}
                            onChange={(e) => {
                              e.stopPropagation();
                              setActiveCategory(input.key);
                              setNewTechnology(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              e.stopPropagation();
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddCustomTechnology(input.key);
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddCustomTechnology(input.key);
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </CustomInputMenuItem>

                      {/* Display filtered items as checkboxes with expand/collapse */}
                      {(expandedCategories[input.key] || searchTerm ? filteredItems : filteredItems.slice(0, MAX_CHECKBOX_ITEMS)).map((item) => (
                        <MenuItem
                          key={`${input.key}:${item}`}
                          value={item}
                          onClick={() => handleToggle(input.key, item)}
                        >
                          <Checkbox checked={currentValues.includes(item)} />
                          <ListItemText primary={item} />
                        </MenuItem>
                      ))}

                      {/* Show More/Less Button */}
                      {!searchTerm && filteredItems.length > MAX_CHECKBOX_ITEMS && (
                        <CustomInputMenuItem>
                          <Button
                            size="small"
                            fullWidth
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpanded(input.key);
                            }}
                            endIcon={expandedCategories[input.key] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            sx={{ justifyContent: 'center', textTransform: 'none' }}
                          >
                            {expandedCategories[input.key]
                              ? 'Show Less'
                              : `Show ${filteredItems.length - MAX_CHECKBOX_ITEMS} More`}
                          </Button>
                        </CustomInputMenuItem>
                      )}

                      {/* Custom Added Items */}
                      {ensureArray(currentValues)
                        .filter(item => !options[input.key]?.includes(item))
                        .map((item) => (
                          <MenuItem
                            key={`${input.key}:${item}`}
                            value={item}
                            onClick={() => handleToggle(input.key, item)}
                          >
                            <Checkbox checked={true} />
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  {item}
                                  <Chip
                                    size="small"
                                    label="Custom"
                                    color="primary"
                                    sx={{ ml: 1, height: 20 }}
                                  />
                                </Box>
                              }
                            />
                          </MenuItem>
                        ))}

                      {filteredItems.length === 0 && ensureArray(currentValues).length === 0 && (
                        <MenuItem disabled>
                          <em>No items available</em>
                        </MenuItem>
                      )}
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