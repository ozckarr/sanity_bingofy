import React from "react";
import sanityClient from "../client";

import Typography from "@mui/material/Typography";

import cross from "../images/cross.png";
import crossText from "../images/cross-text.png";

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
  numberOfBoxes,
}) {
  const handleClick = () => {
    if (index === selectedBrickIndex) {
      checkBox(index);
    } else {
      selectBrick(brick, index);
    }
  };

  const boxPattern = () => {
    if (numberOfBoxes === 1) {
      return "boxPattern-1x1";
    } else if (numberOfBoxes === 4) {
      return "boxPattern-2x2";
    } else if (numberOfBoxes === 9) {
      return "boxPattern-3x3";
    } else if (numberOfBoxes === 16) {
      return "boxPattern-4x4";
    } else {
      return "boxPattern-5x5";
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
            <div
              className="bingo-brick-img-fill bingo-brick-img-checked"
              style={{ backgroundImage: `url(${cross})` }}
            ></div>
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

          ${boxPattern()}
          `}
          onClick={handleClick}
          style={
            checked ? { backgroundImage: `url(${crossText})` } : { margin: "0" }
          }
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
