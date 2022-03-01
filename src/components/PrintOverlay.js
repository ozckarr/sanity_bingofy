import React from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

export default function PrintOverlay({
  setViewPrintOverlay,
  numberOfPages,
  setNumberOfPages,
  handlePrint,
  setPrintTwoPerPage,
  printTwoPerPage,
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
        <Box className="bingo-overlay-content ">
          <Box className="bingo-overlay-content-print ">
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
            <Typography variant="h4" color="primary">
              Skriv ut
            </Typography>
            <TextField
              id="outlined-basic"
              label="Antal Sidor"
              variant="outlined"
              type="number"
              onChange={(e) => setNumberOfPages(parseInt(e.target.value))}
              InputProps={{ inputProps: { min: 0 } }}
            />
            <Button
              size="large"
              variant="outlined"
              onClick={() => setPrintTwoPerPage(!printTwoPerPage)}
              endIcon={
                !printTwoPerPage ? (
                  <CheckBoxOutlineBlankOutlinedIcon />
                ) : (
                  <CheckBoxOutlinedIcon />
                )
              }
            >
              2 bingon per sida
            </Button>
            <Button size="large" variant="outlined" onClick={handlePrint}>
              Skriv ut
            </Button>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}
