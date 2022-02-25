import React from "react";
import sanityClient from "../client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function OverLay({
  selectedBrick,
  setViewOverlay,
  youHaveBingo,
  setContinuePlaying,
  restart,
  viewSettings,
  setViewSettings,
  textView,
  setTextView,
}) {
  const handleContinuePlaying = () => {
    setContinuePlaying(true);
    setViewOverlay(false);
  };

  return (
    <Container
      className="bingo-overlay-container"
      sx={{ maxWidth: "100vw" }}
      onClick={() => {
        setViewOverlay(false);
        setViewSettings(false);
      }}
    >
      <Container
        maxWidth="sm"
        className="bingo-overlay"
        sx={{ maxWidth: "522px" }}
      >
        <Box className="bingo-overlay-content">
          {!youHaveBingo && (
            <CancelOutlinedIcon
              color="primary"
              className="bingo-overlay-close"
              fontSize="medium"
            />
          )}

          {youHaveBingo ? (
            <Box className="bingo-overlay-win">
              <Typography variant="h3" color="primary">
                Bingo...
              </Typography>
              <Box className="bingo-overlay-win-buttons">
                <Button variant="outlined" onClick={handleContinuePlaying}>
                  Fortsätt Spela
                </Button>
                <Button variant="outlined" onClick={restart}>
                  Börja Om
                </Button>
              </Box>
            </Box>
          ) : viewSettings ? (
            <Box className="bingo-overlay-settings">
              <Typography variant="h4" color="primary">
                Inställningar
              </Typography>
              <Box className="bingo-overlay-win-buttons">
                <Button
                  variant="outlined"
                  onClick={() => setTextView(!textView)}
                >
                  Textvy: {textView ? "På" : "Av"}
                </Button>
                <Button variant="outlined" onClick={restart}>
                  Börja Om
                </Button>
              </Box>
            </Box>
          ) : (
            <div
              className="bingo-overlay-image"
              style={{
                backgroundImage: `url(${urlFor(selectedBrick.image).url()})`,
              }}
            ></div>
          )}
        </Box>
      </Container>
    </Container>
  );
}
