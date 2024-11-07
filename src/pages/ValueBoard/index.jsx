import { Box, Typography, Stack } from "@mui/material";
import { PrimaryButton } from "../../components/atoms";
import { GenericTabs } from "../../components/molecules/index";

const ValueBoard = () => {

  const tabs = [
    {
      index: 0,
      label: "Project",
      Component: 1
    },
    {
      index: 1,
      label: "People",
      Component: "2"
    },
    {
      index: 2,
      label: "Process",
      Component: "e"
    },
    {
      index: 3,
      label: "Product",
      Component: "4"
    },
    {
      index: 4,
      label: "Platform",
      Component: "4"
    },
    {
      index: 5,
      label: "VB Review Comments",
      Component: "1"
    }
  ]
  return (
    <Box sx={{ margin: "10px 25px" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography ml={1} variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Value Board
        </Typography>
        <Typography> Status: In-Progress</Typography>
        <Typography> Start Date: 13-10-2024</Typography>
        <Typography> End Date: 26-10-2024</Typography>
        <PrimaryButton onClick={() => goToNewProjectPage()} >Update</PrimaryButton>
      </Stack>
      <GenericTabs tabs={tabs} />
    </Box>
  );
};

export default ValueBoard;
