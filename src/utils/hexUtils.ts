export interface Point {
  x: number;
  y: number;
}

export const CELL_WIDTH = 64;
export const CELL_HEIGHT = CELL_WIDTH * Math.sqrt(3) / 2;

export function hexToScreen(hexX: number, hexY: number): Point {
  // Convert hex grid coordinates to screen coordinates
  const screenX = hexX * CELL_WIDTH + (Math.floor(hexY) % 2 === 1 ? CELL_WIDTH / 2 : 0);
  const screenY = hexY * (CELL_HEIGHT * 0.75);
  return { x: screenX, y: screenY };
}

export function screenToHex(screenX: number, screenY: number): Point {
  // Convert screen coordinates to hex grid coordinates
  const hexY = screenY / (CELL_HEIGHT * 0.75);
  const rowOffset = Math.floor(hexY) % 2 === 1 ? CELL_WIDTH / 2 : 0;
  const hexX = (screenX - rowOffset) / CELL_WIDTH;
  return { x: hexX, y: hexY };
}

export function distanceBetweenHexes(hex1: Point, hex2: Point): number {
  const screen1 = hexToScreen(hex1.x, hex1.y);
  const screen2 = hexToScreen(hex2.x, hex2.y);
  const dx = screen2.x - screen1.x;
  const dy = screen2.y - screen1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
