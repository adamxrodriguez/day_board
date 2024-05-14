'use client'
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
//import { createContext } from 'react';

export const LandingLayout = ({ children }) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('light');
  }, [setTheme]);

  return (
    <main className="relative flex flex-col text-gray-800">{children}</main>
  );
};


