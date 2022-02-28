import React from "react";

//import randomOrder from "../modules/randomOrder";

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
  return (
    <>
      <Container sx={printTwoPerPage && { width: "519px" }}>
        <Box className="bingo-game-header">
          <Typography
            variant={"h5"}
            className="bingo-game-title"
            color="primary"
          >
            {bingo.title}
          </Typography>
          <div className="bingo-container">
            {bingo.brick.map((brick, index) => (
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
