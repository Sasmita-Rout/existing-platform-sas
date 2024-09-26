import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Grid,
} from "@mui/material";
import useStore from "../../zustand/store";
import FilterInput from "../../components/molecules/FilterInput";

const FilterBar = () => {
  const {
    projects,
    selectedBUH,
    selectedAccount,
    selectedDD,
    selectedProject,
    setSelectedBUH,
    setSelectedAccount,
    setSelectedDD,
    setSelectedProject,
    resetFilters,
  } = useStore();
  const handleBUHChange = (event) => {
    setSelectedBUH(event.target.value);
  };

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const handleDDChange = (event) => {
    setSelectedDD(event.target.value);
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const handleReset = () => {
    resetFilters();
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2.5}>
          <FormControl fullWidth>
            <InputLabel id="buh-select-label">Select BUH</InputLabel>
            <Select
              labelId="buh-select-label"
              id="buh-select"
              value={selectedBUH}
              label="Select BUH"
              onChange={handleBUHChange}
            >
              <MenuItem value="">
                <em>All BUH</em>
              </MenuItem>
              {projects?.bhu_name?.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2.5}>
          <FormControl fullWidth>
            <InputLabel id="account-select-label">Select Account</InputLabel>
            <Select
              labelId="account-select-label"
              id="account-select"
              value={selectedAccount}
              label="Select Account"
              onChange={handleAccountChange}
            >
              <MenuItem value="">
                <em>All Accounts</em>
              </MenuItem>
              {projects?.account_name?.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2.5}>
          <FormControl fullWidth>
            <InputLabel id="dd-select-label">Select DD</InputLabel>
            <Select
              labelId="dd-select-label"
              id="dd-select"
              value={selectedDD}
              label="Select DD"
              onChange={handleDDChange}
            >
              <MenuItem value="">
                <em>All DD</em>
              </MenuItem>
              {projects?.dd_name?.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2.5}>
          <FormControl fullWidth>
            <InputLabel id="project-select-label">Select Project</InputLabel>
            <Select
              labelId="project-select-label"
              id="project-select"
              value={selectedProject}
              label="Select Project"
              onChange={handleProjectChange}
            >
              <MenuItem value="">
                <em>All Projects</em>
              </MenuItem>
              {projects?.project_name?.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2}>
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterBar;
