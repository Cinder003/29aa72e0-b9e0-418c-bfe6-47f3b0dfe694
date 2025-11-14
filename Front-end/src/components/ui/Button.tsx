import React from 'react';
import { CgSpinner } from 'react-icons/cg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  variant = 'primary',
  icon,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-105 focus:ring-purple-300',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-200',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <CgSpinner className="animate-spin text-xl" />
      ) : (
        icon
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;