import React, { useEffect, useState } from "react";
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

export default function SectionThree({
  row,
  viewProject,
  onSelectedValuesChange,
  onSelectedViewValuesChange,
}) {
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [newTechnology, setNewTechnology] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});

  const [selectedValues, setSelectedValues] = useState({});
  const [viewValues, setViewValues] = useState({});

  const inputs = [
    { key: "environment", labels: "Select Environment" },
    { key: "cloud_technologies", labels: "Select Cloud Technologies" },
    { key: "serverless_computing", labels: "Select Serverless Computing" },
    { key: "mobile_cloud_computing", labels: "Select Mobile Cloud Computing" },
    { key: "edge_computing", labels: "Select Edge Computing" },
    { key: "enterprise_platforms", labels: "Select Enterprise Platforms" },
    { key: "relational_databases_sql", labels: "Select Relational Databases (SQL)" },
    { key: "nosql_databases", labels: "Select NoSQL Databases" },
    { key: "in_memory_databases", labels: "Select In-Memory Databases" },
    { key: "system_monitoring_performance_tools", labels: "Select System Monitoring & Performance" },
    { key: "directory_services_identity_management", labels: "Select Directory Services & Identity Management" },
  ];

  // function to handle custom technology addition
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

  const handleToggle = (key, item) => {
    if (viewProject) {
      setViewValues((prev) => {
        const arr = prev[key] || [];
        const updatedArr = arr.includes(item)
          ? arr.filter((v) => v !== item)
          : [...arr, item];
        const updated = { ...prev, [key]: updatedArr };
        onSelectedViewValuesChange?.(updated);
        return updated;
      });
    } else {
      setSelectedValues((prev) => {
        const arr = prev[key] || [];
        const updatedArr = arr.includes(item)
          ? arr.filter((v) => v !== item)
          : [...arr, item];
        const updated = { ...prev, [key]: updatedArr };
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

  useEffect(() => {
    const fetchAll = async () => {
      try {
        console.log('SectionThree - Starting fetch...');
        const response = await fetch(
          `https://intranet.accionlabs.com/pmoreporting/platform_data/column_dropdown`
        ).then((r) => r.json());

        console.log('SectionThree - API Response:', response);

        // Handle both response formats: {values: {...}} or direct object
        const result = response.values || response;
        console.log('SectionThree - Normalized result:', result);

        const dataObj = {};
        inputs.forEach((input) => {
          const apiValues = result[input.key];
          dataObj[input.key] = apiValues && apiValues.length > 0 ? apiValues : [];
          console.log(`SectionThree - ${input.key}:`, dataObj[input.key]?.length, 'items');
        });
        console.log('SectionThree - Fetched options:', dataObj);
        setOptions(dataObj);
      } catch (err) {
        console.error("SectionThree - Error fetching dropdowns:", err);
        setOptions({});
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (viewProject && row) {
      console.log('SectionThree - viewProject and row detected');
      const initial = {};
      inputs.forEach(({ key }) => {
        const value = row[key];
        console.log(`SectionThree - row[${key}]:`, value, 'type:', typeof value);
        if (Array.isArray(value)) {
          initial[key] = value;
        } else if (value) {
          initial[key] = ensureArray(value);
        } else {
          initial[key] = [];
        }
        console.log(`SectionThree - initial[${key}]:`, initial[key]);
      });
      console.log('SectionThree - Setting viewValues:', initial);
      setViewValues(initial);
      // Initialize parent's update state with current values
      onSelectedViewValuesChange?.(initial);
    }
  }, [viewProject, row]);

  const allSelected = [
    ...new Set(
      Object.values(viewProject ? viewValues : selectedValues).flat()
    ),
  ];

  // return (
  //   <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginTop: "15px" }}>
  //     <Box sx={{ display: "flex", flex: 1, flexWrap: "wrap", alignItems: "center" }}>
  //       <Box sx={{ width: 625 }}>
  //         <FormControl fullWidth>
  //           <InputLabel>Environment, Infrastructure, System Related Info</InputLabel>

  //           {loading ? (
  //             <CircularProgress size={24} />
  //           ) : (
  //             <Select
  //               multiple
  //               value={allSelected}
  //               renderValue={(vals) => vals.join(", ")}
  //               MenuProps={{
  //                 PaperProps: {
  //                   style: { maxHeight: 500, width: 400 },
  //                 },
  //               }}
  //               onClose={(event) => {
  //                 if (event?.target?.tagName === "INPUT") event.stopPropagation();
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
  //                 const filtered = filterItems(options[input.key] || []);
  //                 const currentValues = viewProject
  //                   ? viewValues[input.key] || []
  //                   : selectedValues[input.key] || [];

  //                 return (
  //                   <React.Fragment key={input.key}>
  //                     <ListSubheader sx={{ bgcolor: "#f5f5f5" }}>
  //                       {input.labels}
  //                     </ListSubheader>

  //                     {filtered.length === 0 && (
  //                       <MenuItem disabled>
  //                         <em>No matches</em>
  //                       </MenuItem>
  //                     )}

  //                     {filtered.map((item) => {
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

  // change the return if needed,
  return (
  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginTop: "15px" }}>
    <Box sx={{ display: "flex", flex: 1, flexWrap: "wrap", alignItems: "center" }}>
      <Box sx={{ width: 625 }}>
        <FormControl fullWidth>
          <InputLabel>Environment, Infrastructure, System Related Info</InputLabel>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <Select
              multiple
              value={allSelected}
              renderValue={(vals) => vals.join(", ")}
              onClose={() => setSearchTerm("")}
              MenuProps={{
                PaperProps: {
                  style: { maxHeight: 500, width: 400 },
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
                const filtered = filterItems(options[input.key] || []);
                const currentValues = viewProject
                  ? viewValues[input.key] || []
                  : selectedValues[input.key] || [];

                return (
                  <React.Fragment key={input.key}>
                    <ListSubheader
                      sx={{
                        bgcolor: "#f5f5f5",
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      {input.labels}
                    </ListSubheader>

                    <CustomInputMenuItem>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        width: '100%'
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
                    {(expandedCategories[input.key] || searchTerm ? filtered : filtered.slice(0, MAX_CHECKBOX_ITEMS)).map((item) => {
                      const checked = ensureArray(currentValues).includes(item);
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

                    {/* Show More/Less Button */}
                    {!searchTerm && filtered.length > MAX_CHECKBOX_ITEMS && (
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
                            : `Show ${filtered.length - MAX_CHECKBOX_ITEMS} More`}
                        </Button>
                      </CustomInputMenuItem>
                    )}

                    {/* Display custom added items */}
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
                                  sx={{ ml: 1, height: 20 }}
                                />
                              </Box>
                            }
                          />
                        </MenuItem>
                      ))}

                    {filtered.length === 0 && ensureArray(currentValues).length === 0 && (
                      <MenuItem disabled>
                        <em>No items</em>
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
}