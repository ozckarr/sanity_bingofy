import React, { useState, useEffect } from "react";

import BingoBrickForPrint from "./BingoBrickForPrint";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function BingoPageForPrint({
  bingo,
  numberOfBoxes,
  textView,
  printTwoPerPage,
}) {
  const [shuffledBingo, setShuffledBingo] = useState([]);

  useEffect(() => {
    let newArray = bingo.brick;
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    setShuffledBingo(newArray);
  }, [bingo]);

  return (
    <>
      <Container sx={printTwoPerPage ? { width: "519px" } : { margin: "auto" }}>
        <Box className="bingo-game-header">
          <Typography
            variant={"h5"}
            className="bingo-game-title"
            color="primary"
          >
            {bingo.title}
          </Typography>
          <div className="bingo-container">
            {shuffledBingo.map((brick, index) => (
              <BingoBrickForPrint
                brick={brick}
                key={index}
                numberOfBoxes={numberOfBoxes}
                textView={textView}
                printTwoPerPage={printTwoPerPage}
              />
            ))}
          </div>
        </Box>
      </Container>
    </>
  );
}
