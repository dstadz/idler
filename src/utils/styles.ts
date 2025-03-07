import { tileBackgrounds } from "./constants";

export const styles = {
  wrapper: {
  flex: 1,
  border: '3px solid white',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: tileBackgrounds.SEA,
  height: '100dvh',
  width: '100dvw',
  },
  row: {
  // flex: 1,
  // position: 'absolute',
  height: '10%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  // borderColor: 'green',
  // borderWidth: 5,
  zIndex: 2,
  },
  resources: {
  flex: 1,
  flexDirection: 'row',
  // borderColor: 'blue',
  // borderWidth: 5,
  },
  canvas: {
  borderColor: 'red',
  borderWidth: 5,
  height: '100%',
  pointerEvents: 'none',
  },
  statBlock: {
  flexDirection: 'row',
  justifyContent: 'end',
  },
  dataButton: {
  // borderColor: 'blue',
  // borderWidth: 1,
  },
  middleRow: {
  flex: 10,
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'none',
  // borderColor: 'blue',
  // borderWidth: 5,
  },
  botLeft: {
  borderColor: 'orange',
  borderWidth: 5,
  },
  botRight: {
  borderColor: 'pink',
  borderWidth: 5,
  },
  hexGrid: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  },
  topRow: {
  top: 0,
  left: 0,
  width: '100%',
  height: 50,
  },
  bottomRow: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: 50,
  },

  pageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    // zIndex: -1,
  },
}
