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

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

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
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const SectionFive = ({ row, viewProject, onSelectedValuesChange, onSelectedViewValuesChange, AnalyticsReporting = [] , SelectUserFeedbackandAnalytics = [] }) => {
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedValues, setSelectedValues] = useState({});
  const [viewValues, setViewValues] = useState({});
  const [newTechnology, setNewTechnology] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

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

  

  // return (
  //   <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: "15px" }}>
  //     <Box sx={{ display: 'flex', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
  //       <Box sx={{ width: 625 }}>
  //         <FormControl fullWidth>
  //           <InputLabel>BI and Marketing</InputLabel>

  //           {loading ? (
  //             <CircularProgress size={24} />
  //           ) : (
  //             <Select
  //               multiple
  //               value={allSelected}
  //               renderValue={(selectedVals) => selectedVals.join(", ")}
  //               MenuProps={{
  //                 PaperProps: {
  //                   style: {
  //                     maxHeight: 400,
  //                     width: 400,
  //                   },
  //                 },
  //               }}
  //               onClose={(event) => {
  //                 if (event?.target?.tagName === 'INPUT') event.stopPropagation();
  //               }}
  //             >
  //               <MenuItem
  //                 disableRipple
  //                 disableTouchRipple
  //                 style={{ cursor: "default" }}
  //                 onKeyDown={(e) => e.stopPropagation()}
  //               >
  //                 <TextField
  //                   size="small"
  //                   fullWidth
  //                   placeholder="Search..."
  //                   value={searchTerm}
  //                   onChange={(e) => setSearchTerm(e.target.value)}
  //                 />
  //               </MenuItem>

  //               <Divider />

  //               {inputs.map((input) => {
  //                 const filteredItems = filterItems(options[input.key] || []);
  //                 const currentValues = viewProject
  //                   ? viewValues[input.key] || []
  //                   : selectedValues[input.key] || [];

  //                 return (
  //                   <React.Fragment key={input.key}>
  //                     <ListSubheader sx={{ bgcolor: "#f5f5f5" }}>
  //                       {input.labels}
  //                     </ListSubheader>

  //                     {filteredItems.length === 0 && (
  //                       <MenuItem disabled>
  //                         <em>No matches</em>
  //                       </MenuItem>
  //                     )}

  //                     {filteredItems.map((item) => {
  //                       const checked = currentValues.includes(item);
  //                       return (
  //                         <MenuItem
  //                           key={`${input.key}:${item}`}
  //                           value={item}
  //                           onClick={() => handleToggle(input.key, item)}
  //                         >
  //                           <Checkbox checked={checked} />
  //                           <ListItemText primary={item} />
  //                         </MenuItem>
  //                       );
  //                     })}
  //                   </React.Fragment>
  //                 );
  //               })}
  //             </Select>
  //           )}
  //         </FormControl>
  //       </Box>
  //     </Box>
  //   </div>
  // );
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
                    style: { maxHeight: 400, width: 400 },
                  },
                }}
              >
                <CustomInputMenuItem>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                      e.stopPropagation();
                      setSearchTerm(e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </CustomInputMenuItem>

                <Divider />

                {inputs.map((input) => {
                  const filteredItems = filterItems(options[input.key] || []);
                  const currentValues = getCurrentValues(input.key);
                    // ? viewValues[input.key] || []
                    // : selectedValues[input.key] || [];

                  // Get only first 5 items for checkboxes
                  const checkboxItems = filteredItems.slice(0, MAX_CHECKBOX_ITEMS);
                  const remainingCount = filteredItems.length - MAX_CHECKBOX_ITEMS;

                  return (
                    <React.Fragment key={input.key}>
                      <ListSubheader sx={{ bgcolor: "#f5f5f5" }}>
                        {input.labels}
                      </ListSubheader>

                      {/* Custom Input Field */}
                      {!viewProject && (
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
                      )}

                      {/* Checkbox Items (Limited to 5) */}
                      {checkboxItems.map((item) => (
                        <MenuItem
                          key={`${input.key}:${item}`}
                          value={item}
                          onClick={() => handleToggle(input.key, item)}
                        >
                          <Checkbox checked={currentValues.includes(item)} />
                          <ListItemText primary={item} />
                        </MenuItem>
                      ))}

                      {/* Remaining Items Note */}
                      {/* {remainingCount > 0 && (
                        <MenuItem disabled>
                          <ListItemText 
                            secondary={`${remainingCount} more items available. Use custom input to add them.`}
                            sx={{ fontSize: '0.75rem', color: 'text.secondary' }}
                          />
                        </MenuItem>
                      )} */}

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