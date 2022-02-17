import React from "react";
import sanityClient from "../client";

import Typography from "@mui/material/Typography";

//import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function BingoBrick({ brick, selectBrick }) {
  return (
    <>
      {brick.image ? (
        <div
          className="bingo-brick bingo-brick-img"
          style={{ backgroundImage: `url(${urlFor(brick.image).url()})` }}
          onClick={() => selectBrick(brick)}
        >
          <div className="bingo-brick-img-fill"></div>
        </div>
      ) : (
        <div className="bingo-brick">
          <Typography className="bingo-brick-text">{brick.title}</Typography>
        </div>
      )}
    </>
  );
}

export default BingoBrick;
/*<BlockContent
        blocks={bingo.body}
        projectId={process.env.REACT_APP_PROJECTID}
        dataset="production"
      />*/
