export default function checkForBingo(check) {
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
