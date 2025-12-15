import { useState } from 'react';
import CurrencyDropdown from './CurrencyDropdown';

export interface CurrencyOption {
  value: string;
  label: string;
  icon?: string | React.ReactNode;
}

interface PaymentInputProps {
  label?: string;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  onCurrencyChange?: (currency: string) => void;
  currencyOptions?: CurrencyOption[];
  defaultCurrency?: string;
  placeholder?: string;
  className?: string;
}

const defaultCurrencyOptions: CurrencyOption[] = [
  { value: 'ETH', label: 'ETH', icon: '⟠' },
  { value: 'BTC', label: 'BTC', icon: '₿' },
  { value: 'USD', label: 'USD', icon: '$' },
  { value: 'EUR', label: 'EUR', icon: '€' },
];

export default function PaymentInput({
  label = 'You pay',
  defaultValue = 1.0,
  value: controlledValue,
  onChange,
  onCurrencyChange,
  currencyOptions = defaultCurrencyOptions,
  defaultCurrency = 'ETH',
  placeholder = '0.00',
  className = '',
}: PaymentInputProps) {
  const [internalValue, setInternalValue] = useState<number>(defaultValue);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(defaultCurrency);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setSelectedCurrency(newCurrency);
    onCurrencyChange?.(newCurrency);
  };

  return (
    <div className={`bg-white rounded-[30px] border border-[#E0E0E0] p-6 ${className}`}>
      <label className="block text-sm text-[#828282] font-medium mb-2">{label}</label>
      <div className="flex items-center justify-between gap-4">
        <input
          type="number"
          value={value}
          onChange={handleValueChange}
          placeholder={placeholder}
          step="0.01"
          min="0"
          className="text-2xl font-semibold text-[#000E10] font-semi bg-transparent border-none outline-none w-full"
        />
        <CurrencyDropdown
          options={currencyOptions}
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        />
      </div>
    </div>
  );
}
