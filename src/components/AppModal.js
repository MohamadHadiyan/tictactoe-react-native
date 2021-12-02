import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const AppModal = (props) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={props.visible}
      onRequestClose={props.handleClose}
    >
      <View style={[styles.container, styles.fullSize]}>
        <View style={styles.modalBox}>
          <View style={styles.fullSize}>
            <View style={styles.modalHeader}>
              <Text style={styles.title}>{props.title}</Text>
              <Pressable onPress={props.handleClose} style={styles.closeBtn}>
                <View style={styles.innerCloseBtn} />
                <View style={[styles.innerCloseBtn, styles.rotate45]} />
              </Pressable>
            </View>

            <View style={styles.body}>{props.children}</View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullSize: {
    width: "100%",
    height: "100%",
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#0008",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  modalBox: {
    width: "70%",
    minWidth: 280,
    height: 380,
    backgroundColor: "#112031",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
    shadowRadius: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#152D44",
    justifyContent: "space-between",
  },
  closeBtn: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 50,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCloseBtn: {
    width: 20,
    height: 3,
    backgroundColor: "#ccc",
    borderRadius: 3,
    position: "absolute",
    transform: [{ rotate: "-45deg" }],
  },
  rotate45: { transform: [{ rotate: "45deg" }] },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
  },
  body: {
    padding: 12,
    justifyContent: "space-around",
    height: "87%",
  },
});

export default AppModal;
