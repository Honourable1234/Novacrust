import { useState, useRef, useEffect } from 'react';

interface CurrencyOption {
  value: string;
  label: string;
  icon?: string | React.ReactNode;
}

interface CurrencyDropdownProps {
  options: CurrencyOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function CurrencyDropdown({ options, value, onChange }: CurrencyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    option.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected Value Display */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-1 border border-[#E0E0E0] rounded-[20px] bg-[#F7F7F7] px-3 py-2 cursor-pointer hover:bg-gray-100 transition"
      >
        {selectedOption?.icon && (
          <span className="flex items-center">
            {typeof selectedOption.icon === 'string' ? (
              <span className="text-lg">{selectedOption.icon}</span>
            ) : (
              selectedOption.icon
            )}
          </span>
        )}
        <span className="font-medium text-[#013941]">{selectedOption?.label}</span>
        <svg
          className={`w-4 h-4 text-[#013941] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-[20px] px-3 py-4 shadow-lg border border-[#E0E0E0] overflow-hidden z-50">
          {/* Search Input */}
          <div className="mb-2">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full pl-10 px-4 py-3 border border-[#E0E0E0] rounded-full text-sm text-[#828282] font-medium outline-none focus:ring-2 focus:ring-[#013941] focus:ring-opacity-20"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full flex items-center gap-3 p-3 hover:bg-[#F5F5F5] transition ${
                    option.value === value ? 'bg-[#F5F5F5] rounded-[12px]' : ''
                  }`}
                >
                  {option.icon && (
                    <div className="flex items-center justify-center">
                      {typeof option.icon === 'string' ? (
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                          <span className="text-xl">{option.icon}</span>
                        </div>
                      ) : (
                        option.icon
                      )}
                    </div>
                  )}
                  <span className="font-medium text-gray-900">{option.label}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
