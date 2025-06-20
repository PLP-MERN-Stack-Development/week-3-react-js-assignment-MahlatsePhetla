

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { NavLink } from 'react-router-dom';


export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        <NavLink to="/">Home</NavLink>
      </h1>
      <NavLink to="/posts" className="text-gray-600 font-bold dark:text-gray-300">Posts</NavLink>

      <div className="flex gap-4 items-center">
        <NavLink
  to="/tasks"
  className={({ isActive }) =>
    `text-sm ${isActive ? 'text-blue-500 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'}`
  }
>
  Tasks
</NavLink>


        <button
  onClick={toggleTheme}
  className="px-4 py-2 rounded transition-colors duration-300
             bg-gray-200 text-black hover:bg-gray-300
             dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
>
  {theme === 'light' ? 'Dark' : 'Light'} Mode
</button>

      </div>
    </nav>
  );
}
