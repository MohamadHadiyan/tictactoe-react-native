import React from "react";
import { StyleSheet, View } from "react-native";

const RadioBotton = (props) => {
  return (
    <View style={styles.radioBox}>
      {props.active && <View style={styles.radioButton} />}
    </View>
  );
};

const styles = StyleSheet.create({
  radioBox: {
    width: 28,
    height: 28,
    borderRadius: 28,
    borderColor: "#1cd",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButton: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: "#1cd",
  },
});

export default RadioBotton;
