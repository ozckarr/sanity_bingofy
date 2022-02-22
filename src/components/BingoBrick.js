import React from "react";
import sanityClient from "../client";

import Typography from "@mui/material/Typography";

import imageUrlBuilder from "@sanity/image-url";
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function BingoBrick({
  brick,
  selectBrick,
  checked,
  index,
  selectedBrickIndex,
  checkBox,
}) {
  const handleClick = () => {
    if (index === selectedBrickIndex) {
      checkBox(index);
    } else {
      selectBrick(brick, index);
    }
  };
  return (
    <>
      {brick.image ? (
        <div
          className={`bingo-brick bingo-brick-img ${
            index === selectedBrickIndex && "bingo-brick-selected"
          }`}
          style={{ backgroundImage: `url(${urlFor(brick.image).url()})` }}
          onClick={handleClick}
        >
          {checked ? (
            <div className="bingo-brick-img-fill bingo-brick-img-checked"></div>
          ) : (
            <div className="bingo-brick-img-fill"></div>
          )}
        </div>
      ) : (
        <div
          className={`bingo-brick ${
            index === selectedBrickIndex && "bingo-brick-selected"
          }
          ${checked && "bingo-brick-text-checked"}
          `}
          onClick={handleClick}
        >
          <div
            className={`bingo-brick-text-container ${
              index === selectedBrickIndex && "bingo-brick-selected"
            }`}
          >
            <Typography className="bingo-brick-text">{brick.title}</Typography>
          </div>
        </div>
      )}
    </>
  );
}

export default BingoBrick;
