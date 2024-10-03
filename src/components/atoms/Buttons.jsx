import Button from "@mui/material/Button";
import { styled } from "@mui/material";

const StyledBtn = styled("button")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

function PrimaryButton({ label, icon, sx, onClick }) {
  return (
    <>
      <Button
        sx={sx}
        onClick={onClick}
        variant="contained"
        startIcon={icon}
        className="primaryBtn"
        onClick={onClick}
      >
        {label}
      </Button>
    </>
  );
}

function SecondaryBtn({ label, icon, sx, onClick }) {
  return (
    <>
      <Button
        sx={sx}
        onClick={onClick}
        startIcon={icon}
        variant="outlined"
        className="secondaryBtn"
      >
        {label}
      </Button>
    </>
  );
}
export { PrimaryButton, SecondaryBtn };
