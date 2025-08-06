import { motion } from "framer-motion";
import React, { useState } from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div 
        className="border-1 border-purple-600/50 rounded-full w-24 h-24"
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.div 
          className="border-t-4 border-blue-600 rounded-full w-20 h-20 absolute"
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: 0.2
          }}
        />
      </motion.div>
    </div>
  );
};
  
const SuccessMessage = () => {
  return (
    <motion.div 
      className="flex justify-center items-center text-white font-bold text-4xl absolute"
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.2 // Отображение сообщения через 2 секунды после завершения загрузки
      }}
      style={{ top: '50%' }}
    >
      Отправлено успешно!
    </motion.div>
  );
};

export function Hero() {
  const [formData, setFormData] = useState({
    text1: '',
    text2: '',
    file1: null as File | null,
    file2: null as File | null,
    text3: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsLoading(true);
    setIsSuccess(false);

    const formEntries = Object.entries(formData);
    
    const dataToSend = new FormData();
    
    for (const [key, value] of formEntries) {
      if (value instanceof File && value !== null) {
        dataToSend.append(key, value, value.name);
      } else if (typeof value === 'string') {
        dataToSend.append(key, value);
      }
    }

    try {
      const response = await fetch('https://my-fastapi-app-jdbd.onrender.com:6000/submit/', {
        method: 'POST',
        body: dataToSend,
      });

      if (!response.ok) {
        throw new Error(`Error sending data to FastAPI. Status code: ${response.status}`);
      }
      
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error submitting data:', error.message);
      } else {
        console.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <div className="w-full max-w-6xl min-h-[500px] bg-gray-900 rounded-3xl p-8 shadow-2xl border border-purple-600/40 mx-auto flex flex-col items-center overflow-y-auto mt-10">
        <h2 className="text-4xl font-bold text-center text-white mb-8 flex items-center justify-center gap-3">
          🚀 Возврат средств
        </h2>
        {isLoading ? (
          <LoadingSpinner />
        ) : isSuccess ? (
          <SuccessMessage />
        ) : (
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="relative w-full">
              <input
                type="text"
                name="text1"
                required
                value={formData.text1}
                onChange={handleInputChange}
                placeholder="Введи свой ID"
                className="peer w-full p-4 rounded-full bg-transparent border-2 border-purple-500/30 focus:border-purple-600 transition duration-300 outline-none pr-14"
              />
              <label htmlFor="text1" className="absolute left-4 top-2 text-gray-400 peer-focus:text-purple-600 transition-all duration-300">

              </label>
            </div>
            <div className="relative w-full">
              <input
                type="text"
                name="text2"
                required
                value={formData.text2}
                onChange={handleInputChange}
                placeholder="Реквизиты для вывода (банк/аккаунт казика)"
                className="peer w-full p-4 rounded-full bg-transparent border-2 border-purple-500/30 focus:border-purple-600 transition duration-300 outline-none pr-14"
              />
              <label htmlFor="text2" className="absolute left-4 top-2 text-gray-400 peer-focus:text-purple-600 transition-all duration-300">

              </label>
            </div>

            <div className="relative w-full">
              <input
                type="file"
                name="file1"
                required
                onChange={handleInputChange}
                className="peer w-full p-4 rounded-full bg-transparent border-2 border-purple-500/30 focus:border-purple-600 transition duration-300 outline-none pr-14 cursor-pointer"
              />
              <label htmlFor="file1" className="absolute left-4 top-2  bg-violet-600 text-white cursor-pointer hover:bg-violet-700 peer-focus:text-purple-600  transition-all duration-300">

              </label>
            </div>
            <div className="relative w-full">
              <input
                type="file"
                name="file2"
                required
                onChange={handleInputChange}
                className="peer w-full p-4 rounded-full bg-transparent border-2 border-purple-500/30 focus:border-purple-600 transition duration-300 outline-none pr-14 cursor-pointer"
              />
              <label htmlFor="file2" className="absolute left-4 top-2 text-blue-400 peer-focus:text-purple-600 transition-all duration-300">

              </label>
            </div>
            <div className="relative w-full">
              <input
                type="text"
                name="text3"
                value={formData.text3}
                required
                onChange={handleInputChange}
                placeholder="Телеграм ID (@absde)"
                className="peer w-full p-4 rounded-full bg-transparent border-2 border-purple-500/30 focus:border-purple-600 transition duration-300 outline-none pr-14"
              />
              <label htmlFor="text1" className="absolute left-4 top-2 text-gray-400 peer-focus:text-purple-600 transition-all duration-300">

              </label>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(124, 58, 237, 0.9), 0 0 40px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full max-w-xs py-4 px-8 rounded-full text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 shadow-[0_0_15px_rgba(124,58,237,0.5)]"
            >
              Submit
            </motion.button>
          </form>
        )}
      </div>
    </div>
  );
}