import React, { useEffect } from "react";
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
  const [buhValue, setBuhValue] = React.useState(null);
  const [accountValue, setAccountValue] = React.useState(null);
  const [ddValue, setDdValue] = React.useState(null);
  const [projectValue, setProjectValue] = React.useState(null);

  const buhFilterPlaceholder = "Select BUH";
  const accountFilterPlaceholder = "Select Account";
  const ddFilterPlaceholder = "Select DD";
  const projectFilterPlaceholder = "Select Project";

  const handleClearAll = () => {
    setBuhValue(null);
    setAccountValue(null);
    setDdValue(null);
    setProjectValue(null);
  };

  useEffect(() => {
    onDdChange(ddValue);
    onBuhChange(buhValue);
    onAccountChange(accountValue);
    onProjectChange(projectValue);
  }, [buhValue, accountValue, ddValue, projectValue]);

  return (
    <Grid container>
      {/* BUH Filter */}
      <Grid size={2.7}>
        <Filter
          input={buhInput}
          handleOnSelect={(event, newValue) => setBuhValue(newValue)} // Direct state update
          selectedValues={buhValue}
          isMultiSelect={false}
          placeholder={buhFilterPlaceholder}
        />
      </Grid>

      {/* Account Filter */}
      <Grid size={2.7}>
        <Filter
          input={accountInput}
          handleOnSelect={(event, newValue) => setAccountValue(newValue)} // Direct state update
          selectedValues={accountValue}
          isMultiSelect={false}
          placeholder={accountFilterPlaceholder}
        />
      </Grid>

      {/* DD Filter */}
      <Grid size={2.7}>
        <Filter
          input={ddInput}
          handleOnSelect={(event, newValue) => setDdValue(newValue)} // Direct state update
          selectedValues={ddValue}
          isMultiSelect={false}
          placeholder={ddFilterPlaceholder}
        />
      </Grid>

      {/* Project Filter */}
      <Grid size={2.7}>
        <Filter
          input={projectInput}
          handleOnSelect={(event, newValue) => setProjectValue(newValue)} // Direct state update
          selectedValues={projectValue}
          isMultiSelect={false}
          placeholder={projectFilterPlaceholder}
        />
      </Grid>
      <Grid size={1}>
        <Button
          style={{
            backgroundColor: "grey",
            color: "white",
            // width: "100px",
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
