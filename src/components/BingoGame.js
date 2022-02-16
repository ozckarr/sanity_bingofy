import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import { useParams, Link } from "react-router-dom";

import BingoBrick from "./BingoBrick";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

export default function BingoGame() {
  const [bingo, setBingo] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
          title,
          _id,
          slug,
          brick
        }`
      )
      .then((data) => setBingo(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!bingo) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "rows", margin: "0.5em 0" }}>
        <Link to={"/"}>
          <Button
            variant="outlined"
            size="small"
            sx={{ marginBottom: "0.2em", marginRight: "1em" }}
          >
            <KeyboardReturnIcon />
          </Button>
        </Link>

        <Typography variant={"h5"} className="title-hompage">
          {bingo.title}
        </Typography>
      </Box>
      <div className="bingo-container">
        {bingo.brick &&
          bingo.brick.map((brick, index) => (
            <BingoBrick brick={brick} key={index} />
          ))}
      </div>
    </Container>
  );
}
