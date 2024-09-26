import React from "react";
import { FormControl,
  InputLabel,
  Select, } from "@mui/material";

const FilterInput = ({ label, value, onChange }) => (
  <FormControl fullWidth>
    <InputLabel id="buh-select-label">{label}</InputLabel>
    <Select
      value={value}
      label={label}
      onChange={(e) => onChange(e.target.value)}
    ></Select>
  </FormControl>
);

export default FilterInput;
