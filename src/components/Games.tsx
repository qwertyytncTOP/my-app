import { Link } from "react-router-dom";

export function App1() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <div className="w-full max-w-6xl min-h-[500px] bg-gray-900 rounded-3xl p-8 shadow-2xl border border-purple-600/40 mx-auto flex flex-col items-center overflow-y-auto mt-10">
        <h1 className="text-white text-3xl mb-8">Выбор игры</h1>

        <div className="flex justify-around w-full gap-2">
          <Link to="/SlotMachine" className="img-container rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center object-cover">
            <img src="/images/slots5.png" alt="SlotMachine" className="max-w-full h-auto object-cover rounded-3xl" />
          </Link>
          <Link to="/SlotMachine3" className="img-container rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center object-cover">
            <img src="/images/slot3.png" alt="SlotMachine3" className="max-w-full h-auto object-cover rounded-3xl" />
          </Link>
        </div>

        <div className="flex justify-around w-full gap-2 ">
          <Link to="/Mine" className="img-container rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center object-cover">
            <img src="/images/mine3.png" alt="Mine" className="max-w-full h-auto object-cover rounded-3xl" />
          </Link>
          <Link to="/Mine5" className="img-container rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center object-cover">
            <img src="/images/mine5.png" alt="Mine5" className="max-w-full h-auto object-cover rounded-3xl" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App1;
