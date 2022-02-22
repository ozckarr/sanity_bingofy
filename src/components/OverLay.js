import React from "react";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export default function OverLay() {
  return (
    <Container className="bingo-overlay-container" sx={{ maxWidth: "100vw" }}>
      <Container
        maxWidth="sm"
        className="bingo-overlay"
        sx={{ maxWidth: "522px" }}
      >
        <Box className="bingo-overlay-content">
          <CancelOutlinedIcon
            color="primary"
            className="bingo-overlay-close"
            fontSize="medium"
          />
        </Box>
      </Container>
    </Container>
  );
}
