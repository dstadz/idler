export const getCoods = (row, col) => `${row}-${col}`

export const blankHexCells = (h, w) => Array.from({ length: h }, (_, rowIndex) =>
  Array.from({ length: w }, (_, colIndex) => ({ id: getCoods(rowIndex, colIndex) })),
)
