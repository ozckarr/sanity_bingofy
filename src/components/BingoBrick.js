import React from "react";
import sanityClient from "../client";

import Typography from "@mui/material/Typography";

import imageUrlBuilder from "@sanity/image-url";
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function BingoBrick({ brick, selectBrick, checked }) {
  return (
    <>
      {brick.image ? (
        <div
          className="bingo-brick bingo-brick-img"
          style={{ backgroundImage: `url(${urlFor(brick.image).url()})` }}
          onClick={() => selectBrick(brick)}
        >
          {checked ? (
            <div className="bingo-brick-img-fill bingo-brick-img-checked"></div>
          ) : (
            <div className="bingo-brick-img-fill"></div>
          )}
        </div>
      ) : (
        <div className={`bingo-brick ${checked && "bingo-brick-text-checked"}`}>
          <div className="bingo-brick-text-container">
            <Typography className="bingo-brick-text">{brick.title}</Typography>
          </div>
        </div>
      )}
    </>
  );
}

export default BingoBrick;
