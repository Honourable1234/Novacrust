import { useState, useRef, useEffect } from 'react';

interface WalletOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface WalletSelectorProps {
  options: WalletOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  dividerAfterIndex?: number;
}

export default function WalletSelector({
  options,
  value,
  onChange,
  placeholder = 'Select wallet',
  className = '',
}: WalletSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (walletId: string) => {
    onChange?.(walletId);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-white border border-gray-200 rounded-[30px] hover:bg-gray-50 transition"
      >
        {selectedOption ? (
          <div className="flex items-center gap-3">
            {selectedOption.icon && <div className="flex-shrink-0">{selectedOption.icon}</div>}
            <span className="font-medium text-gray-900">{selectedOption.label}</span>
          </div>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 py-4 px-3 bg-white border border-gray-200 rounded-[20px] max-h-50 shadow-xl z-50 overflow-y-auto">
          <div className="py-2">
            {options.map((option) => (
              <div key={option.value}>
                <button
                  onClick={() => handleSelect(option.value)}
                  className={`w-full flex items-center gap-3 rounded-[12px] px-4 py-3 hover:bg-[#F5F5F5] transition ${
                    option.value === value ? 'bg-[#F5F5F5]' : ''
                  }`}
                >
                  {option.icon && <div className="flex-shrink-0">{option.icon}</div>}
                  <span className="font-medium text-[#013941] text-xs text-left">{option.label}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
