import React, { useState, useEffect } from "react";
import SanityClient from "../client";
import { Link } from "react-router-dom";

export default function Post() {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    SanityClient.fetch(
      `*[_type == "post"]{
      title,
      slug,
      mainImage{
        asset->{
          _id,
          url,
        },
        alt
      }
    }`
    )
      .then((data) => setPostData(data))
      .catch(console.error);
  }, []);
  return (
    <div>
      <main>
        <section>
          <h1>Posts</h1>
          <h2>List of posts</h2>
          <div>
            {postData &&
              postData.map((post, index) => (
                <article key={index} className="postList">
                  <Link
                    to={"/post/" + post.slug.current}
                    key={post.slug.current}
                  >
                    <span>
                      <img
                        src={post.mainImage.asset.url}
                        alt={post.mainImage.asset.alt}
                      />
                      <span>
                        <h3>{post.title}</h3>
                      </span>
                    </span>
                  </Link>
                </article>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
