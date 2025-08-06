import  { useState, useEffect } from 'react';
import axios from 'axios';

// Определяем интерфейс для данных
interface DataItem {
  command1: string;
  command2: string;
  time: string;
  date: string;
  coefficient: string;
  bet: string;
  description: string;
}

export function Projects() {
  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [descriptionVisibility, setDescriptionVisibility] = useState<boolean[]>([]);

  // Функция для получения данных с сервера
  const fetchData = async () => {
    try {
      const response = await axios.post('http://192.168.0.102:8000/fetch-data');
      
      if (response.data.data) {
        setDataList(response.data.data);
        setDescriptionVisibility(new Array(response.data.data.length).fill(false));
        console.log(dataList);
      } else {
        setDataList([]);
        setDescriptionVisibility([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setDataList([]);
      setDescriptionVisibility([]);
    }
  };

  // Вызываем fetchData при монтировании компонента
  useEffect(() => {
    fetchData();
  }, []);  // Пустой массив зависимостей означает, что эффект будет выполнен только один раз при загрузке страницы

  return (
  
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <div className="w-full max-w-6xl min-h-[500px] bg-gray-900 rounded-3xl p-8 shadow-2xl border border-purple-600/40 mx-auto flex flex-col items-center overflow-y-auto mt-10">
        
        <h2 className="text-4xl font-extrabold text-center text-white mb-10 flex items-center justify-center gap-4 ">
          <span>Прогнозы</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" viewBox="0 0 24 24"><path d="M12 6a3.03 3.03 0 0 1 3 3v7.93c0 .32-.1.6-.3.8l-1.58 1.58a.5.5 0 0 0-.71 0L8.3 18.4c-.19.2-.3.5-.3.8V12a3.03 3.03 0 0 1 3-3zm0-3a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"/></svg>
        </h2>
        {dataList.length === 0 ? (
          <p className="text-xl font-semibold text-center text-white mt-6">На ближайшие 2 часа нет актуальных прогнозов</p>
        ) : (
          dataList.map((item, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 my-2 w-full shadow-md hover:bg-gray-800 transition-colors">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-white text-xl font-bold">{item.command1} vs {item.command2}</p>
                  <p className="text-green-600 text-lg">{item.coefficient}</p>
                  <p className="text-red-600 text-md mt-1">{item.bet}</p>
                  <div className="flex gap-2">
                    <p className="text-gray-300">{item.date} {item.time}</p>
                  </div>
                </div>
                <button 
                  className={` rounded-full bg-purple-600 hover:bg-purple-700 text-white focus:outline-none transition-all duration-300`} 
                  onClick={() => {
                    const newVisibility = [...descriptionVisibility];
                    newVisibility[index] = !newVisibility[index];
                    setDescriptionVisibility(newVisibility);
                  }}
                >
                  Подробности
                </button>
              </div>
              {descriptionVisibility[index] && (
                <div className="text-gray-200">
                  <p>Время: {item.time}</p>
                  <p>Дата: {item.date}</p>
                  <p>{item.description}</p>
                </div>
              )}
            </div>
          ))
        )}

      </div>
    </div>
  








  );
}
