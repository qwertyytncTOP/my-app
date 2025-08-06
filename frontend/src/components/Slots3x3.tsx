import { useState } from "react";
import { motion } from "framer-motion";
import Slot from "./Slot.tsx";
import CelebrationEffect from './FallingDiamonds.tsx';
import Swal from 'sweetalert2';

const slotItems = ["💎", "🥝", "🍋", "🍓", "🍒", "🔔", "⭐"];

export function SlotMachine3() {
  const [spinning, setSpinning] = useState(false);
  const [targets, setTargets] = useState<number[]>([0, 0, 0]);
  const [bet, setBet] = useState(1); // Начальная ставка
  const [balance, setBalance] = useState(10000); // Начальный баланс
  const [showCelebration, setShowCelebration] = useState(false);


  const spin = () => {
    if (spinning) return;
    if (bet > balance || bet <= 0) return;

    setSpinning(true);

    const newTargets = [
      Math.floor(Math.random() * slotItems.length),
      Math.floor(Math.random() * slotItems.length),
      Math.floor(Math.random() * slotItems.length),
    ];

    setTargets(newTargets);
    setTimeout(() => {
      setSpinning(false);

      // Проверка на выигрыш
      const uniqueSymbols = [...new Set(newTargets.map(target => slotItems[target]))];
      if (uniqueSymbols.length === 1) {
        setBalance(balance + bet * 10); // Выигрыш x10
        Swal.fire({
                icon: 'success',
                title: 'Поздравляем!',
                text: `Вы выиграли ${bet * 10}!`,
                background: '#0d1117',
                color: '#ffffff'
              })
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
        }, 3000);
      } else {
        setBalance(balance - bet); // Проигрыш
      }
    }, 2400);
  };

  const changeBet = (value: number) => {
    const newBet = balance >= bet + value ? bet + value : balance;
    if (newBet <= 0) return;
    setBet(newBet);
  };

  const decreaseBet = (value: number) => {
    const newBet = bet - value > 0 ? bet - value : 1;
    setBet(newBet);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      {showCelebration && <CelebrationEffect />}
      <div className="relative w-[90vw] h-[600px] mt-10 bg-gray-900 rounded-2xl p-6 shadow-2xl border border-purple-500/30 flex flex-col items-center justify-between">
        <h2 className="text-4xl font-bold text-center text-white mb-0 flex items-center justify-center gap-2">
          <span>🎰</span> Slots
        </h2>
        <div className="absolute top-5 left-2 bg-purple-900 p-2 rounded-lg">
          <p className="text-lg font-semibold text-white">{balance}$</p>
        </div>
        <div className="flex items-center justify-center mt-0" style={{ width: slotItems.length * 150 }}>
          {targets.map((target, i) => (
            <Slot key={i} target={target} items={slotItems} />
          ))}
        </div>

        {/* Кнопки + и ввод значения */}
        <div className="flex flex-col w-full max-w-xs mb-5 ">
          <div className="flex justify-center space-x-2 mb-2">
            <button
              onClick={() => changeBet(10)}
              disabled={bet >= balance}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300  ${
                bet >= balance ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              +10
            </button>
            <button
              onClick={() => changeBet(5)}
              disabled={bet >= balance}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 ${
                bet >= balance ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              +5
            </button>
            <input
              type="number"
              value={bet}
              onChange={(e) => {
                const newBet = parseInt(e.target.value);
                setBet(newBet > 0 ? (newBet <= balance ? newBet : balance) : 1);
              }}
              className="w-20 h-10 rounded-full bg-gray-800 text-white font-semibold px-3 transition-all duration-300"
            />
            <button
              onClick={() => decreaseBet(5)}
              disabled={bet <= 1}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 ${
                bet <= 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              -5
            </button>
            <button
              onClick={() => decreaseBet(10)}
              disabled={bet <= 1}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 ${
                bet <= 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              -10
            </button>
          </div>

          <div className="flex justify-center space-x-2">
            <button
              onClick={() => changeBet(2)}
              disabled={bet >= balance}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 ${
                bet >= balance ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              +2
            </button>
            <button
              onClick={() => changeBet(1)}
              disabled={bet >= balance}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 ${
                bet >= balance ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              +1
            </button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 58, 237, 0.9), 0 0 30px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={spin}
              disabled={spinning || bet <= 0 || bet > balance}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 ${
                spinning ? "bg-gray-600 cursor-not-allowed" : ""
              }`}
            >
              Spin
            </motion.button>
            <button
              onClick={() => decreaseBet(1)}
              disabled={bet <= 1}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 ${
                bet <= 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              -1
            </button>
            <button
              onClick={() => decreaseBet(2)}
              disabled={bet <= 1}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 ${
                bet <= 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              -2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
