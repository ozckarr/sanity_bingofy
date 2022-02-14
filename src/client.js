import SanityClient from "@sanity/client";

export default SanityClient({
  projectId: process.env.REACT_APP_PROJECTID,
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false,
});
