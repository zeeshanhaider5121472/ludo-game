"use client";
import { useState } from "react";
import Snackbar, { useSnackbar } from "./components/snackbar";
import WinModal from "./components/winmodal";

const boardIds: string[] = [];
for (let r = 0; r < 15; r++) {
  for (let c = 0; c < 15; c++) {
    boardIds.push(`${r}-${c}`);
  }
}

// Token paths
const pathRed = [
  "6-1",
  "6-2",
  "6-3",
  "6-4",
  "6-5",
  "5-6",
  "4-6",
  "3-6",
  "2-6",
  "1-6",
  "0-6",
  "0-7",
  "0-8",
  "1-8",
  "2-8",
  "3-8",
  "4-8",
  "5-8",
  "6-9",
  "6-10",
  "6-11",
  "6-12",
  "6-13",
  "6-14",
  "7-14",
  "8-14",
  "8-13",
  "8-12",
  "8-11",
  "8-10",
  "8-9",
  "9-8",
  "10-8",
  "11-8",
  "12-8",
  "13-8",
  "14-8",
  "14-7",
  "14-6",
  "13-6",
  "12-6",
  "11-6",
  "10-6",
  "9-6",
  "8-5",
  "8-4",
  "8-3",
  "8-2",
  "8-1",
  "8-0",
  "7-0",
  "7-1",
  "7-2",
  "7-3",
  "7-4",
  "7-5",
  "7-6",
];
const pathGreen = [
  "1-8",
  "2-8",
  "3-8",
  "4-8",
  "5-8",
  "6-9",
  "6-10",
  "6-11",
  "6-12",
  "6-13",
  "6-14",
  "7-14",
  "8-14",
  "8-13",
  "8-12",
  "8-11",
  "8-10",
  "8-9",
  "9-8",
  "10-8",
  "11-8",
  "12-8",
  "13-8",
  "14-8",
  "14-7",
  "14-6",
  "13-6",
  "12-6",
  "11-6",
  "10-6",
  "9-6",
  "8-5",
  "8-4",
  "8-3",
  "8-2",
  "8-1",
  "8-0",
  "7-0",
  "6-0",
  "6-1",
  "6-2",
  "6-3",
  "6-4",
  "6-5",
  "5-6",
  "4-6",
  "3-6",
  "2-6",
  "1-6",
  "0-6",
  "0-7",
  "1-7",
  "2-7",
  "3-7",
  "4-7",
  "5-7",
  "6-7",
];
const pathBlue = [
  "13-6",
  "12-6",
  "11-6",
  "10-6",
  "9-6",
  "8-5",
  "8-4",
  "8-3",
  "8-2",
  "8-1",
  "8-0",
  "7-0",
  "6-0",
  "6-1",
  "6-2",
  "6-3",
  "6-4",
  "6-5",
  "5-6",
  "4-6",
  "3-6",
  "2-6",
  "1-6",
  "0-6",
  "0-7",
  "0-8",
  "1-8",
  "2-8",
  "3-8",
  "4-8",
  "5-8",
  "6-9",
  "6-10",
  "6-11",
  "6-12",
  "6-13",
  "6-14",
  "7-14",
  "8-14",
  "8-13",
  "8-12",
  "8-11",
  "8-10",
  "8-9",
  "9-8",
  "10-8",
  "11-8",
  "12-8",
  "13-8",
  "14-8",
  "14-7",
  "13-7",
  "12-7",
  "11-7",
  "10-7",
  "9-7",
  "8-7",
];
const pathYellow = [
  "8-13",
  "8-12",
  "8-11",
  "8-10",
  "8-9",
  "9-8",
  "10-8",
  "11-8",
  "12-8",
  "13-8",
  "14-8",
  "14-7",
  "14-6",
  "13-6",
  "12-6",
  "11-6",
  "10-6",
  "9-6",
  "8-5",
  "8-4",
  "8-3",
  "8-2",
  "8-1",
  "8-0",
  "7-0",
  "6-0",
  "6-1",
  "6-2",
  "6-3",
  "6-4",
  "6-5",
  "5-6",
  "4-6",
  "3-6",
  "2-6",
  "1-6",
  "0-6",
  "0-7",
  "0-8",
  "1-8",
  "2-8",
  "3-8",
  "4-8",
  "5-8",
  "6-9",
  "6-10",
  "6-11",
  "6-12",
  "6-13",
  "6-14",
  "7-14",
  "7-13",
  "7-12",
  "7-11",
  "7-10",
  "7-9",
  "7-8",
];

// Bases and Safe Areas
const pathBlueBase = ["10-1", "10-4", "13-1", "13-4"];
const pathRedBase = ["1-1", "1-4", "4-1", "4-4"];
const pathGreenBase = ["1-10", "1-13", "4-10", "4-13"];
const pathYellowBase = ["10-10", "10-13", "13-10", "13-13"];
const safeArea = ["6-1", "1-8", "8-13", "13-6"];

const getCellColor = (id: string) => {
  const [r, c] = id.split("-").map(Number);
  if (r <= 5 && c <= 5) return "bg-red-200";
  if (r === 7 && c >= 1 && c <= 5) return "bg-red-200";
  if (r === 6 && c === 1) return "bg-red-200";
  if (r <= 5 && c >= 9) return "bg-green-200";
  if (r === 1 && c === 8) return "bg-green-200";
  if (r >= 1 && r <= 5 && c === 7) return "bg-green-200";
  if (r >= 9 && c >= 9) return "bg-yellow-200";
  if (r === 7 && c >= 9 && c <= 13) return "bg-yellow-200";
  if (r === 8 && c === 13) return "bg-yellow-200";
  if (r >= 9 && c <= 5) return "bg-blue-200";
  if (r >= 9 && r <= 13 && c === 7) return "bg-blue-200";
  if (r === 13 && c === 6) return "bg-blue-200";
  if (r >= 6 && r <= 8 && c >= 6 && c <= 8) return "bg-gray-400";
  return "bg-white";
};

export default function Home() {
  const [redOne, setRedOne] = useState(pathRedBase[0]);
  const [redTwo, setRedTwo] = useState(pathRedBase[1]);
  const [redThree, setRedThree] = useState(pathRedBase[2]);
  const [redFour, setRedFour] = useState(pathRedBase[3]);
  const [greenOne, setGreenOne] = useState(pathGreenBase[0]);
  const [greenTwo, setGreenTwo] = useState(pathGreenBase[1]);
  const [greenThree, setGreenThree] = useState(pathGreenBase[2]);
  const [greenFour, setGreenFour] = useState(pathGreenBase[3]);
  const [blueOne, setBlueOne] = useState(pathBlueBase[0]);
  const [blueTwo, setBlueTwo] = useState(pathBlueBase[1]);
  const [blueThree, setBlueThree] = useState(pathBlueBase[2]);
  const [blueFour, setBlueFour] = useState(pathBlueBase[3]);
  const [yellowOne, setYellowOne] = useState(pathYellowBase[0]);
  const [yellowTwo, setYellowTwo] = useState(pathYellowBase[1]);
  const [yellowThree, setYellowThree] = useState(pathYellowBase[2]);
  const [yellowFour, setYellowFour] = useState(pathYellowBase[3]);

  const [currentPlayer, setCurrentPlayer] = useState<
    "red" | "green" | "yellow" | "blue"
  >("red");
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const { messages, addMessage } = useSnackbar();
  const [winners, setWinners] = useState<string[]>([]);

  const redTokens = [redOne, redTwo, redThree, redFour];
  const greenTokens = [greenOne, greenTwo, greenThree, greenFour];
  const blueTokens = [blueOne, blueTwo, blueThree, blueFour];
  const yellowTokens = [yellowOne, yellowTwo, yellowThree, yellowFour];

  const players = {
    red: {
      tokens: redTokens,
      setFns: [setRedOne, setRedTwo, setRedThree, setRedFour],
      path: pathRed,
      color: "bg-red-500",
      base: pathRedBase,
    },
    green: {
      tokens: greenTokens,
      setFns: [setGreenOne, setGreenTwo, setGreenThree, setGreenFour],
      path: pathGreen,
      color: "bg-green-500",
      base: pathGreenBase,
    },
    blue: {
      tokens: blueTokens,
      setFns: [setBlueOne, setBlueTwo, setBlueThree, setBlueFour],
      path: pathBlue,
      color: "bg-blue-500",
      base: pathBlueBase,
    },
    yellow: {
      tokens: yellowTokens,
      setFns: [setYellowOne, setYellowTwo, setYellowThree, setYellowFour],
      path: pathYellow,
      color: "bg-yellow-500",
      base: pathYellowBase,
    },
  };

  const isPlayerFinished = (color: "red" | "green" | "yellow" | "blue") => {
    const player = players[color];
    const lastPosition = player.path[player.path.length - 1];
    return player.tokens.every((token) => token === lastPosition);
  };

  const hasValidMove = (color: "red" | "green" | "yellow" | "blue") => {
    if (diceValue === null) return true;
    const player = players[color];
    const lastPosition = player.path[player.path.length - 1];

    for (let i = 0; i < 4; i++) {
      const tokenPos = player.tokens[i];
      const isInBase = player.base.includes(tokenPos);
      const isFinished = tokenPos === lastPosition;
      const isOnPath = player.path.includes(tokenPos) && !isFinished;

      if (isInBase && diceValue === 6) return true;
      if (isOnPath) {
        const currentIndex = player.path.indexOf(tokenPos);
        if (currentIndex + diceValue < player.path.length) return true;
      }
    }
    return false;
  };

  const passToNextPlayer = (
    color: "red" | "green" | "yellow" | "blue",
    depth = 0,
  ) => {
    if (depth >= 4) return;
    const order: Array<"red" | "green" | "yellow" | "blue"> = [
      "red",
      "green",
      "yellow",
      "blue",
    ];
    const currentIndex = order.indexOf(color);
    const nextColor = order[(currentIndex + 1) % 4];

    if (isPlayerFinished(nextColor)) {
      passToNextPlayer(nextColor, depth + 1);
    } else {
      setCurrentPlayer(nextColor);
      setDiceValue(null);
    }
  };

  const checkAndKill = (
    landingPosition: string,
    currentColor: "red" | "green" | "yellow" | "blue",
  ): boolean => {
    const opponentColors = (["red", "green", "yellow", "blue"] as const).filter(
      (c) => c !== currentColor,
    );
    if (safeArea.includes(landingPosition)) return false;

    let killed = false;
    opponentColors.forEach((opponentColor) => {
      const opponent = players[opponentColor];
      opponent.tokens.forEach((opponentTokenPos, idx) => {
        if (opponentTokenPos === landingPosition) {
          killed = true;
          opponent.setFns[idx](opponent.base[idx]);
          addMessage(
            `${opponentColor} token at index ${idx} killed!`,
            currentColor,
          );
        }
      });
    });
    return killed;
  };

  const moveToken = (
    token: string,
    setToken: (val: string) => void,
    path: string[],
    color: "red" | "green" | "yellow" | "blue",
  ) => {
    if (!diceValue) return;

    const isInBase = players[color].base.includes(token);
    const isOnPath = path.includes(token) && !isInBase;

    if (isInBase && diceValue !== 6) return;
    if (isOnPath) {
      const currentIndex = path.indexOf(token);
      const newIndex = currentIndex + diceValue;
      if (newIndex >= path.length) return;
    } else if (!isInBase) {
      return;
    }

    // Execute valid move
    let hasKilled = false;

    if (isInBase && diceValue === 6) {
      addMessage("Got a 6, moving out of base!", currentPlayer);
      setToken(path[0]);
      hasKilled = checkAndKill(path[0], color);
    } else if (isOnPath) {
      const currentIndex = path.indexOf(token);
      const newIndex = currentIndex + diceValue;
      setToken(path[newIndex]);
      hasKilled = checkAndKill(path[newIndex], color);

      // Win check
      const lastPosition = path[path.length - 1];
      if (path[newIndex] === lastPosition) {
        const tokensAlreadyAtEnd = players[color].tokens.filter(
          (t) => t === lastPosition,
        ).length;
        if (tokensAlreadyAtEnd + 1 === 4 && !winners.includes(color)) {
          setWinners((prev) => [...prev, color]);
          addMessage(`${color} player finished! 🎉`, currentPlayer);
        }
      }
    }

    // Handle turn passing
    if (diceValue !== 6 && !hasKilled) {
      passToNextPlayer(color);
    }

    setDiceValue(null);
  };

  const resetGame = () => {
    setRedOne(pathRedBase[0]);
    setRedTwo(pathRedBase[1]);
    setRedThree(pathRedBase[2]);
    setRedFour(pathRedBase[3]);
    setGreenOne(pathGreenBase[0]);
    setGreenTwo(pathGreenBase[1]);
    setGreenThree(pathGreenBase[2]);
    setGreenFour(pathGreenBase[3]);
    setBlueOne(pathBlueBase[0]);
    setBlueTwo(pathBlueBase[1]);
    setBlueThree(pathBlueBase[2]);
    setBlueFour(pathBlueBase[3]);
    setYellowOne(pathYellowBase[0]);
    setYellowTwo(pathYellowBase[1]);
    setYellowThree(pathYellowBase[2]);
    setYellowFour(pathYellowBase[3]);
    setCurrentPlayer("red");
    setDiceValue(null);
    setWinners([]);
  };

  const rollDice = () => {
    const audio = new Audio("/soundeffects/shakedice.mp3");
    audio.play().catch((e) => console.log("Audio blocked"));
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceValue(roll);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-center py-8 px-4 sm:py-32 sm:px-16 bg-white dark:bg-black">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-3xl sm:text-6xl font-bold text-gray-900 dark:text-white">
            Ludo Game
          </h1>
          <p
            className={`mt-3 text-lg sm:text-xl font-semibold ${currentPlayer === "red" ? "text-red-500" : currentPlayer === "green" ? "text-green-500" : currentPlayer === "blue" ? "text-blue-500" : "text-yellow-500"} dark:text-gray-300`}
          >
            Current Player:{" "}
            {currentPlayer === "red"
              ? "Red"
              : currentPlayer === "green"
                ? "Green"
                : currentPlayer === "blue"
                  ? "Blue"
                  : "Yellow"}
          </p>

          {/* Game Board */}
          <div className="grid grid-cols-15 grid-rows-15 w-full max-w-150 aspect-square border-4 border-gray-800 gap-px bg-gray-800 mt-6">
            {boardIds.map((id) => {
              return (
                <div
                  key={id}
                  id={id}
                  className={`relative flex items-center justify-center border border-transparent ${getCellColor(id)}`}
                >
                  {(() => {
                    type TokenOnCell = {
                      playerKey: keyof typeof players;
                      tokenIdx: number;
                    };
                    const tokensOnCell: TokenOnCell[] = [];

                    Object.entries(players).forEach(
                      ([playerKey, { tokens }]) => {
                        tokens.forEach((token, tokenIdx) => {
                          if (token === id) {
                            tokensOnCell.push({
                              playerKey: playerKey as keyof typeof players,
                              tokenIdx,
                            });
                          }
                        });
                      },
                    );

                    return tokensOnCell.map((t, stackIdx) => {
                      const player = players[t.playerKey];
                      const token = player.tokens[t.tokenIdx];
                      const setFn = player.setFns[t.tokenIdx];
                      const path = player.path;
                      const color = player.color;
                      const isCurrentPlayer = t.playerKey === currentPlayer;

                      return (
                        <div
                          key={`${t.playerKey}-${t.tokenIdx}`}
                          className={`w-4/5 h-4/5 rounded-full shadow-lg border-2 border-white ${color} ${
                            isCurrentPlayer && diceValue !== null
                              ? "cursor-pointer hover:opacity-80"
                              : ""
                          }`}
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: `calc(50% - ${stackIdx * 7}px)`,
                            transform: "translate(-50%, -50%)",
                            zIndex: stackIdx,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isCurrentPlayer && diceValue !== null) {
                              moveToken(token, setFn, path, t.playerKey);
                            }
                          }}
                        />
                      );
                    });
                  })()}
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={rollDice}
                className={`px-4 py-2 sm:px-6 sm:py-3 ${players[currentPlayer].color} text-white font-semibold rounded-lg cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={diceValue !== null}
              >
                Roll Dice
              </button>

              {diceValue !== null && !hasValidMove(currentPlayer) ? (
                <button
                  onClick={() => passToNextPlayer(currentPlayer)}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-yellow-500 text-white cursor-pointer font-semibold rounded-lg shadow-md"
                >
                  Pass
                </button>
              ) : null}
            </div>

            {diceValue && (
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Dice Rolled: {diceValue}
              </p>
            )}
          </div>
        </div>
      </main>
      <Snackbar messages={messages} />
      <WinModal winners={winners} onPlayAgain={resetGame} />
    </div>
  );
}

// ✔️need to add killing logic ,
// ✔️after kill can have one more turn
// ✔️winning logic,
// ✔️safe places logic where no one can kill ✔️ and
// ✔️some UI improvements (mobile responsive ✔️)
// like showing dice value on the dice button and
// highlighting current player's tokens and
//✔️ changing color of the current player to the current player
//✔️ issues if 6 in dice and token is not in base it won't give a new turn, it just passes to other player
//✔️issue pass button not working correctly
//✔️pass button shows before the dice is rolled
//add a home screen and
//✔️a winner screen
//add sound eeffects for dice roll, token move, token kill and winning and conffetii
// if got time add data to db.json
//clean code and remove console logs and add comments to explain the code
//✔️if token at last index and other tokens are still usable then it should not give next player turn and wait for the player to choose another token to move
