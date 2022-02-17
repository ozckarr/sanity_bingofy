import React from "react";
//import sanityClient from "../client";

import Typography from "@mui/material/Typography";

//import imageUrlBuilder from "@sanity/image-url";
//const builder = imageUrlBuilder(sanityClient);
/*function urlFor(source) {
  return builder.image(source);
}*/

function BingoBrickInfo({ brick }) {
  return (
    <>
      {brick === null ? (
        <Typography>
          Klicka för välja en bingoruta, klicka igen för att kryssa i.
        </Typography>
      ) : (
        <>
          <Typography>{brick.title}</Typography>

          {brick.description && <Typography>{brick.description}</Typography>}
        </>
      )}
    </>
  );
}

export default BingoBrickInfo;
/**/
