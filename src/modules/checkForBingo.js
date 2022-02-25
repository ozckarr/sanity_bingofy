export default function checkForBingo(check, numberOfBoxes) {
  if (numberOfBoxes === 1) {
    if (
      // horizontal lines
      check[0] === true
    ) {
      return true;
    } else {
      return false;
    }
  } else if (numberOfBoxes === 4) {
    //"boxPattern-2x2";
    if (
      // horizontal lines
      (check[0] === true && check[1] === true) ||
      (check[2] === true && check[3] === true) ||
      // vertical lines
      (check[0] === true && check[2] === true) ||
      (check[1] === true && check[3] === true) ||
      // oblique line
      (check[0] === true && check[3] === true) ||
      (check[1] === true && check[2] === true)
    ) {
      return true;
    } else {
      return false;
    }
  } else if (numberOfBoxes === 9) {
    // "boxPattern-3x3";
    if (
      // horizontal lines
      (check[0] === true && check[1] === true && check[2] === true) ||
      (check[3] === true && check[4] === true && check[5] === true) ||
      (check[6] === true && check[7] === true && check[8] === true) ||
      // vertical lines
      (check[0] === true && check[3] === true && check[6] === true) ||
      (check[1] === true && check[4] === true && check[7] === true) ||
      (check[2] === true && check[5] === true && check[8] === true) ||
      // oblique line
      (check[0] === true && check[4] === true && check[8] === true) ||
      (check[2] === true && check[4] === true && check[6] === true)
    ) {
      return true;
    } else {
      return false;
    }
  } else if (numberOfBoxes === 16) {
    //"boxPattern-4x4";
    if (
      // horizontal lines
      (check[0] === true &&
        check[1] === true &&
        check[2] === true &&
        check[3] === true) ||
      (check[4] === true &&
        check[5] === true &&
        check[6] === true &&
        check[7] === true) ||
      (check[8] === true &&
        check[9] === true &&
        check[10] === true &&
        check[11] === true) ||
      (check[12] === true &&
        check[13] === true &&
        check[14] === true &&
        check[15] === true) ||
      // vertical lines
      (check[0] === true &&
        check[4] === true &&
        check[8] === true &&
        check[12] === true) ||
      (check[1] === true &&
        check[5] === true &&
        check[9] === true &&
        check[13] === true) ||
      (check[2] === true &&
        check[6] === true &&
        check[10] === true &&
        check[14] === true) ||
      (check[3] === true &&
        check[7] === true &&
        check[11] === true &&
        check[15] === true) ||
      // oblique line
      (check[0] === true &&
        check[5] === true &&
        check[10] === true &&
        check[15] === true) ||
      (check[3] === true &&
        check[6] === true &&
        check[9] === true &&
        check[12] === true)
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    if (
      // horizontal lines
      (check[0] === true &&
        check[1] === true &&
        check[2] === true &&
        check[3] === true &&
        check[4] === true) ||
      (check[5] === true &&
        check[6] === true &&
        check[7] === true &&
        check[8] === true &&
        check[9] === true) ||
      (check[10] === true &&
        check[11] === true &&
        check[12] === true &&
        check[13] === true &&
        check[14] === true) ||
      (check[15] === true &&
        check[16] === true &&
        check[17] === true &&
        check[18] === true &&
        check[19] === true) ||
      (check[20] === true &&
        check[21] === true &&
        check[22] === true &&
        check[23] === true &&
        check[24] === true) ||
      // vertical lines
      (check[0] === true &&
        check[5] === true &&
        check[10] === true &&
        check[15] === true &&
        check[20] === true) ||
      (check[1] === true &&
        check[6] === true &&
        check[11] === true &&
        check[16] === true &&
        check[21] === true) ||
      (check[2] === true &&
        check[7] === true &&
        check[12] === true &&
        check[17] === true &&
        check[22] === true) ||
      (check[3] === true &&
        check[8] === true &&
        check[13] === true &&
        check[18] === true &&
        check[23] === true) ||
      (check[4] === true &&
        check[9] === true &&
        check[14] === true &&
        check[19] === true &&
        check[24] === true) ||
      // oblique line
      (check[0] === true &&
        check[6] === true &&
        check[12] === true &&
        check[18] === true &&
        check[24] === true) ||
      (check[4] === true &&
        check[8] === true &&
        check[12] === true &&
        check[16] === true &&
        check[20] === true)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
