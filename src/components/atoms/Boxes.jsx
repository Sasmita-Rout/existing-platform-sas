import { Typography } from "@mui/material";
import theme from "../../modules/styles/theme";
import Grid from "@mui/material/Grid2";

export function Boxes({ boxes = [] }) {
  return (
    <Grid container sx={{ display: "flex" }}>
      {boxes?.map((label, i) => (
        <Grid
          size={2}
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
        </Grid>
      ))}
    </Grid>
  );
}

export default Boxes;
