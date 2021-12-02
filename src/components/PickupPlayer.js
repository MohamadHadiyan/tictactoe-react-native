import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppModal from "./AppModal";
import { OPlayer, XPlayer } from "./Players";
import RadioBotton from "./RadioBotton";

const PickupPlayer = (props) => {
  return (
    <AppModal
      visible={props.visible}
      handleClose={props.handleClose}
      title="Pick your side"
    >
      <View style={styles.body}>
        <View style={styles.pickupBox}>
          <Pressable
            style={styles.pickup}
            onPress={() => props.handlePickup("X")}
          >
            <XPlayer
              size={82}
              innerStyle={{ height: 26 }}
              style={{ marginBottom: 20 }}
            />
            <RadioBotton active={props.current === "X"} />
          </Pressable>

          <Pressable
            style={styles.pickup}
            onPress={() => props.handlePickup("O")}
          >
            <OPlayer size={80} style={{ borderWidth: 26, marginBottom: 20 }} />
            <RadioBotton active={props.current === "O"} />
          </Pressable>
        </View>

        <View style={styles.continueBox}>
          <TouchableOpacity
            onPress={props.handleClose}
            style={styles.continueBtn}
          >
            <Text style={styles.btnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  body: {
    justifyContent: "space-around",
    height: "100%",
    width: "100%",
  },
  pickupBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  pickup: {
    justifyContent: "center",
    alignItems: "center",
  },
  continueBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  continueBtn: {
    backgroundColor: "#1cd",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 35,
  },
  btnText: {
    fontSize: 23,
    fontWeight: "600",
  },
});

export default PickupPlayer;
