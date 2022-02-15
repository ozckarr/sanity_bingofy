import React, { useState, useEffect } from "react";
import SanityClient from "../client";
import { Link } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";

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
        <Typography variant={"h3"} className="title-hompage">
          Bingos
        </Typography>
        <div>
          {bingoData &&
            bingoData.map((bingo, index) => (
              <div key={index}>
                <Accordion>
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
                </Accordion>
              </div>
            ))}
        </div>
      </Box>
    </Container>
  );
}
