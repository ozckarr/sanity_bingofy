import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
export default function About() {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"]{
      name,
      bio,
      "authorImage": image.asset->url
    }`
      )
      .then((data) => setAuthor(data[0]))
      .catch(console.error);
  });
  if (!author) return <h2>Loading...</h2>;
  return (
    <div>
      <img src={urlFor(author.authorImage).url()} alt={author.name} />
      <BlockContent
        blocks={author.bio}
        projectId={process.env.REACT_APP_PROJECTID}
        dataset="production"
      />
    </div>
  );
}
