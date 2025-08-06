import  { useState} from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

export function Lk() {
  const avatars = [
    '/images/avatar1.png',
    '/images/avatar2.png',
    '/images/avatar3.png',
    '/images/avatar4.png',
    '/images/avatar5.png',
    '/images/avatar6.png',
    '/images/avatar7.png',
    '/images/avatar8.png',
    '/images/avatar9.png',
    '/images/avatar10.png',
    // Добавьте больше изображений по необходимости
  ];

  const nicknames = [
    'GamerGuru',
    'CasinoKing',
    'SlotMaster',
    'JackpotJunkie',
    'WheelOfFortune',
    'LuckyDuck',
    'SpinMaster',
    'BetBuster',
    'FortuneFreak',
    'WinningWizard'
  ];

  function getRandomItem(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const [avatar, setAvatar] = useState(getRandomItem(avatars));
  const [nickname, setNickname] = useState(getRandomItem(nicknames));

 
  


  const handleCopyClick = () => {
    navigator.clipboard.writeText('pirozhok');
    // Устанавливаем сообщение в состояние
    Swal.fire({
        icon: 'success',
        title: 'Промокод porizhok',
        text: `скопирован в ваш буфер обмена!`,
        background: '#0d1117',
        color: '#ffffff'
      }) // Закрыть уведомление через 3 секунды
  };

  

  const changeAvatar = () => {
    setAvatar(getRandomItem(avatars));
  };

  const changeNickname = () => {
    setNickname(getRandomItem(nicknames));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <div className="w-full max-w-6xl min-h-[500px] bg-gray-900 rounded-3xl p-8 shadow-2xl border border-purple-600/40 mx-auto flex flex-col items-center overflow-y-auto mt-10">
        <h2 className="text-3xl font-bold text-center text-white mb-6 flex items-center justify-center gap-2">
          <span>⚙️</span> Личный кабинет
        </h2>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center mt-10"
        >
          <img src={avatar} alt="Avatar" className="w-40 h-40 rounded-full mb-4" />
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 58, 237, 0.9), 0 0 30px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={changeAvatar} 
            className="mt-4 w-full max-w-xs py-3 px-6 rounded-full text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 shadow-[0_0_15px_rgba(124,58,237,0.5)] active:border-white focus:outline-none"
          >
            Сменить аватар
          </motion.button>
        </motion.div>
        <h3 className="text-xl font-bold text-center text-white mt-6">
          {nickname}
        </h3>
        
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 58, 237, 0.9), 0 0 30px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={changeNickname} 
          className="mt-4 w-full max-w-xs py-3 px-6 rounded-full text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 shadow-[0_0_15px_rgba(124,58,237,0.5)] active:border-white focus:outline-none"
        >
          Сменить ник
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 58, 237, 0.9), 0 0 30px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://t.me/casinosupport', '_blank')}
          className="mt-4 w-full max-w-xs py-3 px-6 rounded-full text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 shadow-[0_0_15px_rgba(124,58,237,0.5)] active:border-white focus:outline-none"
        >
          Поддержка
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 58, 237, 0.9), 0 0 30px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyClick}
          className="mt-4 w-full max-w-xs py-3 px-6 rounded-full text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 shadow-[0_0_15px_rgba(124,58,237,0.5)] active:border-white focus:outline-none"
        >
          Промокод на +100% к депозиту
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 58, 237, 0.9), 0 0 30px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://lknt.cc/ef09', '_blank')}
          className="mt-4 w-full max-w-xs py-3 px-6 rounded-full text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 shadow-[0_0_15px_rgba(124,58,237,0.5)] active:border-white focus:outline-none"
        >
          Казино
        </motion.button>
        
      </div>
    </div>
  );
}
