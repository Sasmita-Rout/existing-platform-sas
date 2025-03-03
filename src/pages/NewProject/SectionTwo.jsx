import React from "react";
import { Filter } from "../../components/molecules/index";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EmergencyIcon from "@mui/icons-material/Emergency";
import { DropdownCustom } from "../../components/atoms/DropdownCustom";

export default function SectionTwo(props) {
  const {
    domainInput,
    applicationInput,
    domainValue,
    applicationValue,
    setValue,
    disableButton,
  } = props;

  const domainPlaceholder = "Select Domain";
  const applicationClassPlaceholder = "Feature Enhancements, New Production";

  const handleFilterSelect = (key, newValue) => {
    handleSelect(key, newValue);
  };

  const [selectedValues, setSelectedValues] = React.useState({});
  const [viewValues, setViewValues] = React.useState({});

  const handleSelect = (key, newValue) => {
    setSelectedValues((prevValues) => {
      const updatedValues = { ...prevValues, [key]: newValue };
      if (onSelectedValuesChange) {
        onSelectedValuesChange(updatedValues);
      }
      return updatedValues;
    });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: "15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Box sx={{ marginRight: 2 }}>
          <Typography variant="subtitle1" sx={{ fontSize: 14 }} gutterBottom>
                        <EmergencyIcon style={{ fontSize: "small", color: "red" }} />Domain
                    </Typography>
                    <Filter
                        input={domainInput}
                        onFocus="Select..."
                        onBlur={domainPlaceholder}
                        handleOnSelect={(event, newValue) => setValue("domainValue", newValue)}
                        selectedValues={domainValue}
                        isMultiSelect={false}
                        placeholder={domainPlaceholder}
                        showIcon={false}
                        // disabled={!disableButton}
                    />
          {/* <Typography variant="subtitle1" sx={{ fontSize: 14 }} gutterBottom>
            <EmergencyIcon style={{ fontSize: "small", color: "red" }} />
            Domain
          </Typography>
          <DropdownCustom
            input={domainInput}
            // row={row}
            onFocus="Select..."
            onBlur="Domain"
            placeholder={domainPlaceholder}
            handleSelect={(newValue) =>
              handleFilterSelect("domainValue", newValue)
            }
            selectedValues={domainValue}
            onSelectedValuesChange={domainValue}
            // props={props}
          /> */}
        </Box>

        <Box sx={{ marginRight: 2 }}>
          <Typography variant="subtitle1" sx={{ fontSize: 14 }} gutterBottom>
            <EmergencyIcon style={{ fontSize: "small", color: "red" }} />
            Application Class
          </Typography>
          <Filter
            input={applicationInput}
            onFocus="Select..."
            onBlur={applicationClassPlaceholder}
            handleOnSelect={(event, newValue) =>
              setValue("applicationValue", newValue)
            }
            selectedValues={applicationValue}
            isMultiSelect={false}
            placeholder={applicationClassPlaceholder}
            showIcon={false}
            // disabled={!disableButton}
          />
          {/* <DropdownCustom
            input={applicationInput}
            // row={row}
            onFocus="Select..."
            onBlur="Domain"
            placeholder={applicationClassPlaceholder}
            handleSelect={(newValue) =>
              handleFilterSelect("applicationValue", newValue)
            }
            selectedValues={applicationValue}
            onSelectedValuesChange={applicationValue}
            // props={props}
          /> */}
        </Box>
      </Box>
    </div>
  );
}
