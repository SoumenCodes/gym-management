"use client";

import { useState } from "react";
import { Moon, Sun, LogOut, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect, usePathname } from "next/navigation";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const path = usePathname();
  console.log(path);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    console.log("Logging out...");
    redirect("/");
    // Add your logout logic here
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md px-10 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Dumbbell fill="" className="w-8 h-8" />
        <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Gym and Fitness
        </span>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600" />
          )}
        </Button>

        {/* User Avatar */}
        {/* <Avatar className="cursor-pointer">
          <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar> */}

        {/* Logout Button */}
        {path !== "/" && (
          <Button
            onClick={handleLogout}
            className="bg-black hover:bg-green-700 text-white rounded-lg px-4"
          >
            <LogOut className="h-4 w-18 mr-2" />
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
}
