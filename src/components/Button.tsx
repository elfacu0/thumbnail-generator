import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<IButtonProps> = ({ children, ...props }) => (
  <button
    className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow hover:from-indigo-600 hover:to-violet-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    {...props}
  >
    {children}
  </button>
);
