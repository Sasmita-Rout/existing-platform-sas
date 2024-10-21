import { Box, Typography } from "@mui/material";
import { GenericTabs } from "../../components/molecules/index";

const ValueBoard = () => {

  const tabs = [ 
    {
      index: 0,
      label: "Name",
      Component: 1
    },
    {
      index: 1,
      label: "Name",
      Component: "2"
    },
    {
      index: 2,
      label: "Name",
      Component: "e"
    },
    {
      index: 3,
      label: "Name",
      Component: "4"
    },
    {
      index: 4,
      label: "Name",
      Component: "4"
    },
    {
      index: 5,
      label: "Name",
      Component: "1"
    }
  ]
  return (
      <GenericTabs tabs={tabs} />
  );
};

export default ValueBoard;
