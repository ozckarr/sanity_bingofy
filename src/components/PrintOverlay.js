import React from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
//import Button from "@mui/material/Button";
//import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export default function PrintOverlay({
  setViewPrintOverlay,
  numberOfPages,
  setNumberOfPages,
}) {
  return (
    <Container
      className="bingo-overlay-container bingo-printoverlay"
      sx={{ maxWidth: "100vw" }}
    >
      <Container
        maxWidth="sm"
        className="bingo-overlay"
        sx={{ maxWidth: "522px" }}
      >
        <Box className="bingo-overlay-content">
          <CancelOutlinedIcon
            sx={{ cursor: "pointer" }}
            color="primary"
            className="bingo-overlay-close"
            fontSize="medium"
            onClick={() => {
              setViewPrintOverlay(false);
            }}
            value={numberOfPages}
          />
          under konstruktion...
          <TextField
            id="outlined-basic"
            label="Antal Sidor"
            variant="outlined"
            type="number"
            onChange={(e) => setNumberOfPages(parseInt(e.target.value))}
            InputProps={{ inputProps: { min: 0 } }}
          />
          {numberOfPages}
        </Box>
      </Container>
    </Container>
  );
}
