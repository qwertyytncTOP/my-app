import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const fieldItems = Array(9).fill("-");
const mineItem = "💣";
const diamondItem = "💎";

export function Mine() {
  const [targets, setTargets] = useState<string[]>(fieldItems);
  const [bet, setBet] = useState<number>(1); // Начальная ставка
  const [balance, setBalance] = useState<number>(10000); // Начальный баланс
  const [minePosition, setMinePosition] = useState<number | null>(null);
  const [revealedPositions, setRevealedPositions] = useState<boolean[]>(new Array(9).fill(false));
  const [totalEarnings, setTotalEarnings] = useState(bet);

  const revealAllNonMineFields = () => {
    let allRevealed = true;
  
    const updatedTargets = targets.map((item, index) => {
      if (revealedPositions[index] === false) {
        allRevealed = false;
        return diamondItem;
      }
      
      return item;
    });

    setTargets(updatedTargets);

    // Если все поля без мины открыты
    if (allRevealed) {
      revealWin();
    }

    // Обновляем состояние revealedPositions
    const newRevealedPositions = updatedTargets.map(item => item !== '-');
    setRevealedPositions(newRevealedPositions);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const placeMine = () => {
    let minePosition;
    console.log("placeMine");
    do {
      minePosition = Math.floor(Math.random() * targets.length);
    } while (targets[minePosition] !== "-");

    const newTargets = Array(9).fill("-");
    newTargets[minePosition] = mineItem;
    setTargets(newTargets);
    setMinePosition(minePosition);
    console.log(newTargets);
  };

  const startNewGame = () => {
    console.log("startnewgame");
    const emptyField = Array(9).fill("-");
    setTargets(emptyField);
    placeMine();
    setRevealedPositions(new Array(9).fill(false));
    setTotalEarnings(bet);
  };

  const revealField = (index: number) => {
    console.log("revealfield");
    if (revealedPositions[index]) return;

    if (minePosition === index) {
      // Проигрыш
      const newRevealedPositions = [...revealedPositions];
      newRevealedPositions[index] = true;
      setRevealedPositions(newRevealedPositions);
      const newTargets = [...targets];
      newTargets[index] = mineItem;
      setTargets(newTargets);
      setBalance(balance - bet);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Бомба! Вы проиграли.',
        background: '#0d1117',
        color: '#ffffff'
      }).then(() => {
        // Добавляем асинхронную задержку перед началом новой игры
        setTimeout(() => startNewGame(), 500); // Задержка в 500 миллисекунд
      });
    } else if (targets[index] === "-") {
      const newRevealedPositions = [...revealedPositions];
      newRevealedPositions[index] = true;
      setRevealedPositions(newRevealedPositions);
      const newTargets = [...targets];
      newTargets[index] = diamondItem;
      setTargets(newTargets);
      console.log(newRevealedPositions)
      setTotalEarnings(totalEarnings + bet * 0.2);

      // Проверка на выигрыш
      let remainingFields = targets.filter(target => target === "-").length;
      if (remainingFields === 1) {
        revealAllNonMineFields();
        revealWin();
      }
    }
  };

  const revealWin = () => {
    let remainingFields = targets.filter(target => target === "-").length;
    if (remainingFields === 8) {
      Swal.fire({
        icon: 'info',
        title: 'Хм...',
        text: 'Ты еще ничего не открыл, педик!',
        background: '#0d1117',
        color: '#ffffff'
      });
    } else {
      if (minePosition !== null) {
          const newRevealedPositions = [...revealedPositions];
          newRevealedPositions[minePosition] = true;
          setRevealedPositions(newRevealedPositions);
          const newTargets = [...targets];
          console.log("ne null")
          newTargets[minePosition] = mineItem;
          setTargets(newTargets);
        }

        
      console.log("revealwin");
      setBalance(balance + totalEarnings); // Выигрыш

      Swal.fire({
        icon: 'success',
        title: 'Поздравляем!',
        text: `Вы выиграли ${totalEarnings.toFixed(1)}!`,
        background: '#0d1117',
        color: '#ffffff'
      }).then(() => {
        // Добавляем асинхронную задержку перед началом новой игры
        setTimeout(() => startNewGame(),0); // Задержка в 500 миллисекунд
      });
    }
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

  // Проверка, можно ли изменять ставку
  const canChangeBet = revealedPositions.some(pos => pos === true);
  

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <div className="relative w-[700px] h-[600px] bg-gray-900 rounded-2xl p-6 shadow-2xl border border-purple-500/30 flex flex-col items-center justify-between">
        <h2 className="text-4xl font-bold text-center text-white mb-0 flex items-center justify-center gap-2">
          <span>💎</span> Mine Game
        </h2>
        <div className="absolute top-5 left-1 bg-purple-900 p-2 rounded-lg">
          <p className="text-lg font-semibold text-white">{balance.toFixed(1)}$</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-10 w-full max-w-sm">
          {targets.map((target, i) => (
            <button
              key={i}
              onClick={() => revealField(i)}
              disabled={revealedPositions[i]}
              className={`w-24 h-24 bg-gray-800 text-white font-semibold flex items-center justify-center rounded-2xl ${
                revealedPositions[i] && target === mineItem ? "bg-red-500" : ""
              }`}
            >
              {revealedPositions[i] ? target : ""}
            </button>
          ))}
        </div>

        {/* Кнопки + и ввод значения */}
        <div className="flex flex-col w-full max-w-xs mb-0 ">
          <div className="flex justify-center space-x-2 mb-0">
            <button
              onClick={() => changeBet(2)}
              disabled={bet >= balance || canChangeBet}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300  ${
                (bet >= balance || canChangeBet) ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              +2
            </button>
            <button
              onClick={() => changeBet(1)}
              disabled={bet >= balance || canChangeBet}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300  ${
                (bet >= balance || canChangeBet) ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              +1
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
              onClick={() => decreaseBet(1)}
              disabled={bet <= 1 || canChangeBet}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 ${
                (bet <= 1 || canChangeBet) ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              -1
            </button>
            <button
              onClick={() => decreaseBet(2)}
              disabled={bet <= 1 || canChangeBet}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 ${
                (bet <= 1 || canChangeBet) ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              -2
            </button>
          </div>
        </div>

        {/* Кнопки + и ввод значения */}
        <div className="flex flex-col w-full max-w-xs mb-0 ">
          <div className="flex justify-center space-x-2 mb-0">
            <button
              onClick={() => changeBet(10)}
              disabled={bet >= balance || canChangeBet}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300  ${
                (bet >= balance || canChangeBet) ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              +10
            </button>
            <button
              onClick={() => changeBet(5)}
              disabled={bet >= balance || canChangeBet}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300  ${
                (bet >= balance || canChangeBet) ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              +5
            </button>
            
            <button
              onClick={() => decreaseBet(5)}
              disabled={bet <= 1 || canChangeBet}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 ${
                (bet <= 1 || canChangeBet) ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              -5
            </button>
            <button
              onClick={() => decreaseBet(10)}
              disabled={bet <= 1 || canChangeBet}
              className={`w-20 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 ${
                (bet <= 1 || canChangeBet) ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              -10
            </button>
          </div>
        </div>

        {/* Кнопки + и ввод значения */}
        <button
          onClick={revealWin}
          className={`w-full max-w-xs h-10 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-300 mt-4`}
        >
          Вывести выигрыш
        </button>
      </div>
    </div>
  );
}

