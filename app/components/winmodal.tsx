import { useMemo } from "react";

interface WinModalProps {
  winners: string[];
  onPlayAgain: () => void;
}

export default function WinModal({ winners, onPlayAgain }: WinModalProps) {
  const confettiPieces = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 2 + 2, // Between 2s and 4s
      animationDelay: Math.random() * 2, // Between 0s and 2s
      backgroundColor: ["#ef4444", "#22c55e", "#3b82f6", "#eab308", "#a855f7", "#f97316"][
        Math.floor(Math.random() * 6)
      ],
      size: Math.random() * 8 + 4, // Between 4px and 12px
    }));
  }, []);

  // Wait until ALL 4 players have finished before showing the final ranking board
  if (winners.length < 4) return null;

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <>
      {/* Pure CSS Keyframes injected directly into the component */}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        {/* Confetti Container */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              style={{
                position: "absolute",
                left: `${piece.left}%`,
                top: "-20px", // Start slightly above the screen
                width: `${piece.size}px`,
                height: `${piece.size}px`,
                backgroundColor: piece.backgroundColor,
                borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                // Apply the animation directly via inline style
                animation: `confetti-fall ${piece.animationDuration}s ${piece.animationDelay}s linear infinite`,
              }}
            />
          ))}
        </div>

        {/* Modal Box */}
        <div className="relative z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-11/12 max-w-md text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            🎉 Game Over! 🎉
          </h1>
          
          <div className="mb-6 space-y-3">
            {winners.map((winner, index) => (
              <div
                key={winner}
                className={`flex items-center justify-center gap-3 text-2xl font-bold p-3 rounded-lg shadow-sm ${
                  index === 0
                    ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-400"
                    : index === 1
                    ? "bg-gray-200 text-gray-600 border-2 border-gray-400"
                    : index === 2
                    ? "bg-orange-100 text-orange-700 border-2 border-orange-400"
                    : "bg-white text-gray-500 border border-gray-300"
                }`}
              >
                <span>{index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🏅"}</span>
                <span>{capitalize(winner)}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onPlayAgain}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Play Again
          </button>
        </div>
      </div>
    </>
  );
}