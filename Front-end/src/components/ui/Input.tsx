import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, id, icon, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1 ml-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
        <input
          id={id}
          className={`w-full py-3 pr-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 ${icon ? 'pl-12' : 'pl-4'}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;