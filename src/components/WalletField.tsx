import WalletSelector from './WalletSelector';

interface WalletOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface WalletFieldProps {
  label: string;
  options: WalletOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  dividerAfterIndex?: number;
  className?: string;
  labelClassName?: string;
}

export default function WalletField({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select wallet',
  dividerAfterIndex,
  className = '',
  labelClassName = 'block text-sm text-[#013941] font-medium mb-4'
}: WalletFieldProps) {
  return (
    <div className={className}>
      <label className={labelClassName}>{label}</label>
      <WalletSelector
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        dividerAfterIndex={dividerAfterIndex}
      />
    </div>
  );
}
