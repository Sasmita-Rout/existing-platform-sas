import Button from "@mui/material/Button";
import { styled } from "@mui/material";

const StyledBtn = styled("button")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

function PrimaryButton(props) {
  const { children = "", ...restProps } = props;
  return (
    <>
      <Button {...restProps} variant="contained" className="primaryBtn">
        {children}
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
