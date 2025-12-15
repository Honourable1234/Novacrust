import { useState } from 'react';
import PrimaryButton from './PrimaryButton';

interface RecipientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext?: (data: RecipientData) => void;
}

interface RecipientData {
  bank: string;
  accountNumber: string;
  accountName: string;
}

export default function RecipientDetailsModal({
  isOpen,
  onClose,
  onNext
}: RecipientDetailsModalProps) {
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('ODUTUGA GBEKE');

  if (!isOpen) return null;

  const handleNext = () => {
    if (onNext) {
      onNext({
        bank,
        accountNumber,
        accountName
      });
    }
    onClose();
  };

  const bankOptions = [
    { value: 'gtbank', label: 'GTBank' },
    { value: 'access', label: 'Access Bank' },
    { value: 'uba', label: 'UBA' },
    { value: 'zenith', label: 'Zenith Bank' },
    { value: 'firstbank', label: 'First Bank' },
    { value: 'fidelity', label: 'Fidelity Bank' },
    { value: 'sterling', label: 'Sterling Bank' },
    { value: 'union', label: 'Union Bank' },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-160 h-180 bg-white rounded-[30px] shadow-lg p-2 sm:py-10 sm:px-16 relative">
        {/* Header with Back Button */}
        <div className="flex items-center mb-8">
          <button
            onClick={onClose}
            className="mr-4 text-[#013941] hover:text-[#0a3a40] transition"
            aria-label="Go back"
          >
            <svg
              width={18}
              height={15}
              viewBox="0 0 18 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.0006 7.50042C18.0006 7.69933 17.9216 7.8901 17.7809 8.03075C17.6403 8.1714 17.4495 8.25042 17.2506 8.25042H2.5609L8.03122 13.7198C8.1009 13.7895 8.15617 13.8722 8.19389 13.9632C8.2316 14.0543 8.25101 14.1519 8.25101 14.2504C8.25101 14.349 8.2316 14.4465 8.19389 14.5376C8.15617 14.6286 8.1009 14.7114 8.03122 14.781C7.96153 14.8507 7.87881 14.906 7.78776 14.9437C7.69672 14.9814 7.59914 15.0008 7.50059 15.0008C7.40204 15.0008 7.30446 14.9814 7.21342 14.9437C7.12237 14.906 7.03965 14.8507 6.96996 14.781L0.219965 8.03104C0.150233 7.96139 0.0949134 7.87867 0.0571702 7.78762C0.019427 7.69657 0 7.59898 0 7.50042C0 7.40186 0.019427 7.30426 0.0571702 7.21321C0.0949134 7.12216 0.150233 7.03945 0.219965 6.96979L6.96996 0.219792C7.1107 0.0790615 7.30157 -1.48284e-09 7.50059 0C7.69961 1.48284e-09 7.89048 0.0790615 8.03122 0.219792C8.17195 0.360523 8.25101 0.551394 8.25101 0.750417C8.25101 0.94944 8.17195 1.14031 8.03122 1.28104L2.5609 6.75042H17.2506C17.4495 6.75042 17.6403 6.82943 17.7809 6.97009C17.9216 7.11074 18.0006 7.3015 18.0006 7.50042Z"
                fill="black"
              />
            </svg>

          </button>
          <h2 className="text-[20px] font-medium text-[#013941] w-full text-center">Recipient details</h2>
        </div>

        {/* Bank Select */}
        <div className="mb-6">
          <label className="block text-[#013941] font-medium mb-4">
            Bank
          </label>
          <div className="relative">
            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full px-6 py-4 border border-[#E0E0E0] rounded-[30px] bg-white text-[#013941] appearance-none cursor-pointer outline-none focus:border-[#013941] focus:ring-1 focus:ring-[#013941] focus:ring-opacity-20 transition"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1.5rem center',
              }}
            >
              <option value="">Select an option</option>
              {bankOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Account Number Input */}
        <div className="mb-6">
          <label className="block text-sm text-[#013941] font-medium mb-4">
            Account number
          </label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter your account number"
            className="w-full px-6 py-4 border border-gray-200 rounded-[30px] bg-white text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#013941] focus:ring-2 focus:ring-[#013941] focus:ring-opacity-20 transition"
          />
        </div>

        {/* Account Name Display */}
        <div className="mb-8">
          <label className="block text-sm text-[#013941] font-medium mb-4">
            Account name
          </label>
          <div className="px-6 py-4 bg-[#F5F5F5] rounded-[30px]">
            <span className="text-[#013941] font-medium">{accountName}</span>
          </div>
        </div>

        {/* Next Button */}
        <PrimaryButton
          text="Next"
          onClick={handleNext}
        />
      </div>
    </div>
  );
}
