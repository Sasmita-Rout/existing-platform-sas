import React, { useEffect, useState } from "react";
import { Filter } from "../components/molecules/index";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";

export default function FilterOptions({
  buhInput,
  accountInput,
  ddInput,
  projectInput,
  onBuhChange,
  onAccountChange,
  onDdChange,
  onProjectChange,
}) {
  const [loading, setLoading] = useState(true);
  const [buhValue, setBuhValue] = useState(null);
  const [accountValue, setAccountValue] = useState(null);
  const [ddValue, setDdValue] = useState(null);
  const [projectValue, setProjectValue] = useState(null);

  // State for filtered options
  const [filteredDdOptions, setFilteredDdOptions] = useState(ddInput || []);
  const [filteredAccountOptions, setFilteredAccountOptions] = useState(accountInput || []);
  const [filteredProjectOptions, setFilteredProjectOptions] = useState(projectInput || []);

  // Function to fetch filtered data based on current selections
  const fetchFilteredData = async () => {
    try {
      // Build query params based on selected values
      const queryParams = new URLSearchParams();
      if (buhValue) queryParams.append('buh_name', buhValue);
      if (ddValue) queryParams.append('dd_name', ddValue);
      if (accountValue) queryParams.append('account_name', accountValue);
      if (projectValue) queryParams.append('project_name', projectValue);
      queryParams.append('page', '1');
      queryParams.append('page_size', '100');

      const response = await fetch(
        `https://intranet.accionlabs.com/pmoreporting/platform_data/search_advanced?${queryParams.toString()}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching filtered data:', error);
      return null;
    }
  };

  // Handle BUH selection
  const handleBuhChange = async (event, newValue) => {
    setBuhValue(newValue);
    onBuhChange(newValue);

    try {
      const data = await fetchFilteredData();
      if (data?.records) {
        // Update DD options based on BUH selection
        const uniqueDds = [...new Set(data.records.map(record => record.dd_name))].filter(Boolean).sort();
        setFilteredDdOptions(uniqueDds);
      }
    } catch (error) {
      console.error('Error updating DD options:', error);
    }
  };

  // Handle DD selection
  const handleDdChange = async (event, newValue) => {
    setDdValue(newValue);
    onDdChange(newValue);

    try {
      const data = await fetchFilteredData();
      if (data?.records) {
        // Update Account options based on DD selection
        const uniqueAccounts = [...new Set(data.records.map(record => record.account_name))].filter(Boolean).sort();
        setFilteredAccountOptions(uniqueAccounts);
      }
    } catch (error) {
      console.error('Error updating Account options:', error);
    }
  };

  // Handle Account selection
  const handleAccountChange = async (event, newValue) => {
    setAccountValue(newValue);
    onAccountChange(newValue);

    try {
      const data = await fetchFilteredData();
      if (data?.records) {
        // Update Project options based on Account selection
        const uniqueProjects = [...new Set(data.records.map(record => record.project_name))].filter(Boolean).sort();
        setFilteredProjectOptions(uniqueProjects);
      }
    } catch (error) {
      console.error('Error updating Project options:', error);
    }
  };

  // Handle Project selection
  const handleProjectChange = (event, newValue) => {
    setProjectValue(newValue);
    onProjectChange(newValue);
  };

  const handleClearAll = () => {
    setBuhValue(null);
    setDdValue(null);
    setAccountValue(null);
    setProjectValue(null);
    // Reset to original options
    setFilteredDdOptions([...(ddInput || [])].sort());
    setFilteredAccountOptions([...(accountInput || [])].sort());
    setFilteredProjectOptions([...(projectInput || [])].sort());
    onBuhChange(null);
    onDdChange(null);
    onAccountChange(null);
    onProjectChange(null);
  };

  // Initialize filters with props
  useEffect(() => {
    setFilteredDdOptions([...(ddInput || [])].sort());
    setFilteredAccountOptions([...(accountInput || [])].sort());
    setFilteredProjectOptions([...(projectInput || [])].sort());
    setLoading(false);
  }, [ddInput, accountInput, projectInput]);

  return (
    <Grid container spacing={2}>
      <Grid size={2.7}>
        <Filter
          input={[...(buhInput || [])].sort()}
          handleOnSelect={handleBuhChange}
          selectedValues={buhValue}
          isMultiSelect={false}
          placeholder="Select BUH"
          disabled={loading}
        />
      </Grid>

      <Grid size={2.7}>
        <Filter
          input={filteredDdOptions}
          handleOnSelect={handleDdChange}
          selectedValues={ddValue}
          isMultiSelect={false}
          placeholder="Select DD"
        />
      </Grid>

      <Grid size={2.7}>
        <Filter
          input={filteredAccountOptions}
          handleOnSelect={handleAccountChange}
          selectedValues={accountValue}
          isMultiSelect={false}
          placeholder="Select Account"
        />
      </Grid>

      <Grid size={2.7}>
        <Filter
          input={filteredProjectOptions}
          handleOnSelect={handleProjectChange}
          selectedValues={projectValue}
          isMultiSelect={false}
          placeholder="Select Project"
        />
      </Grid>

      <Grid size={1}>
        <Button
          style={{
            backgroundColor: "grey",
            color: "white",
            height: "100%",
          }}
          onClick={handleClearAll}
        >
          Reset
        </Button>
      </Grid>
    </Grid>
  );
}