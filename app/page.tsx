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

//red token path
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
const pathBlueBase = ["10-1", "10-4", "13-1", "13-4"];
const pathRedBase = ["1-1", "1-4", "4-1", "4-4"];
const pathGreenBase = ["1-10", "1-13", "4-10", "4-13"];
const pathYellowBase = ["10-10", "10-13", "13-10", "13-13"];
const safeArea = ["6-1", "1-8", "8-13", "13-6"];
const getCellColor = (id: string) => {
  const [r, c] = id.split("-").map(Number);
  // Bases
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
  // Center
  if (r >= 6 && r <= 8 && c >= 6 && c <= 8) return "bg-gray-400";
  // Path
  return "bg-white";
};

export default function Home() {
  // Initial positions of tokens
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

  const [redAllBase, setRedAllBase] = useState(false);
  const [greenAllBase, setGreenAllBase] = useState(false);
  const [blueAllBase, setBlueAllBase] = useState(false);
  const [yellowAllBase, setYellowAllBase] = useState(false);

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

  const checkAllTokensInBase = (color: "red" | "green" | "yellow" | "blue") => {
    if (color === "red") {
      const allInBase = [redOne, redTwo, redThree, redFour].every((e) =>
        pathRedBase.includes(e),
      );
      if (allInBase) {
        console.log("Red tokens in base");
        setRedAllBase(true);
      } else {
        console.log("Red tokens not in base");
        setRedAllBase(false);
      }
      return allInBase;
    } else if (color === "green") {
      const allInBase = [greenOne, greenTwo, greenThree, greenFour].every((e) =>
        pathGreenBase.includes(e),
      );
      if (allInBase) {
        console.log("Green tokens in base");
        setGreenAllBase(true);
      } else {
        console.log("Green tokens not in base");
        setGreenAllBase(false);
      }
      return allInBase;
    } else if (color === "blue") {
      const allInBase = [blueOne, blueTwo, blueThree, blueFour].every((e) =>
        pathBlueBase.includes(e),
      );
      if (allInBase) {
        console.log("Blue tokens in base");
        setBlueAllBase(true);
      } else {
        console.log("Blue tokens not in base");
        setBlueAllBase(false);
      }
      return allInBase;
    } else if (color === "yellow") {
      const allInBase = [yellowOne, yellowTwo, yellowThree, yellowFour].every(
        (e) => pathYellowBase.includes(e),
      );
      if (allInBase) {
        console.log("Yellow tokens in base");
        setYellowAllBase(true);
      } else {
        console.log("Yellow tokens not in base");
        setYellowAllBase(false);
      }
      return allInBase;
    }
  };

  const passToNextPlayer = (
    color: "red" | "green" | "yellow" | "blue",
    depth = 0,
  ) => {
    if (depth >= 4) return; // Safety check: stop if all players are finished

    const order: Array<"red" | "green" | "yellow" | "blue"> = [
      "red",
      "green",
      "yellow",
      "blue",
    ];
    const currentIndex = order.indexOf(color);
    const nextColor = order[(currentIndex + 1) % 4];

    if (isPlayerFinished(nextColor)) {
      // Skip the finished player and pass to the next one
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
    if (safeArea.includes(landingPosition)) {
      console.log("Token in safe area, no kill");
      return false;
    }
    let killed = false;
    opponentColors.forEach((opponentColor) => {
      const opponent = players[opponentColor];
      opponent.tokens.forEach((opponentTokenPos, idx) => {
        if (opponentTokenPos === landingPosition) {
          killed = true;
          // Opponent's token is on the same spot! Kill it and send back to base.
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

    const isInBase =
      pathRedBase.includes(token) ||
      pathGreenBase.includes(token) ||
      pathBlueBase.includes(token) ||
      pathYellowBase.includes(token);
    const isOnPath = path.includes(token) && !isInBase;

    // 1. Check if the clicked token is valid for the current dice roll
    if (isInBase && diceValue !== 6) return; // Can't leave base without a 6
    if (isOnPath && diceValue === 6) {
      // Valid move out of base, continue below
    } else if (isOnPath) {
      const currentIndex = path.indexOf(token);
      const newIndex = currentIndex + diceValue;
      if (newIndex >= path.length) return; // Overshooting the finish line, invalid move! Do nothing.
    } else {
      return; // Token is already finished, can't move
    }

    // 2. If we reach here, the move is VALID. Proceed with the move.
    let hasKilled = false;

    if (isInBase && diceValue === 6) {
      addMessage("got 6, moving out of base", currentPlayer);
      setToken(path[0]);
      hasKilled = checkAndKill(path[0], color);

      // Win check for leaving base (theoretically impossible, but good for safety)
      const lastPosition = path[path.length - 1];
      if (path[0] === lastPosition) {
        const tokensAlreadyAtEnd = players[color].tokens.filter(
          (t) => t === lastPosition,
        ).length;
        if (tokensAlreadyAtEnd + 1 === 4 && !winners.includes(color)) {
          setWinners((prev) => [...prev, color]);
        }
      }
    } else if (isOnPath) {
      const currentIndex = path.indexOf(token);
      const newIndex = currentIndex + diceValue;

      setToken(path[newIndex]);
      hasKilled = checkAndKill(path[newIndex], color);

      // Win check for normal move
      const lastPosition = path[path.length - 1];
      if (path[newIndex] === lastPosition) {
        const tokensAlreadyAtEnd = players[color].tokens.filter(
          (t) => t === lastPosition,
        ).length;
        if (tokensAlreadyAtEnd + 1 === 4 && !winners.includes(color)) {
          setWinners((prev) => [...prev, color]);
        }
      }
    }

    // 3. Handle turn passing
    if (diceValue !== 6 && !hasKilled) {
      console.log("No kill and not a 6, passing to next player");
      passToNextPlayer(color);
    }

    // Reset dice after move
    setDiceValue(null);
  };

  const resetGame = () => {
    // Reset all tokens back to their default starting bases
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

    // Reset game states
    setCurrentPlayer("red");
    setDiceValue(null);
    setWinners([]);
    setRedAllBase(false);
    setGreenAllBase(false);
    setBlueAllBase(false);
    setYellowAllBase(false);
  };

  const isPlayerFinished = (color: "red" | "green" | "yellow" | "blue") => {
    const player = players[color];
    const lastPosition = player.path[player.path.length - 1];
    return player.tokens.every((token) => token === lastPosition);
  };

  const hasValidMove = (color: "red" | "green" | "yellow" | "blue") => {
    if (diceValue === null) return true; // Haven't rolled yet
    const player = players[color];
    const lastPosition = player.path[player.path.length - 1];

    for (let i = 0; i < 4; i++) {
      const tokenPos = player.tokens[i];
      const isInBase = player.base.includes(tokenPos);
      const isFinished = tokenPos === lastPosition;
      const isOnPath = player.path.includes(tokenPos) && !isFinished;

      // Can move out of base with a 6
      if (isInBase && diceValue === 6) return true;

      // Can move on the path without overshooting the end
      if (isOnPath) {
        const currentIndex = player.path.indexOf(tokenPos);
        if (currentIndex + diceValue < player.path.length) return true;
      }
    }
    return false; // No valid moves found
  };

  const rollDice = () => {
    let roll = 1;
    // const roll = Math.floor(Math.random() * 6) + 1;
    setDiceValue(roll);
    checkAllTokensInBase(currentPlayer);
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-center py-32 px-5 bg-white dark:bg-black sm:items-start">
        <div>
          <h1 className="text-3xl sm:text-6xl font-bold text-gray-900 dark:text-white">
            Ludo Game
          </h1>

          <p className="mt-3 text-base sm:text-2xl text-gray-600 dark:text-gray-300">
            A simple Ludo game built with Next.js and Tailwind CSS.
          </p>
          <p
            className={`mt-3 text-lg sm:text-xl ${currentPlayer === "red" ? "text-red-500" : currentPlayer === "green" ? "text-green-500" : currentPlayer === "blue" ? "text-blue-500" : "text-yellow-500"} dark:text-gray-300`}
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

          {/* Game Board and Players */}
          <div className="grid grid-cols-15 grid-rows-15 w-full aspect-square border-4 border-gray-800 gap-px bg-gray-800">
            {boardIds.map((id) => {
              return (
                <div
                  key={id}
                  id={id}
                  className={`relative flex items-center justify-center border border-transparent ${getCellColor(id)}`}
                >
                  {(() => {
                    // 1. Define a strict type for the array to fix the implicit 'any' error
                    type TokenOnCell = {
                      playerKey: keyof typeof players;
                      tokenIdx: number;
                    };

                    const tokensOnCell: TokenOnCell[] = [];

                    Object.entries(players).forEach(
                      ([playerKey, { tokens }]) => {
                        tokens.forEach((token, tokenIdx) => {
                          if (token === id) {
                            // 2. Assert the playerKey type to fix the indexing error
                            tokensOnCell.push({
                              playerKey: playerKey as keyof typeof players,
                              tokenIdx,
                            });
                          }
                        });
                      },
                    );

                    return tokensOnCell.map((t, stackIdx) => {
                      const player = players[t.playerKey]; // Now safe to index!
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
          {/* Dice */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={rollDice}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-lg shadow-md disabled:bg-blue-200"
                disabled={diceValue !== null}
              >
                Roll Dice
              </button>

              {/* Conditionally render Pass button */}
              {diceValue !== null && !hasValidMove(currentPlayer) ? (
                <button
                  onClick={() => passToNextPlayer(currentPlayer)}
                  className="px-4 py-2 sm:px-6 sm:py-3 ml-5 bg-yellow-500 text-white rounded-lg shadow-md"
                >
                  Pass
                </button>
              ) : null}

              {/* <button
            onClick={() => checkAllTokensInBase(currentPlayer)}
            className="px-6 py-3 sm:px-6 sm:py-3 ml-5 bg-green-500 text-white rounded-lg shadow-md disabled:bg-blue-200"
          >
            Check All in Base
          </button> */}
            </div>

            {diceValue && (
              <p className="mt-2 text-xl">Dice Rolled: {diceValue}</p>
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
