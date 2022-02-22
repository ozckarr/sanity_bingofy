import React from "react";
import sanityClient from "../client";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import UnpublishedRoundedIcon from "@mui/icons-material/UnpublishedRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function BingoBrickInfo({
  brick,
  selectedBrickIndex,
  checkBox,
  setViewOverlay,
  checkedList,
}) {
  return (
    <>
      {brick === null ? (
        <Typography>
          Klicka för välja en bingoruta, klicka igen för att kryssa i.
        </Typography>
      ) : (
        <div className="brick-info">
          <div className="brick-text-info">
            <Typography
              variant={"h5"}
              color="primary"
              className="brick-text-title"
            >
              {brick.title}
            </Typography>
            <Box className="brick-text-underline"></Box>
            {brick.description && <Typography>{brick.description}</Typography>}
          </div>

          <div className="info-interact">
            {brick.image && (
              <div
                className="info-zoom-image"
                style={{ backgroundImage: `url(${urlFor(brick.image).url()})` }}
                onClick={() => setViewOverlay(true)}
              >
                <ZoomInIcon
                  className="info-zoom-icon"
                  fontSize="large"
                  color="primary"
                />
              </div>
            )}
            <Button
              variant="outlined"
              size="small"
              onClick={() => checkBox(selectedBrickIndex)}
            >
              {checkedList[selectedBrickIndex] ? (
                <UnpublishedRoundedIcon fontSize="large" color="error" />
              ) : (
                <CheckCircleRoundedIcon fontSize="large" />
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default BingoBrickInfo;
/**/
