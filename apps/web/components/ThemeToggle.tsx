"use client";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const changeTheme = async (newTheme: string) => {
    if (newTheme === theme) return;

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(newTheme);
      return;
    }

    document.startViewTransition(() => {
      setTheme(newTheme);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            theme === "light" &&
              "border-yellow-300 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950/20",
            theme === "dark" &&
              "border-indigo-400/40 bg-indigo-950/30 hover:bg-indigo-900/40 text-indigo-300",
            theme === "system" &&
              "border-slate-300 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              {theme === "light" && (
                <Sun className="h-[1.2rem] w-[1.2rem] fill-yellow-400 stroke-yellow-500" />
              )}

              {theme === "dark" && (
                <Moon className="h-[1.2rem] w-[1.2rem] fill-indigo-400 stroke-indigo-400" />
              )}

              {theme === "system" && (
                <Monitor className="h-[1.2rem] w-[1.2rem] fill-slate-400 stroke-slate-500" />
              )}
            </motion.div>
          </AnimatePresence>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-28">
        <DropdownMenuCheckboxItem
          onClick={() => changeTheme("light")}
          checked={theme === "light"}
          disabled={theme === "light"}
          className="cursor-pointer"
        >
          <Sun className="mr-2 h-4 w-4 text-yellow-500" />
          Light
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onClick={() => changeTheme("dark")}
          checked={theme === "dark"}
          disabled={theme === "dark"}
          className="cursor-pointer"
        >
          <Moon className="mr-2 h-4 w-4 text-indigo-400" />
          Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onClick={() => changeTheme("system")}
          checked={theme === "system"}
          disabled={theme === "system"}
          className="cursor-pointer"
        >
          <Monitor className="mr-2 h-4 w-4 text-slate-400" />
          System
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
