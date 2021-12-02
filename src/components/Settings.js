import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AppModal from "./AppModal";
import RadioBotton from "./RadioBotton";

const Settings = (props) => {
  const { players, time, level, mode } = props.store;

  const EASY = level === "EASY";
  const HARD = level === "HARD";
  const SINGLE = mode === "SINGLE";
  const MULTI = mode === "MULTI";

  const changeHandler = (value, player) => {
    const updated = {
      ...props.store,
      players: {
        ...players,
        [player]: { ...players[player], name: value },
      },
    };
    props.setStore(updated);
  };

  // const timeHandler = (value) => {
  //   if (value === "0") return;
  //   props.setStore({ ...props.store, time: value });
  // };

  return (
    <AppModal
      visible={props.visible}
      handleClose={props.handleClose}
      title="Settings"
    >
      <View style={styles.section}>
        <Text style={[styles.text, { marginBottom: 4 }]}>Player Names:</Text>

        <View style={styles.playerNames}>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Player 1</Text>
          </View>
          <TextInput
            placeholder="Player 1"
            value={players.xPlayer.name}
            onChangeText={(value) => changeHandler(value, `xPlayer`)}
            style={styles.input}
          />
        </View>

        <View style={styles.playerNames}>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Player 2</Text>
          </View>
          <TextInput
            placeholder="Player 2"
            value={players.oPlayer.name}
            onChangeText={(value) => changeHandler(value, `oPlayer`)}
            style={styles.input}
          />
        </View>
      </View>

      {/* <View style={styles.section}>
                <Text style={styles.text}>Time:</Text>
                <View style={styles.playerNames}>
                  <TextInput
                    value={`${time}`}
                    onChangeText={timeHandler}
                    style={styles.input}
                  />
                  <View
                    style={[
                      styles.inputBox,
                      { borderRightWidth: 0, borderLeftWidth: 1 },
                    ]}
                  >
                    <Text style={styles.label}>mins</Text>
                  </View>
                </View>
              </View> */}

      <View style={styles.section}>
        <Text style={styles.text}>Level:</Text>
        <View style={styles.levelBox}>
          <Pressable
            style={styles.pickup}
            onPress={() => props.handleLevel("EASY")}
          >
            <RadioBotton active={EASY} />
            <Text style={styles.text}>Easy</Text>
          </Pressable>
          <Pressable
            style={styles.pickup}
            onPress={() => props.handleLevel("HARD")}
          >
            <RadioBotton active={HARD} />
            <Text style={styles.text}>Hard</Text>
          </Pressable>
        </View>
      </View>
      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.text}>Mode:</Text>

        <View style={styles.levelBox}>
          <Pressable
            style={styles.pickup}
            onPress={() => props.handleMode("SINGLE")}
          >
            <RadioBotton active={SINGLE} />
            <Text style={styles.text}>Single</Text>
          </Pressable>
          <Pressable
            style={styles.pickup}
            onPress={() => props.handleMode("MULTI")}
          >
            <RadioBotton active={MULTI} />
            <Text style={styles.text}>Multi</Text>
          </Pressable>
        </View>
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  section: {
    borderBottomColor: "#94ab9c",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  playerNames: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#1cd",
    borderWidth: 1,
    padding: 1,
    borderRadius: 6,
    marginTop: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    color: "#ccc",
    backgroundColor: "#152a3a",
  },
  inputBox: {
    borderColor: "#1cd",
    borderRightWidth: 1,
    backgroundColor: "#152D44",
    height: "100%",
    justifyContent: "center",
    paddingLeft: 6,
  },
  label: {
    marginRight: 10,
    color: "#ccc",
    fontSize: 16,
  },
  text: {
    color: "#ccc",
    marginLeft: 10,
    fontSize: 16,
  },
  levelBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 6,
  },
  pickup: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lastSection: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
});

export default Settings;
