// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Checkbox,
//   ListItemText,
//   ListSubheader,
//   CircularProgress,
//   TextField,
//   Divider,
// } from "@mui/material";

// export default function SectionThree({
//   row,
//   viewProject,
//   onSelectedValuesChange,
//   onSelectedViewValuesChange,
// }) {
//   const [options, setOptions] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   const [selectedValues, setSelectedValues] = useState({});
//   const [viewValues, setViewValues] = useState({});

//   const inputs = [
//     { key: "environment", labels: "Select Environment" },
//     { key: "cloud_technologies", labels: "Select Cloud Technologies" },
//     { key: "enterprise_platforms", labels: "Select Enterprise Platforms" },
//     { key: "data_engineering_etl_mdm_tools", labels: "Select Data Engg-ETL & MDM Tools" },
//     { key: "devops_infrastructure_as_code_iac", labels: "Select DevOps" },
//     { key: "low_code_environments", labels: "Select Low Code Environments" },
//     { key: "version_control_system_vcs", labels: "Select VCS" },
//     { key: "edge_computing", labels: "Select Edge Computing" },
//     { key: "relational_databases_sql", labels: "Select Relational Databases (SQL)" },
//     { key: "nosql_databases", labels: "Select NoSQL Databases" },
//     { key: "in_memory_databases", labels: "Select In-Memory Databases" },
//     { key: "mobile_cloud_computing", labels: "Select Mobile Cloud Computing" },
//     { key: "system_monitoring_performance_tools", labels: "Select System Monitoring & Performance" },
//     { key: "directory_services_identity_management", labels: "Select Directory Services" },
//     { key: "ides", labels: "Select IDEs" },
//     { key: "cms_applications", labels: "Select CMS Applications" },
//     { key: "ipaas_integration_platform_as_a_service", labels: "Select iPaaS" },
//     { key: "frontend_development", labels: "Select Frontend Development" },
//     { key: "server_side_backend_frameworks", labels: "Select Server-Side & Back-End" },
//     { key: "full_stack_development", labels: "Select Full-Stack Development" },
//     { key: "mobile_development", labels: "Select Mobile Development" },
//     { key: "api_development_data_access_technologies", labels: "Select API Development & Data Access" },
//     { key: "application_integration_tools", labels: "Select Application Integration Tools" },
//     { key: "unit_testing_frameworks", labels: "Select Unit Testing Frameworks" },
//     { key: "programming_languages", labels: "Select Programming Languages" },
//     { key: "code_quality_tools", labels: "Select Code Quality Tools" },
//     { key: "test_coverage", labels: "Select Test Coverage" },
//     { key: "productivity_measurement", labels: "Select Productivity Measurement" },
//     { key: "tracing", labels: "Select Tracing" },
//     { key: "cybersecurity_technologies", labels: "Select Cybersecurity Technologies" },
//     { key: "containerization_orchestration", labels: "Select Containerization/Orchestration" },
//     { key: "serverless_computing", labels: "Select Serverless Computing" },
//     { key: "headless_cms", labels: "Select Headless CMS" },
//     { key: "architecture_methodology", labels: "Select Architecture Methodology" },
//     { key: "design_patterns", labels: "Select Design Patterns" },
//     { key: "development_maturity_assessment", labels: "Select Development Maturity Assessment" },
//     { key: "software_composition_analysis", labels: "Select Software Composition Analysis" },
//     { key: "api_testing_tools", labels: "Select API Testing Tools" },
//     { key: "behavioral_testing_tools", labels: "Select Behavioral Testing Tools" },
//     { key: "deployment_methodologies", labels: "Select Deployment Methodologies" },
//     { key: "cicd_tools", labels: "Select CI/CD Tools" },
//     { key: "alerting_tools", labels: "Select Alerting Tools" },
//     { key: "dependency_analysis", labels: "Select Dependency Analysis" },
//   ];

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const results = await Promise.all(
//           inputs.map((input) =>
//             fetch(
//               `https://intranet.accionlabs.com/pmoreporting/platform_data/column_dropdown?dropdown_type=${input.key}`
//             ).then((r) => r.json())
//           )
//         );
//         const dataObj = {};
//         inputs.forEach((input, idx) => {
//           dataObj[input.key] = results[idx]?.values || [];
//         });
//         setOptions(dataObj);
//       } catch (err) {
//         console.error("Error fetching dropdowns:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAll();
//   }, []);

//   useEffect(() => {
//     if (viewProject) {
//       const initial = {};
//       inputs.forEach(({ key }) => {
//         initial[key] = row[key] || [];
//       });
//       setViewValues(initial);
//     }
//   }, [viewProject, row]);

//   useEffect(() => {
//     if (viewProject) {
//       onSelectedViewValuesChange?.(viewValues);
//     } else {
//       onSelectedValuesChange?.(selectedValues);
//     }
//   }, [viewValues, selectedValues, viewProject]);

//   const handleToggle = (key, item) => {
//     if (viewProject) {
//       setViewValues((prev) => {
//         const arr = prev[key] || [];
//         const updatedArr = arr.includes(item)
//           ? arr.filter((v) => v !== item)
//           : [...arr, item];
//         const updated = { ...prev, [key]: updatedArr };
//         onSelectedViewValuesChange?.(updated);
//         return updated;
//       });
//     } else {
//       setSelectedValues((prev) => {
//         const arr = prev[key] || [];
//         const updatedArr = arr.includes(item)
//           ? arr.filter((v) => v !== item)
//           : [...arr, item];
//         const updated = { ...prev, [key]: updatedArr };
//         onSelectedValuesChange?.(updated);
//         return updated;
//       });
//     }
//   };

//   const filterItems = (arr) =>
//     arr.filter((item) =>
//       item.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//   const allSelected = [
//     ...new Set(
//       Object.values(viewProject ? viewValues : selectedValues).flat()
//     ),
//   ];

//   return (
//     <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginTop: "15px" }}>
//       <Box sx={{ display: "flex", flex: 1, flexWrap: "wrap", alignItems: "center" }}>
//         <Box sx={{ width: 625 }}>
//           <FormControl fullWidth>
//             <InputLabel>Environment, Infrastructure, System Related Info</InputLabel>

//             {loading ? (
//               <CircularProgress size={24} />
//             ) : (
//               <Select
//                 multiple
//                 value={allSelected}
//                 renderValue={(vals) => vals.join(", ")}
//                 MenuProps={{
//                   PaperProps: {
//                     style: { maxHeight: 500, width: 400 },
//                   },
//                 }}
//                 onClose={(event) => {
//                   if (event?.target?.tagName === "INPUT") event.stopPropagation();
//                 }}
//               >
//                 <MenuItem
//                   disableRipple
//                   disableTouchRipple
//                   style={{ cursor: "default" }}
//                   onKeyDown={(e) => e.stopPropagation()}
//                 >
//                   <TextField
//                     size="small"
//                     fullWidth
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </MenuItem>

//                 <Divider />

//                 {inputs.map((input) => {
//                   const filtered = filterItems(options[input.key] || []);
//                   const currentValues = viewProject
//                     ? viewValues[input.key] || []
//                     : selectedValues[input.key] || [];

//                   return (
//                     <React.Fragment key={input.key}>
//                       <ListSubheader sx={{ bgcolor: "#f5f5f5" }}>
//                         {input.labels}
//                       </ListSubheader>

//                       {filtered.length === 0 && (
//                         <MenuItem disabled>
//                           <em>No matches</em>
//                         </MenuItem>
//                       )}

//                       {filtered.map((item) => {
//                         const checked = currentValues.includes(item);
//                         return (
//                           <MenuItem
//                             key={`${input.key}:${item}`}
//                             value={item}
//                             onClick={() => handleToggle(input.key, item)}
//                           >
//                             <Checkbox checked={checked} />
//                             <ListItemText primary={item} />
//                           </MenuItem>
//                         );
//                       })}
//                     </React.Fragment>
//                   );
//                 })}
//               </Select>
//             )}
//           </FormControl>
//         </Box>
//       </Box>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
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
import EmergencyIcon from "@mui/icons-material/Emergency";

export default function SectionThree({
  row,
  viewProject,
  onSelectedValuesChange,
  onSelectedViewValuesChange,
}) {
  const [options, setOptions] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [viewValues, setViewValues] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Define dropdown inputs
  const inputs = [
    { key: "environment", labels: "Select Environment" },
    { key: "cloud_technologies", labels: "Select Cloud Technologies" },
    { key: "enterprise_platforms", labels: "Select Enterprise Platforms" },
    { key: "data_engineering_etl_mdm_tools", labels: "Select Data Engg-ETL & MDM Tools" },
    { key: "devops_infrastructure_as_code_iac", labels: "Select DevOps" },
    { key: "programming_languages", labels: "Select Programming Languages" },
    { key: "containerization_orchestration", labels: "Select Containerization / Orchestration" },
  ];

  // Fetch options for dropdowns
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

  // Load initial view values in view mode
  useEffect(() => {
    if (viewProject) {
      const updated = {};
      inputs.forEach((input) => {
        updated[input.key] = row[input.key] || [];
      });
      setViewValues(updated);
    }
  }, [viewProject, row]);

  // Notify parent on changes
  useEffect(() => {
    if (viewProject) {
      onSelectedViewValuesChange?.(viewValues);
    } else {
      onSelectedValuesChange?.(selectedValues);
    }
  }, [viewValues, selectedValues, viewProject]);

  // Select handlers
  const handleSelect = (key, newValues) => {
    setSelectedValues((prev) => {
      const updated = { ...prev, [key]: newValues };
      onSelectedValuesChange?.(updated);
      return updated;
    });
  };

  const handleViewSelect = (key, newValues) => {
    setViewValues((prev) => {
      const updated = { ...prev, [key]: newValues };
      onSelectedViewValuesChange?.(updated);
      return updated;
    });
  };

  const handleFilterSelect = (key, newValues) => {
    viewProject ? handleViewSelect(key, newValues) : handleSelect(key, newValues);
  };

  // Toggle items in multi-select
  const handleToggle = (key, item) => {
    const current = viewProject ? viewValues[key] || [] : selectedValues[key] || [];
    const updatedArray = current.includes(item)
      ? current.filter((v) => v !== item)
      : [...current, item];
    handleFilterSelect(key, updatedArray);
  };

  // Filter options by search
  const filterItems = (arr) =>
    arr.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));

  // Flatten for display in Select
  const allSelected = inputs.flatMap((input) =>
    (viewProject ? viewValues[input.key] : selectedValues[input.key] || []).map(
      (item) => `${input.key}:${item}`
    )
  );

  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginTop: "15px" }}>
      <Box sx={{ display: "flex", flex: 1, flexWrap: "wrap", alignItems: "center" }}>
        <Box sx={{ width: 625 }}>
          <Typography variant="subtitle1" sx={{ fontSize: 14, marginBottom: 1 }}>
            Environment, Infrastructure, and System Info
            <EmergencyIcon style={{ fontSize: "small", color: "red", marginLeft: 4 }} />
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Environment Details</InputLabel>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Select
                multiple
                value={allSelected}
                renderValue={(selectedVals) =>
                  selectedVals.map((v) => v.split(":")[1]).join(", ")
                }
                MenuProps={{
                  PaperProps: { style: { maxHeight: 400, width: 400 } },
                }}
                onClose={(event) => {
                  if (event?.target?.tagName === "INPUT") event.stopPropagation();
                }}
              >
                {/* Search bar */}
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

                {/* Render grouped options */}
                {inputs.map((input) => {
                  const filtered = filterItems(options[input.key] || []);
                  const current = viewProject
                    ? viewValues[input.key] || []
                    : selectedValues[input.key] || [];

                  return (
                    <React.Fragment key={input.key}>
                      <ListSubheader sx={{ bgcolor: "#f5f5f5" }}>{input.labels}</ListSubheader>
                      {filtered.length === 0 && (
                        <MenuItem disabled>
                          <em>No matches</em>
                        </MenuItem>
                      )}
                      {filtered.map((item) => {
                        const checked = current.includes(item);
                        const value = `${input.key}:${item}`;
                        return (
                          <MenuItem
                            key={value}
                            value={value}
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
}