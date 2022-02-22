import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import { useParams, Link } from "react-router-dom";

import checkForBingo from "../modules/checkForBingo";
import randomOrder from "../modules/randomOrder";

import BingoBrick from "./BingoBrick";
import BingoBrickInfo from "./BingoBrickInfo";
import OverLay from "./OverLay";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

export default function BingoGame() {
  const [bingo, setBingo] = useState(null);
  const [youHaveBingo, setYouHaveBingo] = useState(false);
  const [continuePlaying, setContinuePlaying] = useState(false);

  const [selectedBrick, setSelectedBrick] = useState(null);
  const [selectedBrickIndex, setSelectedBrickIndex] = useState(null);
  const [viewOverlay, setViewOverlay] = useState(false);

  const [localBingoData, setLocalBingoData] = useState({
    order: [],
    checkedList: [],
  });

  const { slug } = useParams();

  // Fetch Bingo Data
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

  // After fetch randomize the game or use the old structure
  useEffect(() => {
    if (bingo !== null) {
      let localData = JSON.parse(localStorage.getItem(bingo._id));
      if (localData === null) {
        const checkedList = Array(25).fill(false);
        const order = randomOrder(bingo);

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

  const checkBox = (index) => {
    let localData = JSON.parse(localStorage.getItem(bingo._id));
    localData.checkedList[index] = !localData.checkedList[index];
    localStorage.setItem(bingo._id, JSON.stringify(localData));
    setLocalBingoData(localData);

    setYouHaveBingo(checkForBingo(localData.checkedList));
  };

  const restart = () => {
    setYouHaveBingo(false);
    setContinuePlaying(false);
    setSelectedBrick(null);
    setSelectedBrickIndex(null);
    setViewOverlay(false);
    setLocalBingoData({
      order: [],
      checkedList: [],
    });

    const order = randomOrder(bingo);
    const checkedList = Array(25).fill(false);
    localStorage.setItem(bingo._id, JSON.stringify({ order, checkedList }));
    setLocalBingoData({ order, checkedList });
  };

  if (!bingo) return <div>Loading...</div>;

  return (
    <>
      {(viewOverlay || (youHaveBingo && !continuePlaying)) && (
        <OverLay
          selectedBrick={selectedBrick}
          setViewOverlay={setViewOverlay}
          youHaveBingo={youHaveBingo}
          setContinuePlaying={setContinuePlaying}
          restart={restart}
        />
      )}
      <Container maxWidth="sm">
        <Box
          sx={{ display: "flex", flexDirection: "rows", margin: "0.5em 0" }}
          className="bingo-game-header"
        >
          <Link to={"/"} onClick={() => localStorage.removeItem(bingo._id)}>
            <Button
              variant="outlined"
              size="small"
              sx={{ marginBottom: "0.2em", marginRight: "1em" }}
            >
              <KeyboardReturnIcon />
            </Button>
          </Link>

          <Typography
            variant={"h5"}
            className="bingo-game-title"
            color="primary"
          >
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
                checkBox={checkBox}
                selectBrick={selectBrick}
                checked={localBingoData.checkedList[index]}
                index={index}
                selectedBrickIndex={selectedBrickIndex}
              />
            ))}
        </div>
        <BingoBrickInfo
          brick={selectedBrick}
          checkBox={checkBox}
          selectedBrickIndex={selectedBrickIndex}
          setViewOverlay={setViewOverlay}
          checkedList={localBingoData.checkedList}
        />
      </Container>
    </>
  );
}
