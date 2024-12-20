import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Typography } from "@mui/material";

function Header() {
  return (
    <Box
      sx={{
        backgroundColor: "#7b1fa2",
        color: "white",
        padding: "5px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "62%",
        marginLeft: "20%",
        marginRight: "20%",
        borderRadius: "5px",
        height: "60px",
      }}
    >
      <Typography variant="h6" sx={{ fontSize: "20px", margin: 0 }}>
        Ideal candidate persona
      </Typography>
      <InfoIcon
        sx={{
          fontSize: "18px",
          marginLeft: "15px",
          alignItems: "center",
          mt: ".5%",
        }}
      />
    </Box>
  );
}

export default Header;
