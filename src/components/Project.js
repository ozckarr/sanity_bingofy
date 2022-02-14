import React, { useEffect, useState } from "react";
import SanityClient from "../client";

export default function Navbar() {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    SanityClient.fetch(
      `*[_type == "project"]{
      title,
      date,
      place,
      decription,
      projectType,
      link,
      tags
    }`
    )
      .then((data) => setProjectData(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <main>
        <section>
          <h1>Posts</h1>
          <h2>List of posts</h2>
          <div>
            {projectData &&
              projectData.map((project, index) => (
                <article key={index} className="postList">
                  <a
                    href={project.link}
                    alt={project.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3>{project.title}</h3>
                  </a>
                  {new Date(project.date).toLocaleDateString()}
                </article>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
