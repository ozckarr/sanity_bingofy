import React from "react";

import BingoBrickForPrint from "./BingoBrickForPrint";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function BingoPageForPrint({
  bingo,
  numberOfBoxes,
  textView,
  printTwoPerPage,
  bingoPattern,
}) {
  const aNewBrickOrder = () => {
    if (bingo.brick !== null) {
      let reorderdBricks = Array(bingo.brick.length).fill(0);

      for (let i = 0; i < bingo.brick.length; i++) {
        reorderdBricks[bingoPattern[i]] = bingo.brick[i];
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
            {aNewBrickOrder().map((brick, index) => (
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
