"use client";
import { useState } from "react";

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
  // const [redOne, setRedOne] = useState(pathRedBase[0]);
  const [redOne, setRedOne] = useState(pathRed[1]);
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
  // const [blueFour, setBlueFour] = useState(pathBlueBase[3]);
  const [blueFour, setBlueFour] = useState(pathBlue[15]);
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
    },
    green: {
      tokens: greenTokens,
      setFns: [setGreenOne, setGreenTwo, setGreenThree, setGreenFour],
      path: pathGreen,
      color: "bg-green-500",
    },
    blue: {
      tokens: blueTokens,
      setFns: [setBlueOne, setBlueTwo, setBlueThree, setBlueFour],
      path: pathBlue,
      color: "bg-blue-500",
    },
    yellow: {
      tokens: yellowTokens,
      setFns: [setYellowOne, setYellowTwo, setYellowThree, setYellowFour],
      path: pathYellow,
      color: "bg-yellow-500",
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

  const passToNextPlayer = (color: "red" | "green" | "yellow" | "blue") => {
    console.log(`Passing turn from ${color} to next player`);
    setCurrentPlayer((prev) =>
      prev === "red"
        ? "green"
        : prev === "green"
          ? "yellow"
          : prev === "yellow"
            ? "blue"
            : "red",
    );
    setDiceValue(null);
  };

  const moveToken = (
    token: string,
    setToken: (val: string) => void,
    path: string[],
  ) => {
    if (!diceValue) return;
    if (!path.includes(token) && diceValue !== 6) {
      console.log("Token not on path, can't move");
      return;
    } // Token not on path
    if (
      (diceValue === 6 && pathRedBase.includes(token)) ||
      (diceValue === 6 && pathGreenBase.includes(token)) ||
      (diceValue === 6 && pathBlueBase.includes(token)) ||
      (diceValue === 6 && pathYellowBase.includes(token))
    ) {
      console.log("got 6, moving out of base");
      setToken(path[0]);
      setDiceValue(null);
      return;
    }

    console.log(`Moving token from ${token} by ${diceValue} steps`);
    const currentIndex = path.indexOf(token);
    const newIndex = currentIndex + diceValue;

    if (newIndex < path.length) {
      setToken(path[newIndex]);
    }
    diceValue != 6 &&
      setCurrentPlayer((prev) =>
        prev === "red"
          ? "green"
          : prev === "green"
            ? "yellow"
            : prev === "yellow"
              ? "blue"
              : "red",
      );

    // Reset dice after move
    setDiceValue(null);
  };

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    // let roll = 2;
    setDiceValue(roll);
    checkAllTokensInBase(currentPlayer);
    // Switch turn after rolling
    // roll != 6
    //   ? setCurrentPlayer((prev) => (prev === "red" ? "green" : "red"))
    //   : null;
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
            Ludo Game
          </h1>

          <p className="mt-3 text-2xl text-gray-600 dark:text-gray-300">
            A simple Ludo game built with Next.js and Tailwind CSS.
          </p>
          <p className="mt-3 text-xl text-purple-500 dark:text-gray-300">
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
          <div className="grid grid-cols-15 grid-rows-15 w-150 h-150 border-4 border-gray-800 gap-px bg-gray-800">
            {boardIds.map((id) => {
              return (
                <div
                  key={id}
                  id={id}
                  onClick={() => {
                    const { tokens, setFns, path } = players[currentPlayer];
                    tokens.forEach((token, idx) => {
                      if (token === id) moveToken(token, setFns[idx], path);
                    });
                  }}
                  className={`relative flex items-center justify-center border border-gray-300 ${getCellColor(id)}`}
                >
                  {Object.entries(players).map(([player, { tokens, color }]) =>
                    tokens.map((token) =>
                      token === id ? (
                        <div
                          key={`${player}-${token}`}
                          className={`w-6 h-6 rounded-full shadow-lg border-2 border-white ${color}`}
                        />
                      ) : null,
                    ),
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Dice */}
        <div className="mt-4">
          <button
            onClick={rollDice}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md disabled:bg-blue-200"
            disabled={diceValue !== null}
          >
            Roll Dice
          </button>

          {/* Conditionally render Pass button */}
          {(currentPlayer === "red" && redAllBase) ||
          (currentPlayer === "green" && greenAllBase) ||
          (currentPlayer === "blue" && blueAllBase) ||
          (currentPlayer === "yellow" && yellowAllBase) ? (
            <button
              onClick={() => passToNextPlayer(currentPlayer)}
              className="px-6 py-3 ml-5 bg-yellow-500 text-white rounded-lg shadow-md"
            >
              Pass
            </button>
          ) : null}

          <button
            onClick={() => checkAllTokensInBase(currentPlayer)}
            className="px-6 py-3 ml-5 bg-green-500 text-white rounded-lg shadow-md disabled:bg-blue-200"
          >
            Check All in Base
          </button>

          {diceValue && (
            <p className="mt-2 text-xl">Dice Rolled: {diceValue}</p>
          )}
        </div>
      </main>
    </div>
  );
}
// need to add killing logic, winning logic, and some UI improvements like showing dice value on the dice button and highlighting current player's tokens and changing color of the current player to the current player
//issues if 6 in dice and token is not in base it won't give a new turn, it just passes to other player
//issue pass button not working
//add a home screen and a winner screen
