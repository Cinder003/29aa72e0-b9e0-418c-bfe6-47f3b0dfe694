import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full max-w-md">
      <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search by name, email, or company..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-transparent rounded-full shadow-md shadow-purple-200/50 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300"
      />
    </div>
  );
};

export default SearchBar;