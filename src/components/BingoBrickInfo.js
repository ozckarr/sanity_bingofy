import React from "react";
import sanityClient from "../client";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//import UnpublishedRoundedIcon from "@mui/icons-material/UnpublishedRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
//import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function BingoBrickInfo({ brick, selectedBrickIndex, checkBox }) {
  return (
    <>
      {brick === null ? (
        <Typography>
          Klicka för välja en bingoruta, klicka igen för att kryssa i.
        </Typography>
      ) : (
        <div className="brick-info">
          <div className="brick-text-info">
            <Typography variant={"h5"}>{brick.title}</Typography>
            {brick.description && <Typography>{brick.description}</Typography>}
          </div>

          <div className="info-interact">
            {brick.image && (
              <div
                className="info-zoom-image"
                style={{ backgroundImage: `url(${urlFor(brick.image).url()})` }}
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
              <CheckCircleRoundedIcon fontSize="large" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default BingoBrickInfo;
/**/
