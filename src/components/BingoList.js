import React, { useState, useEffect } from "react";
import SanityClient from "../client";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

import Card from "@mui/material/Card";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import PlayCircleFilled from "@mui/icons-material/PlayCircleFilled";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Print from "@mui/icons-material/Print";

export default function Post() {
  const [bingoData, setBingoData] = useState(null);

  useEffect(() => {
    SanityClient.fetch(
      `*[_type == "bingo"]{
      title,
      slug,
      description,
      }`
    )
      .then((data) => setBingoData(data))
      .catch(console.error);
  }, []);

  return (
    <Container maxWidth="sm">
      <Box>
        <Typography
          sx={{ marginTop: "0.5em" }}
          variant={"h4"}
          className="title-hompage"
          color="primary"
        >
          Bingo
        </Typography>
        <div>
          {bingoData &&
            bingoData.map((bingo, index) => (
              <Card
                key={index}
                sx={{
                  marginTop: "0.5em",
                  padding: "0 0.5em",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ margin: " 0.4em 0.2em 0.2em 0.2em" }}
                    color="primary"
                  >
                    {bingo.title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "0.5em",
                  }}
                >
                  <Print
                    color="primary"
                    fontSize="large"
                    sx={{ marginLeft: "0.2em" }}
                  />

                  {bingo.description && (
                    <PopupState variant="popover" popupId="popup-popover">
                      {(popupState) => (
                        <div>
                          <HelpOutlineIcon
                            variant="contained"
                            {...bindTrigger(popupState)}
                            color="primary"
                            fontSize="large"
                            sx={{ marginLeft: "0.2em" }}
                          />
                          <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "center",
                            }}
                          >
                            <Typography sx={{ p: 2 }}>
                              {bingo.description}{" "}
                            </Typography>
                          </Popover>
                        </div>
                      )}
                    </PopupState>
                  )}

                  <Link to={"/" + bingo.slug.current} key={bingo.slug.current}>
                    <PlayCircleFilled
                      color="primary"
                      fontSize="large"
                      sx={{ marginLeft: "0.2em" }}
                    />
                  </Link>
                </Box>
              </Card>
            ))}
        </div>
      </Box>
    </Container>
  );
}
