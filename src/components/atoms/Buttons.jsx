import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material";

const StyledBtn = styled("button")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

function PrimaryButton({ label }) {
  return (
    <>
      <Button
        variant="contained"
        startIcon={<CancelIcon />}
        className="primaryBtn"
      >
        {label}
      </Button>
    </>
  );
}

 function SecondaryBtn({ label }) {
  return (
    <>
      <Button variant="outlined" className="secondaryBtn">
        {label}
      </Button>
    </>
  );
}
export  { PrimaryButton, SecondaryBtn };

