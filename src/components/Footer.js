import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { CogIcon, ResetIcon } from "./Icons";

const Footer = (props) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={props.handleReset} style={styles.btn}>
        <ResetIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.handleSettings} style={styles.btn}>
        <CogIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: "80%",
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    padding: 8,
    borderRadius: 40,
    borderColor: "#3cd4",
    borderWidth: 2,
    backgroundColor: "#39c4",
  },
});

export default Footer;
