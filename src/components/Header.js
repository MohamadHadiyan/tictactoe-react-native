import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { OPlayer, XPlayer } from "./Players";

const Header = (props) => {
  const xScore = props.players.xPlayer.score;
  const oScore = props.players.oPlayer.score;

  const xStyle = { position: "relative" };
  const oStyle = { position: "relative", borderWidth: 10 };

  return (
    <View style={styles.header}>
      <View style={styles.results}>
        <XPlayer size={30} style={xStyle} />
        <Text style={[styles.winText, styles.redText]}>{xScore} wins</Text>
      </View>
      <View style={styles.results}>
        <View style={styles.draws} />
        <Text style={styles.winText}>{props.players.draws} draws</Text>
      </View>
      <View style={styles.results}>
        <OPlayer size={30} style={oStyle} />
        <Text style={[styles.winText, styles.yellowText]}>{oScore} wins</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "90%",
    maxWidth: 300,
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  results: {
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "space-between",
  },
  draws: {
    borderColor: "gray",
    borderTopWidth: 8,
    borderBottomWidth: 8,
    width: 35,
    paddingTop: 7,
    marginTop: 5,
  },
  winText: {
    color: "gray",
    fontSize: 18,
    fontWeight: "600",
  },
  redText: {
    color: "red",
  },
  yellowText: {
    color: "yellow",
  },
});

export default Header;
