import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import { useParams, Link } from "react-router-dom";

import BingoBrick from "./BingoBrick";
import BingoBrickInfo from "./BingoBrickInfo";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

export default function BingoGame() {
  const [bingo, setBingo] = useState(null);
  const [selectedBrick, setSelectedBrick] = useState(null);
  const [selectedBrickIndex, setSelectedBrickIndex] = useState(null);

  const [localBingoData, setLocalBingoData] = useState({
    order: [],
    checkedList: [],
  });
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

  useEffect(() => {
    if (bingo !== null) {
      let localData = JSON.parse(localStorage.getItem(bingo._id));
      if (localData === null) {
        let order = [];
        const checkedList = Array(25).fill(false);
        for (let i = 0; i < bingo.brick.length; i++) {
          order.push(i);
        }
        let currentIndex = order.length,
          randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [order[currentIndex], order[randomIndex]] = [
            order[randomIndex],
            order[currentIndex],
          ];
        }
        localStorage.setItem(bingo._id, JSON.stringify({ order, checkedList }));
        setLocalBingoData({ order, checkedList });
      } else {
        setLocalBingoData(localData);
      }
    }
  }, [bingo]);

  const selectBrick = (brickData, index) => {
    setSelectedBrick(brickData);
    setSelectedBrickIndex(index);
  };

  const aNewBrickOrder = () => {
    if (bingo.brick !== null) {
      let reorderdBricks = Array(25).fill(0);
      for (let i = 0; i < 25; i++) {
        reorderdBricks[localBingoData.order[i]] = bingo.brick[i];
      }
      return reorderdBricks;
    }
  };

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
          localBingoData.checkedList !== [] &&
          aNewBrickOrder().map((brick, index) => (
            <BingoBrick
              brick={brick}
              key={index}
              selectBrick={selectBrick}
              checked={localBingoData.checkedList[index]}
              index={index}
              selectedBrickIndex={selectedBrickIndex}
            />
          ))}
      </div>
      <BingoBrickInfo brick={selectedBrick} />
    </Container>
  );
}
