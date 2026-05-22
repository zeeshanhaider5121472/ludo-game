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
const pathRedBase = ["1-1", "1-4", "4-1", "4-4"];
const pathGreenBase = ["1-10", "1-13", "4-10", "4-13"];
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
];

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

  const [currentPlayer, setCurrentPlayer] = useState<"red" | "green">("red");

  const [redAllBase, setRedAllBase] = useState(false);
  const [greenAllBase, setGreenAllBase] = useState(false);

  const [diceValue, setDiceValue] = useState<number | null>(null);

  const checkAllTokensInBase = (color: "red" | "green") => {
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
    }
  };

  const passToNextPlayer = (color: "red" | "green") => {
    console.log(`Passing turn from ${color} to next player`);
    setCurrentPlayer((prev) => (prev === "red" ? "green" : "red"));
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
      (diceValue === 6 && pathGreenBase.includes(token))
    ) {
      console.log("got 6, moving out of base");
      setToken(path[0]);
      setDiceValue(null);
      return;
    }
    console.log(
      `Moving token from ${token} by ${diceValue} steps and path is ${path}`,
    );
    const currentIndex = path.indexOf(token);
    const newIndex = currentIndex + diceValue;

    if (newIndex < path.length) {
      setToken(path[newIndex]);
    }
    setCurrentPlayer((prev) => (prev === "red" ? "green" : "red"));

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
          <p className="mt-3 text-xl text-gray-600 dark:text-gray-300">
            Current Player: {currentPlayer === "red" ? "Red" : "Green"}
          </p>

          {/* Game Board and Players */}
          <div className="grid grid-cols-15 grid-rows-15 w-150 h-150 border-4 border-gray-800 gap-px bg-gray-800">
            {boardIds.map((id) => {
              return (
                <div
                  key={id}
                  id={id}
                  onClick={() => {
                    if (currentPlayer === "red") {
                      if (redOne === id) moveToken(redOne, setRedOne, pathRed);
                      else if (redTwo === id)
                        moveToken(redTwo, setRedTwo, pathRed);
                      else if (redThree === id)
                        moveToken(redThree, setRedThree, pathRed);
                      else if (redFour === id)
                        moveToken(redFour, setRedFour, pathRed);
                    } else if (currentPlayer === "green") {
                      if (greenOne === id)
                        moveToken(greenOne, setGreenOne, pathGreen);
                      else if (greenTwo === id)
                        moveToken(greenTwo, setGreenTwo, pathGreen);
                      else if (greenThree === id)
                        moveToken(greenThree, setGreenThree, pathGreen);
                      else if (greenFour === id)
                        moveToken(greenFour, setGreenFour, pathGreen);
                    }
                  }}
                  className={`relative flex items-center justify-center border border-gray-300 ${getCellColor(id)}`}
                >
                  {redOne === id && (
                    <div
                      className={`w-6 h-6 rounded-full shadow-lg border-2 border-white bg-red-500`}
                    />
                  )}
                  {redTwo === id && (
                    <div
                      className={`w-6 h-6 rounded-full shadow-lg border-2 border-white bg-red-500`}
                    />
                  )}
                  {redThree === id && (
                    <div
                      className={`w-6 h-6 rounded-full shadow-lg border-2 border-white bg-red-500`}
                    />
                  )}
                  {redFour === id && (
                    <div
                      className={`w-6 h-6 rounded-full shadow-lg border-2 border-white bg-red-500`}
                    />
                  )}
                  {greenOne === id && (
                    <div
                      className={`w-6 h-6 rounded-full shadow-lg border-2 border-white bg-green-500`}
                    />
                  )}
                  {greenTwo === id && (
                    <div
                      className={`w-6 h-6 rounded-full shadow-lg border-2 border-white bg-green-500`}
                    />
                  )}
                  {greenThree === id && (
                    <div
                      className={`w-6 h-6 rounded-full shadow-lg border-2 border-white bg-green-500`}
                    />
                  )}
                  {greenFour === id && (
                    <div
                      className={`w-6 h-6 rounded-full shadow-lg border-2 border-white bg-green-500`}
                    />
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

          <button
            onClick={() => passToNextPlayer(currentPlayer)}
            className="px-6 py-3 ml-5 bg-yellow-500 text-white rounded-lg shadow-md disabled:bg-blue-200"
          >
            Pass
          </button>

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
