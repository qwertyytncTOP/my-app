import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 fixed w-full  top-0 shadow-md z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Не казино</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/form" className="hover:text-blue-400">форма</Link>
          </li>
          <li>
            <Link to="/games" className="hover:text-blue-400">игры</Link>
          </li>
          <li>
            <Link to="/forecasts" className="hover:text-blue-400">прогнозы</Link>
          </li>
          <li>
            <Link to="/lk" className="hover:text-blue-400">кабинет</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}