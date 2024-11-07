import React, { useEffect } from "react";
import { Filter } from "../components/molecules/index";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

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
    onBuhChange(buhValue);
    onAccountChange(accountValue);
    onDdChange(ddValue);
    onProjectChange(projectValue);
  }, [buhValue, accountValue, ddValue, projectValue]);

  return (
    <Stack flexDirection="row">
      {/* BUH Filter */}
      <Filter
        input={buhInput}
        handleOnSelect={(event, newValue) => setBuhValue(newValue)} // Direct state update
        selectedValues={buhValue}
        isMultiSelect={false}
        placeholder={buhFilterPlaceholder}
      />

      {/* Account Filter */}
      <Filter
        input={accountInput}
        handleOnSelect={(event, newValue) => setAccountValue(newValue)} // Direct state update
        selectedValues={accountValue}
        isMultiSelect={false}
        placeholder={accountFilterPlaceholder}
      />

      {/* DD Filter */}
      <Filter
        input={ddInput}
        handleOnSelect={(event, newValue) => setDdValue(newValue)} // Direct state update
        selectedValues={ddValue}
        isMultiSelect={false}
        placeholder={ddFilterPlaceholder}
      />

      {/* Project Filter */}
      <Filter
        input={projectInput}
        handleOnSelect={(event, newValue) => setProjectValue(newValue)} // Direct state update
        selectedValues={projectValue}
        isMultiSelect={false}
        placeholder={projectFilterPlaceholder}
      />
      <Box ml="auto">
        <Button
          style={{
            backgroundColor: "grey",
            color: "white",
            width: "100%",
            height: "100%",
          }}
          onClick={handleClearAll}
        >
          Reset
        </Button>
      </Box>
    </Stack>
  );
}
