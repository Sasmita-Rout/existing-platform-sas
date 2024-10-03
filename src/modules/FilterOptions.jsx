import React from "react";
import { Filter } from "../components/molecules/index";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

export default function FilterOptions({
  buhInput,
  accountInput,
  ddInput,
  projectInput,
}) {
  const [buhValue, setBuhValue] = React.useState(null);
  const [accountValue, setAccountValue] = React.useState(null);
  const [ddValue, setDdValue] = React.useState(null);
  const [projectValue, setProjectValue] = React.useState(null);

  const buhFilterPlaceholder = "Select BUH";
  const accountFilterPlaceholder = "Select Account";
  const ddFilterPlaceholder = "Select DD";
  const projectFilterPlaceholder = "Select Project";

  return (
    <Stack flexDirection="row">
      {/* BUH Filter */}
      <Filter
        input={buhInput}
        handleOnSelect={(event, newValue) => setBuhValue(newValue)} // Direct state update
        selectedValues={buhValue}
        isMultiSelect={false}
        placeholder={buhFilterPlaceholder}
        onFocus={buhFilterPlaceholder}
        onBlur={buhFilterPlaceholder}
        showIcon={false}
      />

      {/* Account Filter */}
      <Filter
        input={accountInput}
        handleOnSelect={(event, newValue) => setAccountValue(newValue)} // Direct state update
        selectedValues={accountValue}
        isMultiSelect={false}
        placeholder={accountFilterPlaceholder}
        onFocus={accountFilterPlaceholder}
        onBlur={accountFilterPlaceholder}
        showIcon={false}
      />

      {/* DD Filter */}
      <Filter
        input={ddInput}
        handleOnSelect={(event, newValue) => setDdValue(newValue)} // Direct state update
        selectedValues={ddValue}
        isMultiSelect={false}
        placeholder={ddFilterPlaceholder}
        onFocus={ddFilterPlaceholder}
        onBlur={ddFilterPlaceholder}
      />

      {/* Project Filter */}
      <Filter
        input={projectInput}
        handleOnSelect={(event, newValue) => setProjectValue(newValue)} // Direct state update
        selectedValues={projectValue}
        isMultiSelect={false}
        placeholder={projectFilterPlaceholder}
        onFocus={projectFilterPlaceholder}
        onBlur={projectFilterPlaceholder}
      />
      <Box ml="auto">
        <Button
          style={{
            backgroundColor: "grey",
            color: "white",
            marginBottom: "5px",
          }}
        >
          Reset
        </Button>
      </Box>
    </Stack>
  );
}
