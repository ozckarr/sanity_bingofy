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

function BingoBrickForPrint({
  brick,
  checked,
  numberOfBoxes,
  textView,
  printTwoPerPage,
}) {
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
      {!brick.image || textView ? (
        <div
          className={`bingo-brick 

          ${boxPattern()}
          `}
          style={
            checked ? { backgroundImage: `url(${crossText})` } : { margin: "0" }
          }
        >
          <div className={`bingo-brick-text-container `}>
            <Typography
              className={`bingo-brick-text ${
                printTwoPerPage && "bingo-brick-text-small"
              }`}
            >
              {brick.title}
            </Typography>
          </div>
        </div>
      ) : (
        <div
          className={`bingo-brick bingo-brick-img `}
          style={{ backgroundImage: `url(${urlFor(brick.image).url()})` }}
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
      )}
    </>
  );
}

export default BingoBrickForPrint;
