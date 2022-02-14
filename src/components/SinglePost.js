import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import { useParams } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function SinglePost() {
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
          "name": author->name,
          "authorImage": author->image
        }`
      )
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!singlePost) return <div>Loading...</div>;
  return (
    <main className="">
      <article>
        <header>
          <div>
            <h1>{singlePost.title}</h1>
            {singlePost.authorImage && (
              <img
                src={urlFor(singlePost.authorImage).width(200).url()}
                alt={singlePost.name}
              />
            )}

            <p></p>
          </div>
        </header>
        {singlePost.authorImage && (
          <img
            src={urlFor(singlePost.mainImage).width(300).blur(50).url()}
            alt={singlePost.title}
          />
        )}
        <BlockContent
          blocks={singlePost.body}
          projectId={process.env.REACT_APP_PROJECTID}
          dataset="production"
        />
      </article>
    </main>
  );
}
