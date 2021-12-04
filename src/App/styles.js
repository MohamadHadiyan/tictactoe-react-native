import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#112031",
  },
  body: {
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mapBox: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTopColor: "#215679",
  },
  cell: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderColor: "#215679",
  },
  animView: {
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  winLine: {
    width: "100%",
    height: 18,
    position: "absolute",
    backgroundColor: "#1cda",
    borderColor: "orange",
    borderRadius: 20,
    shadowColor: "yellow",
    shadowOffset: { width: 0, height: 0 },
    elevation: 15,
    zIndex: 20,
  },
  timeLineBox: {
    width: "90%",
    maxWidth: 300,
    height: 8,
    marginTop: 20,
    borderRadius: 2,
    backgroundColor: "#6669",
  },
  timeLine: {
    height: 8,
    backgroundColor: "#1cd",
    borderRadius: 2,
  },
  verticalBorder: {
    borderLeftWidth: 5,
    borderRightWidth: 5,
  },
  leftBorder: {
    borderLeftWidth: 5,
  },
  topBorder: {
    borderTopWidth: 5,
  },
  width_90: {
    width: 90,
  },
  highlight: {
    width: 58,
    height: 42,
    backgroundColor: "#1cd",
    position: "absolute",
  },
});

export default styles;
