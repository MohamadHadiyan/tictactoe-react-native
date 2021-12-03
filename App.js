import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Animated, I18nManager, Pressable, View } from "react-native";
import CurrentPlayer from "./src/components/CurrentPlayer";
import Footer from "./src/components/Footer";
import { OPlayer, XPlayer } from "./src/components/Players";
import Header from "./src/components/Header";
import Settings from "./src/components/Settings";
import * as init from "./src/App/initialStates";
import styles from "./src/App/styles";
import PickupPlayer from "./src/components/PickupPlayer";
import {
  botPlayer,
  checkIsWon,
  findWinner,
  getCoords,
  getupdatedMap,
} from "./src/App/handler";

I18nManager.allowRTL(false);

export default function App() {
  const [rootStore, setRootStore] = useState(init.initialRoot);
  const { players, gameMap } = rootStore;

  const hardlvl = rootStore.level === "HARD";
  const singleMode = rootStore.mode === "SINGLE";

  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false); // Turn Completed
  const [turnNum, setTurnNum] = useState(0);

  const [winner, setWinner] = useState(false);
  const [showSettings, setShowSettings] = useState(false); // Settings Modal
  const [showPickupModal, setshowPickupModal] = useState(false);

  const [current, setCurrent] = useState("X");
  const [userPick, setUserPick] = useState("X");
  const [userChose, setUserChose] = useState(false);

  const [winLine, setWinLine] = useState(init.initialWinLine);
  const [winLineAnim] = useState(new Animated.Value(0));
  const [timeLineAnim] = useState(new Animated.Value(0));
  const [highLightAnim, setHighLightAnim] = useState(new Animated.Value(0));

  const handleTimeLineAnim = (delay) => {
    Animated.timing(timeLineAnim, {
      toValue: 1,
      delay: delay,
      duration: 10000,
      useNativeDriver: false,
    }).start(() => {
      timeLineAnim.setValue(0);
    });
  };

  const handleWinLineAnim = () => {
    Animated.timing(winLineAnim, {
      toValue: 1,
      delay: 300,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      winLineAnim.setValue(0);
    });
  };

  const handleHighLightAnim = (value) => {
    Animated.timing(highLightAnim, {
      toValue: value,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const complationHandler = (players) => {
    setTimeout(() => {
      if (current === userPick && singleMode) setUserChose(true);

      setWinner(false);
      setCompleted(false);

      setRootStore({
        ...rootStore,
        players,
        gameMap: hardlvl ? init.hardMap : init.easyMap,
      });
    }, 1300);
  };

  const turnHandler = (row, cell, currentMap, player) => {
    const newMap = getupdatedMap({ currentMap, row, cell, player });
    const coords = getCoords(row, cell, rootStore.level);

    const turnProps = { newMap, row, player, winLine, coords };
    const { isWon, wonLine } = checkIsWon(turnProps);

    setWinLine(wonLine);
    setTurnNum(turnNum + 1);
    handleTimeLineAnim(isWon ? 1300 : 0);

    const findProps = { newMap, isWon, players, player };
    const { newPlayers, result } = findWinner(findProps);
    const current = player === "X" ? "O" : "X";
    setCurrent(current);

    if (player === userPick) handleHighLightAnim(0);
    else handleHighLightAnim(1);

    setRootStore({
      ...rootStore,
      gameMap: newMap,
      players: { ...newPlayers },
    });

    if (isWon || result === "draws") {
      if (result !== "draws") setWinner(true);

      setCompleted(true);
      complationHandler(newPlayers);
      handleWinLineAnim();
    }
  };

  const selectCellHandler = (row, cell) => {
    if (completed) return;
    if (gameMap[row][cell] !== "") return;

    if (!started) setStarted(true);
    if (singleMode) setUserChose(true);

    turnHandler(row, cell, gameMap, current);
  };

  const settingsHandler = () => {
    setShowSettings(!showSettings);

    if (!showSettings) timeLineAnim.setValue(0);
  };

  const levelHandler = (level) => {
    const gameMap = level === "HARD" ? init.hardMap : init.easyMap;
    setRootStore({ ...rootStore, level, gameMap });
  };

  const resetHandler = () => {
    const time = completed ? 1301 : 0;

    setStarted(false);
    setshowPickupModal(true);

    setTimeout(() => {
      const gameMap = hardlvl ? init.hardMap : init.easyMap;
      const newPlayers = {
        ...players,
        xPlayer: { ...players.xPlayer, score: 0 },
        oPlayer: { ...players.oPlayer, score: 0 },
        draws: 0,
      };

      setRootStore({
        ...rootStore,
        gameMap,
        players: newPlayers,
      });
      timeLineAnim.setValue(0);
    }, time);
  };

  const modeHandler = (mode) => {
    const gameMap = hardlvl ? init.hardMap : init.easyMap;

    setRootStore({
      ...init.initialRoot,
      level: rootStore.level,
      gameMap,
      mode,
    });
  };

  const pickupPlayerHandler = (pick) => {
    setCurrent(pick);
    setUserPick(pick);

    if (pick === "O") handleHighLightAnim(0);
    else handleHighLightAnim(1);
  };

  const closePickup = () => {
    setshowPickupModal(!showPickupModal);
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setshowPickupModal(true);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    const empty = gameMap.some((row) => row.some((cell) => cell === ""));

    if (userChose && empty && !completed && !winner) {
      //
      setTimeout(() => {
        const { row, cell } = botPlayer(gameMap);
        const player = userPick === "X" ? "O" : "X";
        turnHandler(row, cell, gameMap, player);
      }, 400);

      setUserChose(false);
    }
  }, [gameMap, userChose]);

  const timeLine = timeLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "0%"],
  });

  const timeLineWidth = {
    width: timeLine,
  };

  const winAnim = winLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [rootStore.level === "HARD" ? 330 : 250, 0],
  });

  const winLineAnimWidth = {
    width: completed && winner ? winAnim : 0,
  };

  const winLineWidth = {
    width: `${winLine.width}%`,
  };

  const winLineRotate = {
    transform: [{ rotate: `${winLine.angle}deg` }],
  };

  const winLinePos = [
    winLine.top ? { top: winLine.top } : {},
    winLine.left ? { left: winLine.left } : {},
  ];

  const winLineStyles = [
    styles.winLine,
    winLineWidth,
    winLineRotate,
    ...winLinePos,
  ];

  const currentHighLight = highLightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [58, 0],
  });

  const translate = {
    transform: [{ translateX: currentHighLight }],
  };

  const { verticalBorder, leftBorder, width_90 } = styles;
  const cellStyle = (key) =>
    key === 1 ? [verticalBorder, width_90] : key == 3 ? leftBorder : {};

  return (
    <View style={styles.container}>
      <PickupPlayer
        current={userPick}
        visible={showPickupModal}
        handleClose={closePickup}
        handlePickup={pickupPlayerHandler}
      />
      <View style={styles.body}>
        <Header players={players} />

        <View style={styles.timeLineBox}>
          <Animated.View style={[styles.timeLine, timeLineWidth]} />
        </View>

        <View style={styles.mapBox}>
          <Animated.View style={[styles.animView, winLineAnimWidth]}>
            <View style={winLineStyles} />
          </Animated.View>

          {gameMap.map((row, index) => (
            <View
              style={[styles.row, index !== 0 && styles.topBorder]}
              key={index}
            >
              {row.map((cell, key) => (
                <Pressable
                  style={[styles.cell, cellStyle(key)]}
                  onPress={() => selectCellHandler(index, key)}
                  key={key}
                >
                  {cell === "O" ? <OPlayer /> : cell === "X" && <XPlayer />}
                </Pressable>
              ))}
            </View>
          ))}
        </View>
        <CurrentPlayer players={players} current={current}>
          <Animated.View
            style={[
              {
                width: 58,
                height: 42,
                backgroundColor: "#1cd",
                position: "absolute",
              },
              translate,
            ]}
          />
        </CurrentPlayer>
        <Footer handleReset={resetHandler} handleSettings={settingsHandler} />
      </View>

      <Settings
        visible={showSettings}
        handleClose={settingsHandler}
        store={rootStore}
        setStore={setRootStore}
        handleLevel={levelHandler}
        handleMode={modeHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}
