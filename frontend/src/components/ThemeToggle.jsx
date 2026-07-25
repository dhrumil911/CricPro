import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

function ThemeToggle({ className = "" }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Initial theme check
    const checkTheme = () => {
      const isDarkActive = document.documentElement.classList.contains("dark");
      setIsDark(isDarkActive);
    };

    checkTheme();

    // Setup an observer or simple interval to watch class changes if toggle is clicked elsewhere
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-xl transition-all duration-300 bg-slate-900 dark:bg-slate-900 border border-slate-800 dark:border-slate-800 text-slate-400 hover:text-slate-200 dark:hover:text-slate-100 hover:scale-105 active:scale-95 cursor-pointer shadow-md ${className}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-highlight animate-[spin_8s_linear_infinite]" />
      ) : (
        <Moon className="w-4 h-4 text-blue-400" />
      )}
    </button>
  );
}

export default ThemeToggle;
