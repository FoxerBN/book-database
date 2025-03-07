import { useState } from "react";

interface DropdownProps {
  sortBy: string;
  setSortBy: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    setSortBy(option);
    setIsOpen(false);
  };

  return (
    <div
      className="relative w-fit cursor-pointer text-gray-800" 
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Dropdown "header" */}
      <div className="bg-gray-300 p-2 mb-1 rounded-md flex items-center justify-between text-sm">
        {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={`h-2.5 w-6 fill-gray-800 transition-transform duration-300 ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </div>

      {/* Dropdown options */}
      <div
        className={`absolute z-10 flex flex-col w-full bg-gray-200 rounded-md p-1 transition-all duration-300 ${
          isOpen ? "opacity-100 top-[44px]" : "opacity-0 -top-0"
        }`}
      >
        {["year", "author", "country", "pages"].map((option) => (
          <div
            key={option}
            className="rounded-md p-1 text-sm hover:bg-gray-300 transition duration-300"
            onClick={() => handleSelect(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
