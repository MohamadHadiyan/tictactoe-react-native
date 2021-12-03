import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { OPlayer, XPlayer } from "./Players";

const CurrentPlayer = (props) => {
  const current = props.current;
  const oPlayer = props.players.oPlayer;
  const xPlayer = props.players.xPlayer;

  const xColor = {
    color: current === "X" ? "white" : "gray",
  };

  const oColor = {
    color: current === "O" ? "white" : "gray",
  };

  return (
    <View style={styles.currentBox}>
      <Text style={[styles.text, xColor]}>{xPlayer.name}</Text>
      <View style={styles.innerCurrent}>
        {props.children}
        <View style={[styles.playerWrapper, styles.x_wrapper]}>
          <XPlayer size={30} style={styles.relative} />
        </View>
        <View style={[styles.playerWrapper, styles.o_wrapper]}>
          <OPlayer size={30} style={styles.relative} />
        </View>
      </View>
      <Text style={[styles.text, oColor]}>{oPlayer.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  currentBox: {
    width: "90%",
    maxWidth: 300,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  innerCurrent: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderWidth: 2,
    borderColor: "#357",
    borderRadius: 30,
    width: 120,
    overflow: "hidden",
  },
  playerWrapper: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
  },
  x_wrapper: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  o_wrapper: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  text: {
    fontSize: 20,
    paddingLeft: 10,
  },
  relative: {
    position: "relative",
  },
});

export default CurrentPlayer;
