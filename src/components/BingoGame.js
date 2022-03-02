import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import sanityClient from "../client";
import { useParams } from "react-router-dom";

import checkForBingo from "../modules/checkForBingo";
import randomOrder from "../modules/randomOrder";

import BingoBrick from "./BingoBrick";
import Loading from "./Loading";
import BingoBrickInfo from "./BingoBrickInfo";
import OverLay from "./OverLay";
import PrintOverlay from "./PrintOverlay";
import BingoPrintControl from "./BingoPrintControl";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import SettingsIcon from "@mui/icons-material/Settings";

export default function BingoGame({ setLockScreen }) {
  const [bingo, setBingo] = useState(null);
  const [youHaveBingo, setYouHaveBingo] = useState(false);
  const [continuePlaying, setContinuePlaying] = useState(false);
  const [numberOfBoxes, setNumberOfBoxes] = useState(0);

  const [selectedBrick, setSelectedBrick] = useState(null);
  const [selectedBrickIndex, setSelectedBrickIndex] = useState(null);
  const [viewOverlay, setViewOverlay] = useState(false);

  const [viewSettings, setViewSettings] = useState(false);
  const [viewPrintOverlay, setViewPrintOverlay] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [printTwoPerPage, setPrintTwoPerPage] = useState(false);

  const [textView, setTextView] = useState(false);

  const [localBingoData, setLocalBingoData] = useState({
    order: [],
    checkedList: [],
  });

  const { slug } = useParams();

  // Print out
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Fetch Bingo Data
  useEffect(() => {
    // TODO dettatch fetchGame
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
    if (numberOfPages !== 0) {
      setLockScreen(true);
    } else {
      setLockScreen(false);
    }
  }, [numberOfPages, setLockScreen]);

  const fetchGame = () => {
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
  };

  // After fetch randomize the game or use the old structure
  useEffect(() => {
    // TODO module
    if (bingo !== null) {
      let localData = JSON.parse(localStorage.getItem(bingo._id));
      let boxQuantity;
      if (bingo.brick.length < 3) {
        boxQuantity = 1;
      } else if (bingo.brick.length < 8) {
        boxQuantity = 4;
      } else if (bingo.brick.length < 15) {
        boxQuantity = 9;
      } else if (bingo.brick.length < 24) {
        boxQuantity = 16;
      } else {
        boxQuantity = 25;
      }
      setNumberOfBoxes(boxQuantity);
      if (localData === null) {
        const checkedList = Array(boxQuantity).fill(false);
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
      let reorderdBricks = Array(bingo.brick.length).fill(0);

      for (let i = 0; i < bingo.brick.length; i++) {
        reorderdBricks[localBingoData.order[i]] = bingo.brick[i];
      }
      // Removes leftover boxes
      reorderdBricks.length = numberOfBoxes;
      // error catch
      if (reorderdBricks === undefined) {
        reorderdBricks = {
          order: [],
          checkedList: [],
        };
      }
      return reorderdBricks;
    }
  };

  const checkBox = (index) => {
    let localData = JSON.parse(localStorage.getItem(bingo._id));
    localData.checkedList[index] = !localData.checkedList[index];
    localStorage.setItem(bingo._id, JSON.stringify(localData));
    setLocalBingoData(localData);
    setYouHaveBingo(checkForBingo(localData.checkedList, numberOfBoxes));
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
    const checkedList = Array(bingo.brick.length).fill(false);
    localStorage.setItem(bingo._id, JSON.stringify({ order, checkedList }));
    setLocalBingoData({ order, checkedList });
  };

  if (!bingo) return <Loading />;

  return (
    <>
      {(viewOverlay || (youHaveBingo && !continuePlaying) || viewSettings) && (
        <OverLay
          selectedBrick={selectedBrick}
          setViewOverlay={setViewOverlay}
          youHaveBingo={youHaveBingo}
          setContinuePlaying={setContinuePlaying}
          restart={restart}
          viewSettings={viewSettings}
          setViewSettings={setViewSettings}
          textView={textView}
          setTextView={setTextView}
          setViewPrintOverlay={setViewPrintOverlay}
        />
      )}
      {viewPrintOverlay && (
        <PrintOverlay
          setViewPrintOverlay={setViewPrintOverlay}
          numberOfPages={numberOfPages}
          setNumberOfPages={setNumberOfPages}
          handlePrint={handlePrint}
          printTwoPerPage={printTwoPerPage}
          setPrintTwoPerPage={setPrintTwoPerPage}
          fetchGame={fetchGame}
        />
      )}
      <Container
        maxWidth="sm"
        style={viewPrintOverlay ? { height: "100vh" } : {}}
      >
        <Box
          sx={{ display: "flex", flexDirection: "rows", margin: "0.5em 0" }}
          className="bingo-game-header"
        >
          <SettingsIcon
            className="settings-icon"
            onClick={() => setViewSettings(true)}
          />

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
                numberOfBoxes={numberOfBoxes}
                textView={textView}
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
      <Box className="bingo-page-container" ref={componentRef}>
        <BingoPrintControl
          bingo={bingo}
          viewPrintOverlay={viewPrintOverlay}
          numberOfPages={numberOfPages}
          numberOfBoxes={numberOfBoxes}
          textView={textView}
          printTwoPerPage={printTwoPerPage}
        />
      </Box>
    </>
  );
}
