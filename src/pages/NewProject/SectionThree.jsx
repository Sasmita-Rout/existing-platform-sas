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
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
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

export default function SectionThree({
  row,
  viewProject,
  onSelectedValuesChange,
  onSelectedViewValuesChange,
}) {
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [customInputs, setCustomInputs] = useState({});
  const [newTechnology, setNewTechnology] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const [selectedValues, setSelectedValues] = useState({});
  const [viewValues, setViewValues] = useState({});

  const inputs = [
    { key: "environment", labels: "Select Environment" },
    { key: "cloud_technologies", labels: "Select Cloud Technologies" },
    { key: "enterprise_platforms", labels: "Select Enterprise Platforms" },
    { key: "data_engineering_etl_mdm_tools", labels: "Select Data Engg-ETL & MDM Tools" },
    { key: "devops_infrastructure_as_code_iac", labels: "Select DevOps" },
    { key: "low_code_environments", labels: "Select Low Code Environments" },
    { key: "version_control_system_vcs", labels: "Select VCS" },
    { key: "edge_computing", labels: "Select Edge Computing" },
    { key: "relational_databases_sql", labels: "Select Relational Databases (SQL)" },
    { key: "nosql_databases", labels: "Select NoSQL Databases" },
    { key: "in_memory_databases", labels: "Select In-Memory Databases" },
    { key: "mobile_cloud_computing", labels: "Select Mobile Cloud Computing" },
    { key: "system_monitoring_performance_tools", labels: "Select System Monitoring & Performance" },
    { key: "directory_services_identity_management", labels: "Select Directory Services" },
    { key: "ides", labels: "Select IDEs" },
    { key: "cms_applications", labels: "Select CMS Applications" },
    { key: "ipaas_integration_platform_as_a_service", labels: "Select iPaaS" },
    { key: "frontend_development", labels: "Select Frontend Development" },
    { key: "server_side_backend_frameworks", labels: "Select Server-Side & Back-End" },
    { key: "full_stack_development", labels: "Select Full-Stack Development" },
    { key: "mobile_development", labels: "Select Mobile Development" },
    { key: "api_development_data_access_technologies", labels: "Select API Development & Data Access" },
    { key: "application_integration_tools", labels: "Select Application Integration Tools" },
    { key: "unit_testing_frameworks", labels: "Select Unit Testing Frameworks" },
    { key: "programming_languages", labels: "Select Programming Languages" },
    { key: "code_quality_tools", labels: "Select Code Quality Tools" },
    { key: "test_coverage", labels: "Select Test Coverage" },
    { key: "productivity_measurement", labels: "Select Productivity Measurement" },
    { key: "tracing", labels: "Select Tracing" },
    { key: "cybersecurity_technologies", labels: "Select Cybersecurity Technologies" },
    { key: "containerization_orchestration", labels: "Select Containerization/Orchestration" },
    { key: "serverless_computing", labels: "Select Serverless Computing" },
    { key: "headless_cms", labels: "Select Headless CMS" },
    { key: "architecture_methodology", labels: "Select Architecture Methodology" },
    { key: "design_patterns", labels: "Select Design Patterns" },
    { key: "development_maturity_assessment", labels: "Select Development Maturity Assessment" },
    { key: "software_composition_analysis", labels: "Select Software Composition Analysis" },
    { key: "api_testing_tools", labels: "Select API Testing Tools" },
    { key: "behavioral_testing_tools", labels: "Select Behavioral Testing Tools" },
    { key: "deployment_methodologies", labels: "Select Deployment Methodologies" },
    { key: "cicd_tools", labels: "Select CI/CD Tools" },
    { key: "alerting_tools", labels: "Select Alerting Tools" },
    { key: "dependency_analysis", labels: "Select Dependency Analysis" },
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
      const initial = {};
      inputs.forEach(({ key }) => {
        initial[key] = row[key] || [];
      });
      setViewValues(initial);
    }
  }, [viewProject, row]);

  useEffect(() => {
    if (viewProject) {
      onSelectedViewValuesChange?.(viewValues);
    } else {
      onSelectedValuesChange?.(selectedValues);
    }
  }, [viewValues, selectedValues, viewProject]);

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

  const MAX_CHECKBOX_ITEMS = 5;

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
                const filtered = filterItems(options[input.key] || []);
                const currentValues = viewProject
                  ? viewValues[input.key] || []
                  : selectedValues[input.key] || [];

                // Get only first 5 items for checkboxes
                const checkboxItems = filtered.slice(0, MAX_CHECKBOX_ITEMS);
                // Get remaining items as a note
                const remainingCount = filtered.length - MAX_CHECKBOX_ITEMS;

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

                    {!viewProject && (
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
                    )}

                    {/* Display only first 5 items as checkboxes */}
                    {checkboxItems.map((item) => {
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