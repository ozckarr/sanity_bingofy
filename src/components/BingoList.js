import React, { useState, useEffect } from "react";
import SanityClient from "../client";
import { Link } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";

import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleFilled from "@mui/icons-material/PlayCircleFilled";
import Print from "@mui/icons-material/Print";

export default function Post() {
  const [bingoData, setBingoData] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
        <Typography variant={"h4"} className="title-hompage" color="primary">
          Bingo
        </Typography>
        <div>
          {bingoData &&
            bingoData.map((bingo, index) => (
              <Card key={index} sx={{ marginTop: "0.5em" }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ margin: "0.2em" }}
                  color="primary"
                >
                  {bingo.title}
                </Typography>

                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2 }}>
                    The content of the Popover.
                  </Typography>
                </Popover>

                <Link to={"/" + bingo.slug.current} key={bingo.slug.current}>
                  <PlayCircleFilled color="primary" />
                </Link>
                {/*               <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{bingo.title}&#160;&#160; </Typography>
                    <Link
                      to={"/" + bingo.slug.current}
                      key={bingo.slug.current}
                    >
                      <PlayCircleFilled color="primary" />
                    </Link>
                  </AccordionSummary>
                  <AccordionDetails>
                    {bingo.description && (
                      <BlockContent
                        blocks={bingo.description}
                        projectId={process.env.REACT_APP_PROJECTID}
                        dataset="production"
                      />
                    )}
                    <Print />
                  </AccordionDetails>
                    </Accordion>*/}
              </Card>
            ))}
        </div>
      </Box>
    </Container>
  );
}
