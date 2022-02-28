import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import BingoGame from "./BingoGame";

export default function BingoContainer() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return <BingoGame handlePrint={handlePrint} componentRef={componentRef} />;
}
