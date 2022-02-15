import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import { useParams } from "react-router-dom";
//import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import Typography from "@mui/material/Typography";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
/*
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
*/

export default function BingoGame() {
  const [singlePost, setSinglePost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
        title,
        _id,
        slug,
        mainImage{
          asset->{
            _id,
              url
            }
          },
          body,
        }`
      )
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!singlePost) return <div>Loading...</div>;
  return (
    <div>
      <KeyboardReturnIcon />
      <Typography variant={"h3"} className="title-hompage">
        {singlePost.title}
      </Typography>

      <BlockContent
        blocks={singlePost.body}
        projectId={process.env.REACT_APP_PROJECTID}
        dataset="production"
      />
    </div>
  );
}
