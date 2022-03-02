import React, { useState } from "react";
import BingoGame from "./BingoGame";

export default function BingoContainer() {
  const [lockScreen, setLockScreen] = useState(false);

  return (
    <div className={`${lockScreen ? "lock-screen" : ""}`}>
      <BingoGame setLockScreen={setLockScreen} />
    </div>
  );
}
