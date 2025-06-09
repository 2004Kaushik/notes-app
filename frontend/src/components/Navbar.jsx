import { Link } from "react-router-dom";
import { toggleTheme, getTheme, onThemeChange } from "../lib/theme";
import { Moon, Sun, PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [currentTheme, setCurrentTheme] = useState(getTheme());

  useEffect(() => {
    // Set up theme change listener
    return onThemeChange((newTheme) => {
      setCurrentTheme(newTheme);
    });
  }, []);

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-base-content font-mono tracking-tighter">
            ThinkBoard
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/create" className="btn btn-primary">
              <PlusIcon /> Create Note
            </Link>
            <button
              className="btn btn-outline gap-2"
              onClick={toggleTheme}
              title={`Switch to ${
                currentTheme === "forest" ? "light" : "dark"
              } theme`}
            >
              {currentTheme === "forest" ? <Sun size={18} /> : <Moon size={18} />}
              <span className="capitalize">{currentTheme}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
