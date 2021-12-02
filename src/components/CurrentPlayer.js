import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { OPlayer, XPlayer } from "./Players";

const CurrentPlayer = (props) => {
  const current = props.current;

  return (
    <View style={styles.currentBox}>
      <Text
        style={{
          color: current === "X" ? "white" : "gray",
          fontSize: current === "X" ? 20 : 16,
          paddingRight: 10,
        }}
      >
        {props.players.xPlayer.name}
      </Text>
      <View style={styles.innerCurrent}>
        <View
          style={[
            styles.playerWrapper,
            styles.x_wrapper,
            current === "X" && styles.active,
          ]}
        >
          <XPlayer
            size={30}
            style={{
              position: "relative",
            }}
          />
        </View>
        <View
          style={[
            styles.playerWrapper,
            styles.o_wrapper,
            current === "O" && styles.active,
          ]}
        >
          <OPlayer size={30} style={{ position: "relative" }} />
        </View>
      </View>
      <Text
        style={{
          color: current === "O" ? "white" : "gray",
          fontSize: current === "O" ? 20 : 16,
          paddingLeft: 10,
        }}
      >
        {props.players.oPlayer.name}
      </Text>
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
    // backgroundColor: "#ccc3",
  },
  innerCurrent: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderWidth: 2,
    borderColor: "#357",
    borderRadius: 30,
    width: 120,
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
  active: {
    backgroundColor: "#1cd",
  },
});

export default CurrentPlayer;
