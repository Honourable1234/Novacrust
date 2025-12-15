interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function PrimaryButton({
  text,
  onClick,
  disabled = false,
  className = ''
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-[#013941] text-[#E6FBF2] font-bold py-5 rounded-[30px] hover:bg-[#0d4c54] transition disabled:bg-gray-300 disabled:cursor-not-allowed ${className}`}
    >
      {text}
    </button>
  );
}
