import React from "react";
import { StyleSheet, View } from "react-native";

export const XPlayer = (props) => {
  return (
    <View
      style={[
        styles.x_player,
        props.size
          ? { width: props.size, height: props.size, ...props.style }
          : props.style,
      ]}
    >
      <View
        style={[
          styles.x_inner,
          props.size ? { width: props.size, height: 10 } : {},
          props.innerStyle,
        ]}
      ></View>
      <View
        style={[
          styles.x_inner,
          { transform: [{ rotate: "-45deg" }] },
          props.size ? { width: props.size, height: 10 } : {},
          props.innerStyle,
        ]}
      />
    </View>
  );
};

export const OPlayer = (props) => {
  return (
    <View
      style={[
        styles.o_player,
        props.size
          ? {
              width: props.size,
              height: props.size,
              borderWidth: 10,
              ...props.style,
            }
          : props.style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  o_player: {
    width: 50,
    height: 50,
    borderColor: "yellow",
    borderWidth: 16,
    borderRadius: 50,
  },
  x_player: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
  },
  x_inner: {
    width: 50,
    height: 16,
    borderRadius: 5,
    position: "absolute",
    backgroundColor: "red",
    transform: [{ rotate: "45deg" }],
  },
});
