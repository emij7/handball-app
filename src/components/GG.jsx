import { Grid } from "@mui/material";
import React from "react";

const GG = ({ size, children, ...props }) => {
  return (
    <Grid
      xs={size || 12}
      item
      display="flex"
      flexDirection="row"
      justifyContent="space-around"
      alignItems="center"
      {...props}
    >
      {children}
    </Grid>
  );
};

export default GG;
