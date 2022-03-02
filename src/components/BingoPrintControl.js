import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import BingoPageForPrint from "./BingoPageForPrint";

import randomOrder from "../modules/randomOrder";

import Box from "@mui/material/Box";

export default function BingoPrintControl({
  bingo,
  viewPrintOverlay,
  numberOfPages,
  numberOfBoxes,
  textView,
  printTwoPerPage,
}) {
  const [bingoPatterns, setBingoPatterns] = useState([]);

  useEffect(() => {
    if (numberOfPages !== 0) {
      let bingoPatternsHolder = [];
      for (let i = 0; i < numberOfPages; i++) {
        bingoPatternsHolder.push(randomOrder(bingo));
      }
      setBingoPatterns(bingoPatternsHolder);
    }
  }, [bingo, numberOfPages]);

  if (!bingo) return <Loading />;

  return (
    <>
      {viewPrintOverlay &&
        bingo &&
        bingoPatterns.map((bingoPattern, index) => (
          <Box className="bingo-pages" key={index}>
            <BingoPageForPrint
              bingo={bingo}
              numberOfBoxes={numberOfBoxes}
              textView={textView}
              printTwoPerPage={printTwoPerPage}
              bingoPattern={bingoPattern}
            />
            {printTwoPerPage && (
              <>
                <Box sx={{ marginTop: "1em" }}></Box>
                <BingoPageForPrint
                  bingo={bingo}
                  numberOfBoxes={numberOfBoxes}
                  textView={textView}
                  printTwoPerPage={printTwoPerPage}
                  bingoPattern={bingoPattern}
                />
              </>
            )}
          </Box>
        ))}
    </>
  );
}
