import { Box, Typography, Container, IconButton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../modules/styles/theme";

export function Boxes({ boxes = [] }) {
  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
  }));

  const Btn = styled("div")(({ theme }) => ({
    ...theme.typography.button,
  }));

  return (
    <Div sx={{ display: "flex" }}>
      {boxes?.map((label, i) => (
        <Btn
          className="box-parent"
          sx={{
            height: "118px",
            margin: "10px 0px 10px 10px",
            padding: "16px",
            minWidth: "260px",
            border: "1.5px solid black",
            position: "relative",
            color: theme.palette.grey.main,
          }}
          key={i}
          style={{ borderColor: label.color }}
        >
          <Typography variant="h4">{label.titleNum}</Typography>
          <Typography>{label.title}</Typography>
        </Btn>
      ))}
    </Div>
  );
}

export default Boxes;
