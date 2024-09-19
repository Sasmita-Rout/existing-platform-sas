import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export function GenericTabs({ tabs }) {
  console.log(tabs);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="pmo-table-panels"
        
        >
          {tabs.map(({ label }, i) => (
            <Tab label={label} key={i} className="fullWidth"></Tab>
            // <Tab label={label} key={i} className={"fullWidth " + (aria-selected ? 'colorBlack' : 'white')}></Tab>
          ))}
        </Tabs>
      </Box>
      {tabs.map(({ Component }, i) => (
        <CustomTabPanel value={value} index={i} key={i}>
          {Component}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

export default GenericTabs;
